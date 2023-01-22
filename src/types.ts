import type { BasicDeliver } from "@quicksilver/lib/types.ts";
import type { AmqpBasicProperties } from "./coding/types.ts";

export type AmqpConsumer = (
  message: Uint8Array,
  properties: AmqpBasicProperties,
  fields: BasicDeliver,
) => void;
