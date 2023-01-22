import { EventEmitter } from "@quicksilver/deps.ts";
import {
  DecodedHeaderFrame,
  MethodFrame,
} from "@quicksilver/src/framing/types.ts";
import type { AmqpDecodedMethodEvents } from "@quicksilver/lib/types.ts";

import type { AmqpBasicProperties } from "@quicksilver/src/coding/types.ts";

import type { DecodedBasicQos } from "@quicksilver/lib/types.ts";
import type { DecodedBasicQosOk } from "@quicksilver/lib/types.ts";
import type { DecodedBasicConsume } from "@quicksilver/lib/types.ts";
import type { DecodedBasicConsumeOk } from "@quicksilver/lib/types.ts";
import type { DecodedBasicCancel } from "@quicksilver/lib/types.ts";
import type { DecodedBasicCancelOk } from "@quicksilver/lib/types.ts";
import type { DecodedBasicPublish } from "@quicksilver/lib/types.ts";
import type { DecodedBasicReturn } from "@quicksilver/lib/types.ts";
import type { DecodedBasicDeliver } from "@quicksilver/lib/types.ts";
import type { DecodedBasicGet } from "@quicksilver/lib/types.ts";
import type { DecodedBasicGetOk } from "@quicksilver/lib/types.ts";
import type { DecodedBasicGetEmpty } from "@quicksilver/lib/types.ts";
import type { DecodedBasicAck } from "@quicksilver/lib/types.ts";
import type { DecodedBasicReject } from "@quicksilver/lib/types.ts";
import type { DecodedBasicRecoverAsync } from "@quicksilver/lib/types.ts";
import type { DecodedBasicRecover } from "@quicksilver/lib/types.ts";
import type { DecodedBasicRecoverOk } from "@quicksilver/lib/types.ts";
import type { DecodedBasicNack } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionStart } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionStartOk } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionSecure } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionSecureOk } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionTune } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionTuneOk } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionOpen } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionOpenOk } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionClose } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionCloseOk } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionBlocked } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionUnblocked } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionUpdateSecret } from "@quicksilver/lib/types.ts";
import type { DecodedConnectionUpdateSecretOk } from "@quicksilver/lib/types.ts";
import type { DecodedChannelOpen } from "@quicksilver/lib/types.ts";
import type { DecodedChannelOpenOk } from "@quicksilver/lib/types.ts";
import type { DecodedChannelFlow } from "@quicksilver/lib/types.ts";
import type { DecodedChannelFlowOk } from "@quicksilver/lib/types.ts";
import type { DecodedChannelClose } from "@quicksilver/lib/types.ts";
import type { DecodedChannelCloseOk } from "@quicksilver/lib/types.ts";
import type { DecodedAccessRequest } from "@quicksilver/lib/types.ts";
import type { DecodedAccessRequestOk } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeDeclare } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeDeclareOk } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeDelete } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeDeleteOk } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeBind } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeBindOk } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeUnbind } from "@quicksilver/lib/types.ts";
import type { DecodedExchangeUnbindOk } from "@quicksilver/lib/types.ts";
import type { DecodedQueueDeclare } from "@quicksilver/lib/types.ts";
import type { DecodedQueueDeclareOk } from "@quicksilver/lib/types.ts";
import type { DecodedQueueBind } from "@quicksilver/lib/types.ts";
import type { DecodedQueueBindOk } from "@quicksilver/lib/types.ts";
import type { DecodedQueuePurge } from "@quicksilver/lib/types.ts";
import type { DecodedQueuePurgeOk } from "@quicksilver/lib/types.ts";
import type { DecodedQueueDelete } from "@quicksilver/lib/types.ts";
import type { DecodedQueueDeleteOk } from "@quicksilver/lib/types.ts";
import type { DecodedQueueUnbind } from "@quicksilver/lib/types.ts";
import type { DecodedQueueUnbindOk } from "@quicksilver/lib/types.ts";
import type { DecodedTxSelect } from "@quicksilver/lib/types.ts";
import type { DecodedTxSelectOk } from "@quicksilver/lib/types.ts";
import type { DecodedTxCommit } from "@quicksilver/lib/types.ts";
import type { DecodedTxCommitOk } from "@quicksilver/lib/types.ts";
import type { DecodedTxRollback } from "@quicksilver/lib/types.ts";
import type { DecodedTxRollbackOk } from "@quicksilver/lib/types.ts";
import type { DecodedConfirmSelect } from "@quicksilver/lib/types.ts";
import type { DecodedConfirmSelectOk } from "@quicksilver/lib/types.ts";

class MethodPublisher {
  constructor(private events = new EventEmitter<AmqpDecodedMethodEvents>()) {
  }

  public unsubscribeAll() {
    this.events.off();
  }

  public emit(
    frame: MethodFrame,
    header?: DecodedHeaderFrame,
    content?: Uint8Array,
  ) {
    switch (frame.content._kind) {
      case "basic.qos":
        this.events.emit("basic.qos", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.qos-ok":
        this.events.emit("basic.qos-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.consume":
        this.events.emit("basic.consume", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.consume-ok":
        this.events.emit("basic.consume-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.cancel":
        this.events.emit("basic.cancel", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.cancel-ok":
        this.events.emit("basic.cancel-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.publish":
        this.events.emit("basic.publish", {
          ...frame.content,
          channel: frame.channel,
          _properties: header!.properties,
          _content: content,
        });
        break;
      case "basic.return":
        this.events.emit("basic.return", {
          ...frame.content,
          channel: frame.channel,
          _properties: header!.properties,
          _content: content,
        });
        break;
      case "basic.deliver":
        this.events.emit("basic.deliver", {
          ...frame.content,
          channel: frame.channel,
          _properties: header!.properties,
          _content: content,
        });
        break;
      case "basic.get":
        this.events.emit("basic.get", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.get-ok":
        this.events.emit("basic.get-ok", {
          ...frame.content,
          channel: frame.channel,
          _properties: header!.properties,
          _content: content,
        });
        break;
      case "basic.get-empty":
        this.events.emit("basic.get-empty", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.ack":
        this.events.emit("basic.ack", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.reject":
        this.events.emit("basic.reject", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.recover-async":
        this.events.emit("basic.recover-async", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.recover":
        this.events.emit("basic.recover", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.recover-ok":
        this.events.emit("basic.recover-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "basic.nack":
        this.events.emit("basic.nack", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.start":
        this.events.emit("connection.start", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.start-ok":
        this.events.emit("connection.start-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.secure":
        this.events.emit("connection.secure", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.secure-ok":
        this.events.emit("connection.secure-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.tune":
        this.events.emit("connection.tune", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.tune-ok":
        this.events.emit("connection.tune-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.open":
        this.events.emit("connection.open", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.open-ok":
        this.events.emit("connection.open-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.close":
        this.events.emit("connection.close", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.close-ok":
        this.events.emit("connection.close-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.blocked":
        this.events.emit("connection.blocked", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.unblocked":
        this.events.emit("connection.unblocked", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.update-secret":
        this.events.emit("connection.update-secret", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "connection.update-secret-ok":
        this.events.emit("connection.update-secret-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.open":
        this.events.emit("channel.open", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.open-ok":
        this.events.emit("channel.open-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.flow":
        this.events.emit("channel.flow", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.flow-ok":
        this.events.emit("channel.flow-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.close":
        this.events.emit("channel.close", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "channel.close-ok":
        this.events.emit("channel.close-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "access.request":
        this.events.emit("access.request", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "access.request-ok":
        this.events.emit("access.request-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.declare":
        this.events.emit("exchange.declare", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.declare-ok":
        this.events.emit("exchange.declare-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.delete":
        this.events.emit("exchange.delete", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.delete-ok":
        this.events.emit("exchange.delete-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.bind":
        this.events.emit("exchange.bind", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.bind-ok":
        this.events.emit("exchange.bind-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.unbind":
        this.events.emit("exchange.unbind", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "exchange.unbind-ok":
        this.events.emit("exchange.unbind-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.declare":
        this.events.emit("queue.declare", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.declare-ok":
        this.events.emit("queue.declare-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.bind":
        this.events.emit("queue.bind", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.bind-ok":
        this.events.emit("queue.bind-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.purge":
        this.events.emit("queue.purge", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.purge-ok":
        this.events.emit("queue.purge-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.delete":
        this.events.emit("queue.delete", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.delete-ok":
        this.events.emit("queue.delete-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.unbind":
        this.events.emit("queue.unbind", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "queue.unbind-ok":
        this.events.emit("queue.unbind-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.select":
        this.events.emit("tx.select", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.select-ok":
        this.events.emit("tx.select-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.commit":
        this.events.emit("tx.commit", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.commit-ok":
        this.events.emit("tx.commit-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.rollback":
        this.events.emit("tx.rollback", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "tx.rollback-ok":
        this.events.emit("tx.rollback-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "confirm.select":
        this.events.emit("confirm.select", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      case "confirm.select-ok":
        this.events.emit("confirm.select-ok", {
          ...frame.content,
          channel: frame.channel,
        });
        break;
      default:
        throw new Error("Unknown method");
    }
  }
  onBasicQos(channel: number, cb: (args: DecodedBasicQos) => void): () => void {
    this.events.on("basic.qos", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.qos", cb);
  }
  onBasicQosOk(
    channel: number,
    cb: (args: DecodedBasicQosOk) => void,
  ): () => void {
    this.events.on("basic.qos-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.qos-ok", cb);
  }
  onBasicConsume(
    channel: number,
    cb: (args: DecodedBasicConsume) => void,
  ): () => void {
    this.events.on("basic.consume", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.consume", cb);
  }
  onBasicConsumeOk(
    channel: number,
    cb: (args: DecodedBasicConsumeOk) => void,
  ): () => void {
    this.events.on("basic.consume-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.consume-ok", cb);
  }
  onBasicCancel(
    channel: number,
    cb: (args: DecodedBasicCancel) => void,
  ): () => void {
    this.events.on("basic.cancel", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.cancel", cb);
  }
  onBasicCancelOk(
    channel: number,
    cb: (args: DecodedBasicCancelOk) => void,
  ): () => void {
    this.events.on("basic.cancel-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.cancel-ok", cb);
  }
  onBasicPublish(
    channel: number,
    cb: (
      args:
        & { _properties: AmqpBasicProperties; _content?: Uint8Array }
        & DecodedBasicPublish,
    ) => void,
  ): () => void {
    this.events.on("basic.publish", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.publish", cb);
  }
  onBasicReturn(
    channel: number,
    cb: (
      args:
        & { _properties: AmqpBasicProperties; _content?: Uint8Array }
        & DecodedBasicReturn,
    ) => void,
  ): () => void {
    this.events.on("basic.return", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.return", cb);
  }

  onBasicDeliver(
    channel: number,
    cb: (
      args:
        & { _properties: AmqpBasicProperties; _content?: Uint8Array }
        & DecodedBasicDeliver,
    ) => void,
  ): () => void {
    this.events.on("basic.deliver", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.deliver", cb);
  }
  onBasicGet(channel: number, cb: (args: DecodedBasicGet) => void): () => void {
    this.events.on("basic.get", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.get", cb);
  }
  onBasicGetOk(
    channel: number,
    cb: (
      args:
        & { _properties: AmqpBasicProperties; _content?: Uint8Array }
        & DecodedBasicGetOk,
    ) => void,
  ): () => void {
    this.events.on("basic.get-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.get-ok", cb);
  }
  onBasicGetEmpty(
    channel: number,
    cb: (args: DecodedBasicGetEmpty) => void,
  ): () => void {
    this.events.on("basic.get-empty", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.get-empty", cb);
  }
  onBasicAck(channel: number, cb: (args: DecodedBasicAck) => void): () => void {
    this.events.on("basic.ack", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.ack", cb);
  }
  onBasicReject(
    channel: number,
    cb: (args: DecodedBasicReject) => void,
  ): () => void {
    this.events.on("basic.reject", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.reject", cb);
  }
  onBasicRecoverAsync(
    channel: number,
    cb: (args: DecodedBasicRecoverAsync) => void,
  ): () => void {
    this.events.on("basic.recover-async", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.recover-async", cb);
  }
  onBasicRecover(
    channel: number,
    cb: (args: DecodedBasicRecover) => void,
  ): () => void {
    this.events.on("basic.recover", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.recover", cb);
  }
  onBasicRecoverOk(
    channel: number,
    cb: (args: DecodedBasicRecoverOk) => void,
  ): () => void {
    this.events.on("basic.recover-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.recover-ok", cb);
  }
  onBasicNack(
    channel: number,
    cb: (args: DecodedBasicNack) => void,
  ): () => void {
    this.events.on("basic.nack", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("basic.nack", cb);
  }
  onConnectionStart(
    channel: number,
    cb: (args: DecodedConnectionStart) => void,
  ): () => void {
    this.events.on("connection.start", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.start", cb);
  }
  onConnectionStartOk(
    channel: number,
    cb: (args: DecodedConnectionStartOk) => void,
  ): () => void {
    this.events.on("connection.start-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.start-ok", cb);
  }
  onConnectionSecure(
    channel: number,
    cb: (args: DecodedConnectionSecure) => void,
  ): () => void {
    this.events.on("connection.secure", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.secure", cb);
  }
  onConnectionSecureOk(
    channel: number,
    cb: (args: DecodedConnectionSecureOk) => void,
  ): () => void {
    this.events.on("connection.secure-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.secure-ok", cb);
  }
  onConnectionTune(
    channel: number,
    cb: (args: DecodedConnectionTune) => void,
  ): () => void {
    this.events.on("connection.tune", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.tune", cb);
  }
  onConnectionTuneOk(
    channel: number,
    cb: (args: DecodedConnectionTuneOk) => void,
  ): () => void {
    this.events.on("connection.tune-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.tune-ok", cb);
  }
  onConnectionOpen(
    channel: number,
    cb: (args: DecodedConnectionOpen) => void,
  ): () => void {
    this.events.on("connection.open", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.open", cb);
  }
  onConnectionOpenOk(
    channel: number,
    cb: (args: DecodedConnectionOpenOk) => void,
  ): () => void {
    this.events.on("connection.open-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.open-ok", cb);
  }
  onConnectionClose(
    channel: number,
    cb: (args: DecodedConnectionClose) => void,
  ): () => void {
    this.events.on("connection.close", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.close", cb);
  }
  onConnectionCloseOk(
    channel: number,
    cb: (args: DecodedConnectionCloseOk) => void,
  ): () => void {
    this.events.on("connection.close-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.close-ok", cb);
  }
  onConnectionBlocked(
    channel: number,
    cb: (args: DecodedConnectionBlocked) => void,
  ): () => void {
    this.events.on("connection.blocked", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.blocked", cb);
  }
  onConnectionUnblocked(
    channel: number,
    cb: (args: DecodedConnectionUnblocked) => void,
  ): () => void {
    this.events.on("connection.unblocked", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.unblocked", cb);
  }
  onConnectionUpdateSecret(
    channel: number,
    cb: (args: DecodedConnectionUpdateSecret) => void,
  ): () => void {
    this.events.on("connection.update-secret", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.update-secret", cb);
  }
  onConnectionUpdateSecretOk(
    channel: number,
    cb: (args: DecodedConnectionUpdateSecretOk) => void,
  ): () => void {
    this.events.on("connection.update-secret-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("connection.update-secret-ok", cb);
  }
  onChannelOpen(
    channel: number,
    cb: (args: DecodedChannelOpen) => void,
  ): () => void {
    this.events.on("channel.open", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.open", cb);
  }
  onChannelOpenOk(
    channel: number,
    cb: (args: DecodedChannelOpenOk) => void,
  ): () => void {
    this.events.on("channel.open-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.open-ok", cb);
  }
  onChannelFlow(
    channel: number,
    cb: (args: DecodedChannelFlow) => void,
  ): () => void {
    this.events.on("channel.flow", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.flow", cb);
  }
  onChannelFlowOk(
    channel: number,
    cb: (args: DecodedChannelFlowOk) => void,
  ): () => void {
    this.events.on("channel.flow-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.flow-ok", cb);
  }
  onChannelClose(
    channel: number,
    cb: (args: DecodedChannelClose) => void,
  ): () => void {
    this.events.on("channel.close", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.close", cb);
  }
  onChannelCloseOk(
    channel: number,
    cb: (args: DecodedChannelCloseOk) => void,
  ): () => void {
    this.events.on("channel.close-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("channel.close-ok", cb);
  }
  onAccessRequest(
    channel: number,
    cb: (args: DecodedAccessRequest) => void,
  ): () => void {
    this.events.on("access.request", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("access.request", cb);
  }
  onAccessRequestOk(
    channel: number,
    cb: (args: DecodedAccessRequestOk) => void,
  ): () => void {
    this.events.on("access.request-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("access.request-ok", cb);
  }
  onExchangeDeclare(
    channel: number,
    cb: (args: DecodedExchangeDeclare) => void,
  ): () => void {
    this.events.on("exchange.declare", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.declare", cb);
  }
  onExchangeDeclareOk(
    channel: number,
    cb: (args: DecodedExchangeDeclareOk) => void,
  ): () => void {
    this.events.on("exchange.declare-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.declare-ok", cb);
  }
  onExchangeDelete(
    channel: number,
    cb: (args: DecodedExchangeDelete) => void,
  ): () => void {
    this.events.on("exchange.delete", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.delete", cb);
  }
  onExchangeDeleteOk(
    channel: number,
    cb: (args: DecodedExchangeDeleteOk) => void,
  ): () => void {
    this.events.on("exchange.delete-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.delete-ok", cb);
  }
  onExchangeBind(
    channel: number,
    cb: (args: DecodedExchangeBind) => void,
  ): () => void {
    this.events.on("exchange.bind", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.bind", cb);
  }
  onExchangeBindOk(
    channel: number,
    cb: (args: DecodedExchangeBindOk) => void,
  ): () => void {
    this.events.on("exchange.bind-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.bind-ok", cb);
  }
  onExchangeUnbind(
    channel: number,
    cb: (args: DecodedExchangeUnbind) => void,
  ): () => void {
    this.events.on("exchange.unbind", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.unbind", cb);
  }
  onExchangeUnbindOk(
    channel: number,
    cb: (args: DecodedExchangeUnbindOk) => void,
  ): () => void {
    this.events.on("exchange.unbind-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("exchange.unbind-ok", cb);
  }
  onQueueDeclare(
    channel: number,
    cb: (args: DecodedQueueDeclare) => void,
  ): () => void {
    this.events.on("queue.declare", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.declare", cb);
  }
  onQueueDeclareOk(
    channel: number,
    cb: (args: DecodedQueueDeclareOk) => void,
  ): () => void {
    this.events.on("queue.declare-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.declare-ok", cb);
  }
  onQueueBind(
    channel: number,
    cb: (args: DecodedQueueBind) => void,
  ): () => void {
    this.events.on("queue.bind", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.bind", cb);
  }
  onQueueBindOk(
    channel: number,
    cb: (args: DecodedQueueBindOk) => void,
  ): () => void {
    this.events.on("queue.bind-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.bind-ok", cb);
  }
  onQueuePurge(
    channel: number,
    cb: (args: DecodedQueuePurge) => void,
  ): () => void {
    this.events.on("queue.purge", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.purge", cb);
  }
  onQueuePurgeOk(
    channel: number,
    cb: (args: DecodedQueuePurgeOk) => void,
  ): () => void {
    this.events.on("queue.purge-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.purge-ok", cb);
  }
  onQueueDelete(
    channel: number,
    cb: (args: DecodedQueueDelete) => void,
  ): () => void {
    this.events.on("queue.delete", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.delete", cb);
  }
  onQueueDeleteOk(
    channel: number,
    cb: (args: DecodedQueueDeleteOk) => void,
  ): () => void {
    this.events.on("queue.delete-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.delete-ok", cb);
  }
  onQueueUnbind(
    channel: number,
    cb: (args: DecodedQueueUnbind) => void,
  ): () => void {
    this.events.on("queue.unbind", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.unbind", cb);
  }
  onQueueUnbindOk(
    channel: number,
    cb: (args: DecodedQueueUnbindOk) => void,
  ): () => void {
    this.events.on("queue.unbind-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("queue.unbind-ok", cb);
  }
  onTxSelect(channel: number, cb: (args: DecodedTxSelect) => void): () => void {
    this.events.on("tx.select", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.select", cb);
  }
  onTxSelectOk(
    channel: number,
    cb: (args: DecodedTxSelectOk) => void,
  ): () => void {
    this.events.on("tx.select-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.select-ok", cb);
  }
  onTxCommit(channel: number, cb: (args: DecodedTxCommit) => void): () => void {
    this.events.on("tx.commit", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.commit", cb);
  }
  onTxCommitOk(
    channel: number,
    cb: (args: DecodedTxCommitOk) => void,
  ): () => void {
    this.events.on("tx.commit-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.commit-ok", cb);
  }
  onTxRollback(
    channel: number,
    cb: (args: DecodedTxRollback) => void,
  ): () => void {
    this.events.on("tx.rollback", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.rollback", cb);
  }
  onTxRollbackOk(
    channel: number,
    cb: (args: DecodedTxRollbackOk) => void,
  ): () => void {
    this.events.on("tx.rollback-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("tx.rollback-ok", cb);
  }
  onConfirmSelect(
    channel: number,
    cb: (args: DecodedConfirmSelect) => void,
  ): () => void {
    this.events.on("confirm.select", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("confirm.select", cb);
  }
  onConfirmSelectOk(
    channel: number,
    cb: (args: DecodedConfirmSelectOk) => void,
  ): () => void {
    this.events.on("confirm.select-ok", ({ channel: c, ...data }) => {
      if (channel === c) {
        cb(data);
      }
    });
    return () => this.events.off("confirm.select-ok", cb);
  }
}
export default new MethodPublisher();
