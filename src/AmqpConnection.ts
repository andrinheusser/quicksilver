import amqpSocket from "@quicksilver/src/connection/AmqpSocket.ts";
import methodPublisher from "@quicksilver/lib/MethodPublisher.ts";
import { ConnectionStart, ConnectionTune } from "@quicksilver/lib/types.ts";
import Frame from "@quicksilver/src/framing/Frame.ts";
import {
  encodeConnectionClose,
  encodeConnectionOpen,
  encodeConnectionStartOk,
  encodeConnectionTuneOk,
} from "@quicksilver/lib/encode.ts";
import { waitForTruthy } from "@quicksilver/src/utils.ts";
import AmqpChannel from "@quicksilver/src/AmqpChannel.ts";

export type AmqpConnectionOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
  virtualHost: string;
  heartbeat: number;
  channelMax?: number;
  frameMax?: number;
};

const amqpConnectionOptionsDefaults: AmqpConnectionOptions = {
  host: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  virtualHost: "/",
  heartbeat: 0,
};

const _tune = (them: number, us?: number) => {
  if (us === undefined || us === 0) {
    return them;
  }
  return Math.min(us, them);
};

export default class AmqpConnection {
  private options: AmqpConnectionOptions = amqpConnectionOptionsDefaults;
  private isConnected = false;
  private socket: typeof amqpSocket;
  private channels: { id: number; channel: AmqpChannel }[] = [];
  private channelMax = 0;
  private frameMax = 0;
  private cancelHeartbeat: () => void = () => {};
  private heartbeatInterval = 0;

  constructor(options: Partial<AmqpConnectionOptions>) {
    this.options = { ...this.options, ...options };
    this.socket = amqpSocket;
  }

  async createChannel() {
    if (!this.isConnected) {
      throw new Error("Connection is not open");
    }
    if (this.channels.length >= this.channelMax) {
      throw new Error("Channel limit reached");
    }
    const id = this.channels.length + 1;
    const channel = await AmqpChannel.build(id, this.frameMax);
    this.channels.push({
      id,
      channel,
    });
    return channel;
  }

  async connect() {
    methodPublisher.onConnectionStart(0, this.start.bind(this));
    methodPublisher.onConnectionTune(0, this.tune.bind(this));
    methodPublisher.onConnectionOpenOk(0, this.openOk.bind(this));
    await this.socket.start(this.options.host, this.options.port);
    await waitForTruthy(() => this.isConnected);
  }

  async close() {
    if (!this.isConnected) {
      this.socket.close();
      return Promise.resolve();
    }
    await this._close();
  }

  async _close(
    replyCode?: number,
    replyText?: string,
    clxId?: number,
    methodId?: number,
  ) {
    methodPublisher.onConnectionCloseOk(0, () => {
      this.socket.close();
      this.isConnected = false;
    });

    this.socket.writeFrame(
      Frame.buildMethodFrame(
        0,
        encodeConnectionClose({
          replyCode: replyCode || 0,
          replyText: replyText || "",
          classId: clxId ?? 0,
          methodId: methodId ?? 0,
        }),
      ),
    );

    await waitForTruthy(() => !this.isConnected);
    methodPublisher.unsubscribeAll();
    this.cancelHeartbeat();
  }

  private start(start: ConnectionStart) {
    this.socket.writeFrame(
      Frame.buildMethodFrame(
        0,
        encodeConnectionStartOk({
          clientProperties: {
            "product": "deno-quicksilver-amqp",
          },
          response: `${String.fromCharCode(0)}${this.options.username}${
            String.fromCharCode(0)
          }${this.options.password}`,
          locale: "en_US",
          mechanism: start.mechanisms.split(" ").pop() || "PLAIN",
        }),
      ),
    );
  }

  private tune(tune: ConnectionTune) {
    this.channelMax = _tune(tune.channelMax, this.options.channelMax);
    this.frameMax = _tune(tune.frameMax, this.options.frameMax);
    this.heartbeatInterval = Math.min(this.options.heartbeat, tune.heartbeat);

    this.socket.writeFrame(
      Frame.buildMethodFrame(
        0,
        encodeConnectionTuneOk({
          channelMax: this.channelMax,
          frameMax: tune.frameMax,
          heartbeat: this.heartbeatInterval,
        }),
      ),
    );
    if (this.heartbeatInterval !== 0) this.heartbeat();
    this.open();
  }

  private open() {
    this.socket.writeFrame(
      Frame.buildMethodFrame(
        0,
        encodeConnectionOpen({
          virtualHost: this.options.virtualHost,
          capabilities: "",
          insist: false,
        }),
      ),
    );
  }

  private openOk() {
    this.isConnected = true;
  }

  private heartbeat() {
    const nr = setInterval(() => {
      this.socket.writeFrame(Frame.buildHeartbeatFrame());
    }, this.heartbeatInterval * 1000);
    this.cancelHeartbeat = () => clearInterval(nr);
  }
}
