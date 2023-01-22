import { BinaryReader } from "@quicksilver/deps.ts";
import { AmqpBasicProperties } from "@quicksilver/src/coding/types.ts";
import { amqpBasicPropertyTypes } from "@quicksilver/src/coding/utils.ts";

export type FieldValue =
  | string
  | number
  | boolean
  | BigInt
  | Record<string, string | number | boolean | BigInt>;
export type FieldTable = Record<string, FieldValue>;

const charCode = (s: string) => s.charCodeAt(0);

export default class Decoder {
  reader: BinaryReader;
  readingBits = false;
  currentBits: number | undefined = undefined;
  currentBitIndex = 0;

  constructor(public bytes: Uint8Array) {
    this.reader = new BinaryReader(bytes);
  }

  private readBit(): boolean {
    if (this.currentBits === undefined) {
      this.currentBits = this.reader.readUint8();
    }
    const bits = this.currentBits.toString(2).padStart(8, "0");
    const bit = parseInt(bits[7 - this.currentBitIndex]);
    this.currentBitIndex++;
    if (this.currentBitIndex === 8) {
      this.currentBits = undefined;
      this.currentBitIndex = 0;
    }
    return bit === 1;
  }
  public readString(t: string): string {
    switch (t) {
      case "shortstr":
        return this.shortString();
      case "longstr":
        return this.longString();
    }
    throw new Error(`Unknown (or not string) type ${t}`);
  }
  public readNumber(t: string): number {
    switch (t) {
      case "short":
        return this.shortInt();
      case "long":
        return this.longUInt();
      case "octet":
        return this.octet();
    }
    throw new Error(`Unknown (or not number, max 32bit) type ${t}`);
  }
  public readBigNumber(t: string): number {
    switch (t) {
      case "longlong":
        return Number(this.longLongUInt());
      case "timestamp":
        return Number(this.timestamp());
    }
    throw new Error(`Unknown (or not 64 bit number) type ${t}`);
  }

  public readBoolean(_t: string): boolean {
    return this.readBit();
  }

  public readTable(_t: string): Record<string, FieldValue> {
    return this.table();
  }

  public read(t: string): number | string | BigInt | FieldTable | boolean {
    switch (t) {
      case "bit":
        return this.readBit();
      case "longstr":
        return this.longString();
      case "short":
        return this.shortInt();
      case "shortstr":
        return this.shortString();
      case "longlong":
        return this.longLongUInt();
      case "long":
        return this.longUInt();
      case "octet":
        return this.octet();
      case "table":
        return this.table();
      case "timestamp":
        return this.timestamp();
    }
    throw new Error(`Unknown type ${t}`);
  }

  public static readProperties(bytes: Uint8Array): AmqpBasicProperties {
    const decoder = new Decoder(bytes);
    const props: AmqpBasicProperties = {};
    const flags = decoder.shortUInt();
    const flagBits = flags.toString(2).padStart(16, "0").split("");
    for (let i = 0; i < flagBits.length; i++) {
      if (flagBits[i] === "0") continue;
      const propertyName = Object.keys(amqpBasicPropertyTypes)[i];
      switch (propertyName) {
        case "appId":
        case "userId":
        case "type":
        case "messageId":
        case "expiration":
        case "replyTo":
        case "correlationId":
        case "contentEncoding":
        case "contentType": {
          props[propertyName] = decoder.shortString();
          break;
        }
        case "headers": {
          const value = decoder.table();
          props[propertyName] = value;
          break;
        }
        case "priority":
        case "deliveryMode": {
          const value = decoder.octet();
          props[propertyName] = value;
          break;
        }
        case "timestamp": {
          const value = Number(decoder.timestamp());
          props[propertyName] = new Date(value);
          break;
        }
      }
    }
    return props;
  }

  public octet(): number {
    return this.reader.readUint8();
  }
  public shortShortUInt(): number {
    return this.reader.readUint8();
  }
  public shortShortInt(): number {
    return this.reader.readInt8();
  }

  public shortUInt(): number {
    return this.reader.readUint16();
  }
  public shortInt(): number {
    return this.reader.readInt16();
  }

  public longUInt(): number {
    return this.reader.readUint32();
  }
  public longInt(): number {
    return this.reader.readInt32();
  }

  public longLongUInt(): BigInt {
    return this.reader.readBigUint64();
  }
  public longLongInt(): BigInt {
    return this.reader.readBigInt64();
  }

  public float(): number {
    return this.reader.readFloat32();
  }
  public double(): number {
    return this.reader.readFloat64();
  }
  public decimal(): number {
    //TODO: Implement
    this.reader.readUint8();
    return this.longInt();
  }
  public shortString(): string {
    const length = this.reader.readUint8();
    return this.reader.readString(length);
  }
  public longString(): string {
    const length = this.reader.readUint32();
    return this.reader.readString(length);
  }
  public timestamp(): BigInt {
    return this.longLongUInt();
  }

  public table(): FieldTable {
    const length = this.reader.readUint32();
    const table: FieldTable = {};
    const start = this.reader.position;
    while (this.reader.position < start + length) {
      const [name, value] = this.tableFieldValuePair();
      table[name] = value;
    }
    return table;
  }
  public tableFieldValuePair(): [string, FieldValue] {
    const name = this.shortString();
    const value = this.fieldValue();
    return [name, value];
  }
  public array(): FieldValue[] {
    const length = this.longUInt();
    const array = [];

    const start = this.reader.position;
    while (this.reader.position < start + length) {
      array.push(this.fieldValue());
    }
    return array;
  }

  public fieldValue(): FieldValue {
    const type = this.shortShortUInt();
    switch (type) {
      case charCode("t"):
        return this.octet();
      case charCode("b"):
        return this.shortShortInt();
      case charCode("B"):
        return this.shortShortUInt();
      case charCode("U"):
        return this.shortInt();
      case charCode("u"):
        return this.shortUInt();
      case charCode("I"):
        return this.longInt();
      case charCode("i"):
        return this.longUInt();
      case charCode("L"):
        return this.longLongInt();
      case charCode("l"):
        return this.longLongUInt();
      case charCode("f"):
        return this.float();
      case charCode("d"):
        return this.double();
      case charCode("D"):
        return this.decimal();
      case charCode("s"):
        return this.shortString();
      case charCode("S"):
        return this.longString();
      case charCode("A"):
        return this.array().join(" | ");
      case charCode("T"):
        return this.timestamp();
      case charCode("F"):
        return this.table() as Record<
          string,
          string | number | boolean | BigInt
        >;
      case charCode("V"):
        return "";
    }
    return "";
  }
}
