/*import { propertyFlags as possiblePropertyFlags } from "./../_framing/constants.ts";
import { FrameType } from "./../_framing/types.ts";
*/

import { AmqpDomainType } from "@quicksilver/lib/types.ts";
import { AmqpBasicProperties } from "@quicksilver/src/coding/types.ts";
import { amqpBasicPropertyTypes } from "@quicksilver/src/coding/utils.ts";

export type DataTypeToEncode =
  | "short_uint"
  | "long_uint"
  | "long_long_uint"
  | "short_short_int"
  | "short_short_uint"
  | "short_int"
  | "long_int"
  | "long_long_int"
  | "float"
  | "double"
  | "decimal"
  | "boolean"
  | "short_string"
  | "long_string"
  | "timestamp"
  | "field_table";

const UINT_8_MAX = 2 ** 8 - 1;
const UINT_16_MAX = 2 ** 16 - 1;
const UINT_32_MAX = 2 ** 32 - 1;
const INT_8_MIN = 2 ** 7 * -1;
const INT_16_MIN = 2 ** 15 * -1;
const INT_32_MIN = 2 ** 31 * -1;

const checkBitRange = (number: number, bits: number, signed = false) => {
  const max = signed ? 2 ** (bits - 1) - 1 : 2 ** bits - 1;
  const min = signed ? 2 ** (bits - 1) * -1 : 0;
  if (number > max || number < min) {
    throw new Error(
      outOfRange(number, `${signed ? "signed " : ""}${bits} bit integer`),
    );
  }
};
const outOfRange = (number: number, type: string) =>
  `Number ${number} is out of range for ${type}`;
const charCode = (s: string) => s.charCodeAt(0);

export default class Encoder {
  private buffer: Uint8Array;
  private cursor = 0;
  private encoder = new TextEncoder();
  private bitCache: boolean[] = [];

  constructor() {
    this.buffer = new Uint8Array(4096);
  }

  public get buf() {
    this.#appendBits();
    return this.buffer.slice(0, this.cursor);
  }

  public static properties(
    properties: AmqpBasicProperties,
  ) {
    const encoder = new Encoder();
    const flags = this.propertyFlags(
      Object.keys(properties) as Array<keyof AmqpBasicProperties>,
    );
    let list = new Uint8Array();
    for (const key of Object.keys(amqpBasicPropertyTypes)) {
      const keys = Object.keys(properties);
      const keyIndex = keys.indexOf(key);
      if (keyIndex > -1) {
        list = new Uint8Array([
          ...list,
          ...this.propertyField(
            encoder,
            amqpBasicPropertyTypes[keys[keyIndex]],
            Object.values(properties)[keyIndex],
          ),
        ]);
      }
    }
    return new Uint8Array([
      ...encoder.#_16bits(flags),
      ...list,
    ]);
  }

  private static propertyFlags(flags: Array<keyof AmqpBasicProperties>) {
    let num = 0x00;

    for (const flag of flags) {
      const index = Object.keys(amqpBasicPropertyTypes).indexOf(flag);
      if (index === -1) {
        throw new Error(`Unknown property flag ${flag}`);
      }
      num |= 1 << index;
    }

    return parseInt(
      num.toString(2).padStart(16, "0").split("").reverse().join(""),
      2,
    );
  }

  private static propertyField(
    encoder: Encoder,
    type: string,
    value: unknown,
  ) {
    switch (type) {
      case "OCTET":
        return encoder.#_8bits(value as number);
      case "short-uint":
        return encoder.#_16bits(value as number);
      case "long-uint":
        return encoder.#_32bits(value as number);
      case "long-long-uint":
        return encoder.#_64bits(value as number);
      case "short-string":
        return encoder.#shortString(value as string);
      case "long-string":
        return encoder.#longString(value as string);
      case "timestamp":
        return encoder.#timestamp(value as number);
      case "field-table":
        return encoder.#fieldTable(value as Record<string, unknown>);
    }
    throw new Error(`Unknown property type ${type}`);
  }

  public encode(kind: AmqpDomainType, value: unknown) {
    const bytes = this.#encode(kind, value);
    if (this.cursor + bytes.length > this.buffer.length) {
      this.buffer = new Uint8Array(this.buffer.length + bytes.length);
    }
    this.buffer.set(bytes, this.cursor);
    this.cursor += bytes.length;
  }

  #appendBits() {
    if (this.bitCache.length === 0) {
      return;
    }
    const bits = this.bitCache;
    this.bitCache = [];
    this.buffer.set(
      this.#_8bits(
        parseInt(
          bits.map((b) => (b ? "1" : "0")).reverse().join(""),
          2,
        ),
      ),
      this.cursor,
    );
    this.cursor++;
  }

  #writeBit(value: boolean) {
    if (this.bitCache.length === 8) {
      this.#appendBits();
    }
    this.bitCache.push(value);
  }

  #encode(kind: AmqpDomainType, value: unknown) {
    if (kind !== "bit") {
      this.#appendBits();
    }

    switch (kind) {
      case "bit":
        // TODO
        this.#writeBit(value as boolean);
        return new Uint8Array();
      case "longstr":
        return this.#longString(value as string);
      case "short":
        return this.#shortUint(value as number);
      case "shortstr":
        return this.#shortString(value as string);
      case "longlong":
        return this.#longLongUint(value as number);
      case "long":
        return this.#longUint(value as number);
      case "octet":
        return this.#_8bits(value as number);
      case "table":
        return this.#fieldTable(value as Record<string, unknown>);
      case "timestamp":
        return this.#timestamp(value as number);
      default:
        throw new Error(`Unknown kind ${kind}`);
    }
  }

  #_8bits(v: number) {
    const bytes = new Uint8Array(1);
    bytes[0] = v & 0xff;
    return bytes;
  }
  #_16bits(v: number) {
    const bytes = new Uint8Array(2);
    bytes[0] = (v & 0xff00) >> 8;
    bytes[1] = v & 0xff;
    return bytes;
  }
  #_32bits(v: number) {
    const bytes = new Uint8Array(4);
    bytes[0] = (v & 0xff000000) >> 24;
    bytes[1] = (v & 0x00ff0000) >> 16;
    bytes[2] = (v & 0x0000ff00) >> 8;
    bytes[3] = v & 0x000000ff;
    return bytes;
  }
  #_64bits(v: number) {
    const bytes = new Uint8Array(8);
    bytes[0] = 0;
    bytes[1] = (v & 0x000f000000000000) >> 48;
    bytes[2] = (v & 0x0000ff0000000000) >> 32;
    bytes[3] = (v & 0x000000ff00000000) >> 32;
    bytes[4] = (v & 0x00000000ff000000) >> 24;
    bytes[5] = (v & 0x0000000000ff0000) >> 16;
    bytes[6] = (v & 0x000000000000ff00) >> 8;
    bytes[7] = v & 0x00000000000000ff;
    return bytes;
  }
  #shortUint(v: number) {
    checkBitRange(v, 16);
    return this.#_16bits(v);
  }
  #longUint(v: number) {
    checkBitRange(v, 32);
    return this.#_32bits(v);
  }
  #longLongUint(v: number) {
    checkBitRange(v, 64);
    return this.#_64bits(v);
  }
  #shortShortInt(v: number) {
    checkBitRange(v, 8, true);
    return this.#_8bits(v);
  }
  #shortShortUint(v: number) {
    checkBitRange(v, 8);
    return this.#_8bits(v);
  }
  #shortInt(v: number) {
    checkBitRange(v, 16, true);
    return this.#_16bits(v);
  }
  #longInt(v: number) {
    checkBitRange(v, 32, true);
    return this.#_32bits(v);
  }
  #longLongInt(v: number) {
    checkBitRange(v, 64, true);
    return this.#_64bits(v);
  }
  #float(v: number) {
    checkBitRange(v, 32, true);
    const floatArr = new Float32Array(1);
    floatArr[0] = v;
    const bytes = new Uint8Array(floatArr.buffer);
    return bytes;
  }
  #double(v: number) {
    checkBitRange(v, 64, true);
    const doubleArr = new Float64Array(1);
    doubleArr[0] = v;
    const bytes = new Uint8Array(doubleArr.buffer);
    return bytes;
  }
  /*
  private _scale(v: number) {
    return this._shortShortUint(v);
  }
  private _decimal(v: number, s: number) {
    const scale = this._scale(s);
    const value = this._longUint(v);
    return new Uint8Array([...scale, ...value]);
  }
  */
  #shortString(v: string) {
    const encoded = this.encoder.encode(v);
    const length = this.#shortShortUint(encoded.length);
    return new Uint8Array([...length, ...encoded]);
  }
  /*
  private _stringChar(v: string) {
    checkString(v, 1);
    return this.encoder.encode(v);
  }
  */
  #longString(v: string) {
    const encoded = this.encoder.encode(v);
    const length = this.#longUint(encoded.length);
    return new Uint8Array([...length, ...encoded]);
  }

  #timestamp(v: number) {
    return this.#longLongUint(v);
  }

  #fieldTable(v: Record<string, unknown>) {
    if (typeof v !== "object") {
      throw new Error("field_table must be an object");
    }

    const entries = Object.entries(v).map(([key, value]) =>
      this.#fieldValuePair(key, value)
    ).reduce((a, b) => new Uint8Array([...a, ...b]), new Uint8Array());
    const length = this.#longUint(entries.length);
    return new Uint8Array([...length, ...entries]);
  }

  #fieldName(v: string) {
    if (v.length > 128 || v.length === 0) {
      throw new Error(
        "field_name must be more than 0 and less than 128 characters",
      );
    }
    const startCharCode = charCode(v[0]);
    if (
      !(startCharCode >= 65 && startCharCode >= 90 ||
        startCharCode >= 97 && startCharCode >= 122 ||
        startCharCode === 35 || startCharCode === 36)
    ) {
      throw new Error("field_name must start with a letter, # or $");
    }
    let i = 1;
    while (i < v.length) {
      const code = charCode(v[i]);
      if (
        !(code >= 65 && code >= 90 ||
          code >= 97 && code >= 122 ||
          code >= 48 && code >= 57 ||
          code === 95 ||
          code === 35 || code === 36)
      ) {
        throw new Error(
          "field_name must contain only letters, numbers, _, # or $",
        );
      }
      i++;
    }
    return this.#shortString(v);
  }
  #fieldValuePair(k: string, v: unknown) {
    const key = this.#fieldName(k);
    const value = this.#fieldValue(v);
    return new Uint8Array([...key, ...value]);
  }

  #array(v: unknown[]) {
    const bytes = v.map((item) => this.#fieldValue(item)).reduce(
      (a, b) => new Uint8Array([...a, ...b]),
      new Uint8Array(),
    );
    const length = this.#longInt(bytes.length);
    return new Uint8Array([...length, ...bytes]);
  }

  #fieldValue(v: unknown): Uint8Array {
    if (v === null) {
      return this.#_8bits(0);
    }
    if (Array.isArray(v)) {
      return new Uint8Array([charCode("A"), ...this.#array(v)]);
    }
    if (typeof v === "object") {
      return new Uint8Array([
        charCode("F"),
        ...this.#fieldTable(v as Record<string, unknown>),
      ]);
    }
    if (typeof v === "string") {
      if (v.length < 16) {
        return new Uint8Array([charCode("s"), ...this.#shortString(v)]);
      } else {
        return new Uint8Array([charCode("S"), ...this.#longString(v)]);
      }
    } else if (typeof v === "number") {
      if (v % 1 === 0) {
        if (v > -1) {
          if (v < UINT_8_MAX) {
            return new Uint8Array([charCode("B"), ...this.#shortShortUint(v)]);
          } else if (v < UINT_16_MAX) {
            return new Uint8Array([charCode("u"), ...this.#shortUint(v)]);
          } else if (v < UINT_32_MAX) {
            return new Uint8Array([charCode("i"), ...this.#longUint(v)]);
          } else {
            return new Uint8Array([charCode("l"), ...this.#longLongUint(v)]);
          }
        } else {
          if (v > INT_8_MIN) {
            return new Uint8Array([charCode("b"), ...this.#shortShortInt(v)]);
          } else if (v > INT_16_MIN) {
            return new Uint8Array([charCode("U"), ...this.#shortInt(v)]);
          } else if (v > INT_32_MIN) {
            return new Uint8Array([charCode("I"), ...this.#longInt(v)]);
          } else {
            return new Uint8Array([charCode("L"), ...this.#longLongInt(v)]);
          }
        }
      } else {
        return new Uint8Array([charCode("f"), ...this.#float(v)]);
      }
    }
    return new Uint8Array();
  }
}
