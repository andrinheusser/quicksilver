import decodeMethod from "@quicksilver/lib/decode.ts";
import { AmqpBasicProperties } from "@quicksilver/src/coding/types.ts";

export interface BasicFrame {
  channel: number;
  type: string;
}
export interface MethodFrame extends BasicFrame {
  type: "method";
  content: ReturnType<typeof decodeMethod>;
}
export interface HeaderFrame extends BasicFrame {
  type: "header";
  content: DecodedHeaderFrame;
}
export interface ContentFrame extends BasicFrame {
  type: "content";
  content: Uint8Array;
}
export interface HeartbeatFrame extends BasicFrame {
  type: "heartbeat";
}
export type IncomingFrame =
  | MethodFrame
  | HeaderFrame
  | ContentFrame
  | HeartbeatFrame;

export type DecodedHeaderFrame = {
  classId: number;
  weight: number;
  bodySize: number;
  properties: AmqpBasicProperties;
};
