import { assertEquals } from "https://deno.land/std@0.172.0/testing/asserts.ts";
import {
  encodeBasicCancel,
  encodeBasicConsume,
  encodeBasicConsumeOk,
  encodeBasicQosOk,
} from "@quicksilver/lib/encode.ts";
import Encoder from "@quicksilver/src/coding/Encoder.ts";

Deno.test("encode", () => {
  assertEquals(
    Encoder.properties({
      contentType: "aaaa",
      replyTo: "aaaa",
      headers: { a: "a" },
      deliveryMode: 1,
      messageId: "aaaa",
    }),
    new Uint8Array([
      178,
      128,
      4,
      97,
      97,
      97,
      97,
      0,
      0,
      0,
      5,
      1,
      97,
      115,
      1,
      97,
      1,
      4,
      97,
      97,
      97,
      97,
      4,
      97,
      97,
      97,
      97,
    ]),
  );

  assertEquals(encodeBasicQosOk(), new Uint8Array([0, 60, 0, 11]));
  assertEquals(
    encodeBasicConsumeOk({ consumerTag: "test" }),
    new Uint8Array([0, 60, 0, 21, 4, 116, 101, 115, 116]),
  );
  assertEquals(
    encodeBasicCancel({ consumerTag: "test", nowait: true }),
    new Uint8Array([0, 60, 0, 30, 4, 116, 101, 115, 116, 1]),
  );
  assertEquals(
    encodeBasicConsume({
      ticket: 0,
      queue: "test",
      consumerTag: "test",
      noLocal: false,
      noAck: true,
      exclusive: true,
      nowait: true,
      arguments: {},
    }),
    new Uint8Array([
      0,
      60,
      0,
      20,
      0,
      0,
      4,
      116,
      101,
      115,
      116,
      4,
      116,
      101,
      115,
      116,
      14,
      0,
      0,
      0,
      0,
    ]),
  );
});
