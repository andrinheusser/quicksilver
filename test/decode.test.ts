import { assertEquals } from "https://deno.land/std@0.172.0/testing/asserts.ts";
import decodeMethod from "@quicksilver/lib/decode.ts";
import {
  encodeBasicCancel,
  encodeBasicConsume,
  encodeBasicConsumeOk,
  encodeBasicQosOk,
} from "@quicksilver/lib/encode.ts";
import Encoder from "../src/coding/Encoder.ts";
import Decoder from "../src/coding/Decoder.ts";

Deno.test("decode", () => {
  const encodedProperties = Encoder.properties({
    contentType: "aaaa",
    replyTo: "aaaa",
    headers: { a: "a" },
    deliveryMode: 1,
    messageId: "aaaa",
  });

  assertEquals(
    Decoder.readProperties(encodedProperties),
    {
      contentType: "aaaa",
      replyTo: "aaaa",
      headers: { a: "a" },
      deliveryMode: 1,
      messageId: "aaaa",
    },
  );

  assertEquals(
    decodeMethod(encodeBasicQosOk()),
    { _kind: "basic.qos-ok" },
  );
  assertEquals(
    decodeMethod(encodeBasicConsumeOk({ consumerTag: "test" })),
    {
      _kind: "basic.consume-ok",
      consumerTag: "test",
    },
  );
  assertEquals(
    decodeMethod(encodeBasicCancel({
      consumerTag: "test",
      nowait: true,
    })),
    {
      _kind: "basic.cancel",
      nowait: true,
      consumerTag: "test",
    },
  );

  assertEquals(
    decodeMethod(encodeBasicConsume({
      ticket: 0,
      queue: "test",
      consumerTag: "test",
      noLocal: false,
      noAck: true,
      exclusive: true,
      nowait: true,
      arguments: { foo: "bar", baz: 1 },
    }))!,
    {
      _kind: "basic.consume",
      noLocal: false,
      queue: "test",
      exclusive: true,
      nowait: true,
      consumerTag: "test",
      ticket: 0,
      noAck: true,
      arguments: { foo: "bar", baz: 1 },
    },
  );
});
