import type {
  ContentFrame,
  HeaderFrame,
  MethodFrame,
} from "@quicksilver/src/framing/types.ts";

export type AwaitingContentMethod = {
  method: MethodFrame;
  header?: HeaderFrame;
  contents?: Array<ContentFrame>;
};
