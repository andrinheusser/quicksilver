import amqpSocket from "@quicksilver/src/connection/AmqpSocket.ts";
import {
  encodeBasicAck,
  encodeBasicConsume,
  encodeBasicPublish,
  encodeBasicQos,
  encodeBasicReject,
  encodeChannelClose,
  encodeChannelCloseOk,
  encodeChannelOpen,
  encodeExchangeDeclare,
  encodeQueueBind,
  encodeQueueDeclare,
  encodeQueuePurge,
  encodeQueueUnbind,
} from "@quicksilver/lib/encode.ts";
import Frame from "@quicksilver/src/framing/Frame.ts";
import methodPublisher from "@quicksilver/lib/MethodPublisher.ts";
import {
  AmqpMethodKind,
  BasicAck,
  BasicConsume,
  BasicPublish,
  BasicQos,
  BasicReject,
  ChannelClose,
  ExchangeDeclare,
  QueueBind,
  QueueDeclare,
  QueueDelete,
  QueuePurge,
  QueueUnbind,
} from "@quicksilver/lib/types.ts";
import { waitForTruthy } from "@quicksilver/src/utils.ts";
import { AmqpBasicProperties } from "./coding/types.ts";
import { AmqpConsumer } from "./types.ts";

export default class AmqpChannel {
  private isOpen = false;
  private flow = false;
  private socket: typeof amqpSocket;
  private cancel = new Map<AmqpMethodKind, () => void>();
  private consumers = new Map<string, AmqpConsumer>();

  private constructor(private id: number, private maxFrameSize = 131072) {
    this.socket = amqpSocket;
  }

  static async build(id: number, maxFrameSize = 131072) {
    const channel = new AmqpChannel(id, maxFrameSize);
    await channel.open();
    return channel;
  }

  private open() {
    this.cancel.set(
      "channel.open-ok",
      methodPublisher.onChannelOpenOk(this.id, (_frame) => {
        this.isOpen = true;
        this.cancel.get("channel.open-ok")!();
      }),
    );
    this.cancel.set(
      "channel.close",
      methodPublisher.onChannelClose(this.id, (_frame) => {
        this.isOpen = false;
        this.cancel.get("channel.close")!();
        this.socket.writeFrame(
          Frame.buildMethodFrame(this.id, encodeChannelCloseOk()),
        );
      }),
    );
    this.cancel.set(
      "channel.close-ok",
      methodPublisher.onChannelCloseOk(this.id, (_frame) => {
        this.isOpen = false;
        this.cancel.get("channel.close-ok")!();
      }),
    );
    this.cancel.set(
      "basic.deliver",
      methodPublisher.onBasicDeliver(
        this.id,
        ({ _kind, _properties, _content, ...fields }) => {
          const consumerTag = fields.consumerTag;
          const consumer = this.consumers.get(consumerTag);
          if (consumer) {
            consumer(_content || new Uint8Array(), _properties, fields);
          }
        },
      ),
    );
    this.socket.writeFrame(
      Frame.buildMethodFrame(this.id, encodeChannelOpen({ outOfBand: "" })),
    );
    return waitForTruthy(() => this.isOpen);
  }

  close() {
    if (!this.isOpen) {
      return;
    }
    this._close({ classId: 0, methodId: 0, replyCode: 200, replyText: "OK" });
  }

  private _close(opts: ChannelClose) {
    this.socket.writeFrame(Frame.buildMethodFrame(0, encodeChannelClose(opts)));
  }

  private amqpMethod(
    payload: Uint8Array,
    waitFor: AmqpMethodKind,
    onSuccess: Function,
  ) {
    if (!this.isOpen) {
      throw new Error("Channel is not open");
    }
    let ok = false;
    this.cancel.set(
      waitFor,
      onSuccess(this.id, () => {
        this.cancel.get(waitFor)!();
        ok = true;
      }),
    );
    this.socket.writeFrame(
      Frame.buildMethodFrame(
        this.id,
        payload,
      ),
    );
    return waitForTruthy(() => ok);
  }

  declareExchange(opts: ExchangeDeclare) {
    return this.amqpMethod(
      encodeExchangeDeclare(opts),
      "exchange.declare-ok",
      methodPublisher.onExchangeDeclareOk.bind(methodPublisher),
    );
  }

  declareQueue(opts: QueueDeclare) {
    return this.amqpMethod(
      encodeQueueDeclare(opts),
      "queue.declare-ok",
      methodPublisher.onQueueDeclareOk.bind(methodPublisher),
    );
  }

  bindQueue(opts: QueueBind) {
    return this.amqpMethod(
      encodeQueueBind(opts),
      "queue.bind-ok",
      methodPublisher.onQueueBindOk.bind(methodPublisher),
    );
  }

  unbindQueue(opts: QueueUnbind) {
    return this.amqpMethod(
      encodeQueueUnbind(opts),
      "queue.unbind-ok",
      methodPublisher.onQueueUnbindOk.bind(methodPublisher),
    );
  }

  purgeQueue(opts: QueuePurge) {
    return this.amqpMethod(
      encodeQueuePurge(opts),
      "queue.purge-ok",
      methodPublisher.onQueuePurgeOk.bind(methodPublisher),
    );
  }

  deleteQueue(opts: QueueDelete) {
    return this.amqpMethod(
      encodeQueuePurge(opts),
      "queue.delete-ok",
      methodPublisher.onQueueDeleteOk.bind(methodPublisher),
    );
  }

  qos(opts: BasicQos) {
    return this.amqpMethod(
      encodeBasicQos(opts),
      "basic.qos-ok",
      methodPublisher.onBasicQosOk.bind(methodPublisher),
    );
  }

  ack(opts: BasicAck) {
    this.socket.writeFrame(
      Frame.buildMethodFrame(this.id, encodeBasicAck(opts)),
    );
  }

  reject(opts: BasicReject) {
    this.socket.writeFrame(
      Frame.buildMethodFrame(this.id, encodeBasicReject(opts)),
    );
  }

  publish(
    message: Uint8Array,
    opts: BasicPublish,
    properties: AmqpBasicProperties,
  ) {
    const basicPublish = encodeBasicPublish(opts);
    this.socket.writeFrame(
      Frame.buildMethodFrame(this.id, basicPublish),
    );
    this.socket.writeFrames(
      Frame.buildContentFrame(
        this.id,
        60,
        0,
        properties,
        message,
        this.maxFrameSize,
      ),
    );
  }

  consume(
    opts: BasicConsume,
    consumer: AmqpConsumer,
  ) {
    const basicConsume = encodeBasicConsume(opts);
    this.socket.writeFrame(
      Frame.buildMethodFrame(this.id, basicConsume),
    );
    this.cancel.set(
      "basic.consume-ok",
      methodPublisher.onBasicConsumeOk(this.id, (frame) => {
        const { consumerTag } = frame;
        this.consumers.set(consumerTag, consumer);
      }),
    );
  }
}
