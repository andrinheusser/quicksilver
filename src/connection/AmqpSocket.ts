import Frame from "@quicksilver/src/framing/Frame.ts";
import {
  ContentFrame,
  HeaderFrame,
  HeartbeatFrame,
  IncomingFrame,
  MethodFrame,
} from "@quicksilver/src/framing/types.ts";
import TcpConnection from "@quicksilver/src/connection/TcpConnection.ts";
import methodPublisher from "@quicksilver/lib/MethodPublisher.ts";
import type { AmqpMethodKind } from "@quicksilver/lib/types.ts";
import type { AwaitingContentMethod } from "@quicksilver/src/connection/types.ts";

const INCOMING_CONTENT: Array<AmqpMethodKind> = [
  "basic.deliver",
  "basic.get-ok",
  "basic.return",
];

class AmqpSocket {
  private conn: TcpConnection;
  private isClosed = true;

  private awaitingContentMethods = new Map<number, AwaitingContentMethod>();

  constructor() {
    this.conn = new TcpConnection();
  }

  async start(host: string, port: number) {
    await this.conn.connect(host, port);
    this.isClosed = false;
    this.readFrames();
    this.writeFrame(Frame.bulidProtocolHeader());
  }

  close() {
    this.isClosed = true;
    this.conn.close();
  }

  writeFrame(data: Uint8Array) {
    this.write(data);
  }
  writeFrames(arr: Uint8Array[]) {
    arr.forEach((data) => this.write(data));
  }

  private async write(data: Uint8Array) {
    await this.conn.write(data);
  }

  private readFrames() {
    this.conn.onRead(this.onRead.bind(this));
  }

  private onRead(data: Uint8Array) {
    const { remaining, ...frame } = Frame.readFrame(data);
    this.handleFrame(frame);
    if (remaining.length > 0) {
      this.onRead(remaining);
    }
    return Promise.resolve();
  }

  private handleFrame(frame: IncomingFrame) {
    if (this.isClosed && frame.type === "method") {
      if (
        frame.content._kind !== "connection.close-ok" &&
        frame.content._kind !== "connection.close"
      ) {
        return;
      }
    }

    switch (frame.type) {
      case "method":
        this.handleMethodFrame(frame);
        break;
      case "header":
        this.handleHeaderFrame(frame);
        break;
      case "content":
        this.handleContentFrame(frame);
        break;
      case "heartbeat":
        this.handleHeartbeatFrame(frame);
        break;
      default:
        throw new Error("Unknown frame type");
    }
  }

  private shouldSendAwaitingMethod(
    { method, header, contents }: AwaitingContentMethod,
  ) {
    // Each method must have 1 header frame
    if (!header) return false;
    // A header can have 0 or more content frames
    if (header.content.bodySize === 0) return true;
    // If the header has a body size, we must have received all the content frames
    if (!contents) return false;
    const contentLength = contents.reduce(
      (acc, curr) => acc + curr.content.length,
      0,
    );
    if (method && header && contentLength === header.content.bodySize) {
      return true;
    }
    return false;
  }

  private handleMethodFrame(frame: MethodFrame) {
    if (INCOMING_CONTENT.includes(frame.content._kind)) {
      if (this.awaitingContentMethods.has(frame.channel)) {
        throw new Error(
          "[Channel Error - Channel " + frame.channel +
            "]: Received method frame while awaiting header/content frames",
        );
      }
      this.awaitingContentMethods.set(frame.channel, { method: frame });
    } else {
      methodPublisher.emit(frame);
    }
  }

  private handleHeaderFrame(frame: HeaderFrame) {
    if (frame.channel === 0) {
      throw new Error(
        "[Channel Error - Channel 0]: 504 Content frame received on channel 0",
      );
    }
    if (!this.awaitingContentMethods.has(frame.channel)) {
      throw new Error(
        "[Channel Error - Channel " + frame.channel +
          "]: Received header frame while not awaiting header/content frames",
      );
    }
    const awaitingContentMethod = this.awaitingContentMethods.get(
      frame.channel,
    )!;
    awaitingContentMethod.header = frame;
    if (this.shouldSendAwaitingMethod(awaitingContentMethod)) {
      methodPublisher.emit(awaitingContentMethod.method!);
      this.awaitingContentMethods.delete(frame.channel);
    }
  }

  private handleContentFrame(frame: ContentFrame) {
    if (frame.channel === 0) {
      throw new Error(
        "[Channel Error - Channel 0]: 504 Content frame received on channel 0",
      );
    }
    if (!this.awaitingContentMethods.has(frame.channel)) {
      throw new Error(
        "[Channel Error - Channel " + frame.channel +
          "]: Received content frame while not awaiting header/content frames",
      );
    }
    const awaitingContentMethod = this.awaitingContentMethods.get(
      frame.channel,
    )!;
    if (!awaitingContentMethod.contents) {
      awaitingContentMethod.contents = [frame];
    } else {
      awaitingContentMethod.contents.push(frame);
    }
    if (this.shouldSendAwaitingMethod(awaitingContentMethod)) {
      methodPublisher.emit(
        awaitingContentMethod.method!,
        awaitingContentMethod.header!.content,
        awaitingContentMethod.contents!.reduce(
          (a, c) => new Uint8Array([...a, ...c.content]),
          new Uint8Array(),
        ),
      );
      this.awaitingContentMethods.delete(frame.channel);
    }
  }

  private handleHeartbeatFrame(_frame: HeartbeatFrame) {
  }
}
export default new AmqpSocket();
