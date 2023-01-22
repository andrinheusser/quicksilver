import decodeMethod from "@quicksilver/lib/decode.ts";
import Encoder from "@quicksilver/src/coding/Encoder.ts";
import { AmqpBasicProperties } from "@quicksilver/src/coding/types.ts";
import {
  DecodedHeaderFrame,
  IncomingFrame,
} from "@quicksilver/src/framing/types.ts";
import Decoder from "../coding/Decoder.ts";

export type PropertyFlag =
  | "content-type"
  | "content-encoding"
  | "headers"
  | "delivery-mode"
  | "priority"
  | "correlation-id"
  | "reply-to"
  | "expiration"
  | "message-id"
  | "timestamp"
  | "type"
  | "user-id"
  | "app-id";

export default class Frame {
  public static bulidProtocolHeader(): Uint8Array {
    return new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]);
  }
  public static readFrame(
    data: Uint8Array,
  ): IncomingFrame & { remaining: Uint8Array } {
    const type = data[0];
    const channel = (data[1] << 8) | data[2];
    const size = (data[3] << 24) | (data[4] << 16) | (data[5] << 8) | data[6];
    const payload = data.slice(7, 7 + size);
    const end = data[7 + size];

    if (end !== 0xce) {
      throw new Error("Frame end byte is not 0xCE");
    }
    const remaining = data.slice(7 + size + 1);
    switch (type) {
      case 1:
        return {
          type: "method",
          channel,
          content: decodeMethod(payload),
          remaining,
        };
      case 2:
        return {
          type: "header",
          channel,
          content: Frame.readHeaderFrame(payload),
          remaining,
        };
      case 3:
        return { type: "content", channel, content: payload, remaining };
      case 8:
        return { type: "heartbeat", channel, remaining };
      default:
        throw new Error("Unknown frame type");
    }
  }

  private static readHeaderFrame(
    data: Uint8Array,
  ): DecodedHeaderFrame {
    const classId = (data[0] << 8) | data[1];
    const weight = (data[2] << 8) | data[3];
    const bodySize = (data[4] << 56) |
      (data[5] << 48) |
      (data[6] << 40) |
      (data[7] << 32) |
      (data[8] << 24) |
      (data[9] << 16) |
      (data[10] << 8) |
      data[11];

    return {
      classId,
      weight,
      bodySize,
      properties: Decoder.readProperties(data.slice(12)),
    };
  }

  private static buildFrame(
    type: number,
    channel: number,
    payload: Uint8Array,
  ) {
    const frame = new Uint8Array(7 + payload.length + 1);
    frame[0] = type;
    frame[1] = (channel & 0xff00) >> 8;
    frame[2] = channel & 0x00ff;
    frame[3] = (payload.length & 0xff000000) >> 24;
    frame[4] = (payload.length & 0x00ff0000) >> 16;
    frame[5] = (payload.length & 0x0000ff00) >> 8;
    frame[6] = payload.length & 0x000000ff;
    frame.set(payload, 7);
    frame[frame.length - 1] = 206;
    return frame;
  }

  public static buildMethodFrame(
    channel: number,
    payload: Uint8Array,
  ): Uint8Array {
    return this.buildFrame(1, channel, payload);
  }

  public static buildContentFrame(
    channel: number,
    clxId: number,
    weigth: number,
    properties: AmqpBasicProperties,
    payload: Uint8Array,
    maxSize: number,
  ): Uint8Array[] {
    const header = this.buildContentHeader(
      clxId,
      weigth,
      payload.length,
      properties,
    );
    const headerFrame = Frame.buildFrame(2, channel, header);
    const contents = Frame.buildContentBody(payload, maxSize, channel);
    return [headerFrame, ...contents];
  }

  private static buildContentHeader(
    clxId: number,
    weigth: number,
    bodySize: number,
    properties: AmqpBasicProperties,
  ) {
    //const properties = Encoder.
    //const propertyFlagsNum = Encoder.propertyFlags(propertyFlags);
    const props = Encoder.properties(properties);
    const contentHeaderHeader = new Uint8Array(12);
    contentHeaderHeader[0] = (clxId & 0xff00) >> 8;
    contentHeaderHeader[1] = clxId & 0x00ff;
    contentHeaderHeader[2] = (weigth & 0xff00) >> 8;
    contentHeaderHeader[3] = weigth & 0x00ff;
    contentHeaderHeader[4] = (bodySize & 0xff00000000000000) >> 56;
    contentHeaderHeader[5] = (bodySize & 0x00ff000000000000) >> 48;
    contentHeaderHeader[6] = (bodySize & 0x0000ff0000000000) >> 40;
    contentHeaderHeader[7] = (bodySize & 0x000000ff00000000) >> 32;
    contentHeaderHeader[8] = (bodySize & 0x00000000ff000000) >> 24;
    contentHeaderHeader[9] = (bodySize & 0x0000000000ff0000) >> 16;
    contentHeaderHeader[10] = (bodySize & 0x000000000000ff00) >> 8;
    contentHeaderHeader[11] = bodySize & 0x00000000000000ff;

    const contentHeader = new Uint8Array(
      contentHeaderHeader.length + props.length,
    );
    contentHeader.set(contentHeaderHeader);
    contentHeader.set(props, contentHeaderHeader.length);

    return contentHeader;
  }
  private static buildContentBody(
    payload: Uint8Array,
    maxSize: number,
    channel: number,
  ) {
    const slices: Uint8Array[] = [payload.slice(0, maxSize)];
    let offset = maxSize;
    while (payload.length - offset > maxSize) {
      slices.push(payload.slice(offset, offset + maxSize));
      offset += maxSize;
    }
    return slices.map((s) => Frame.buildFrame(3, channel, s));
  }

  public static buildHeartbeatFrame(): Uint8Array {
    return new Uint8Array([8, 0, 0, 0, 0, 0, 0, 206]);
  }
}
