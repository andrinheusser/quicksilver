import { assertEquals } from "https://deno.land/std@0.172.0/testing/asserts.ts";
import { AmqpConnection } from "@quicksilver/mod.ts";

const connect = async () => {
  const amqpConnection = new AmqpConnection({
    host: "localhost",
    port: 5672,
    username: "guest",
    password: "guest",
    virtualHost: "/",
    heartbeat: 60,
  });
  await amqpConnection.connect();
  return amqpConnection;
};

Deno.test("Publish and Consumer", async () => {
  const TESTMESSAGE = { foo: "bar" };
  const conn = await connect();
  const channel = await conn.createChannel();
  await channel.declareExchange({
    exchange: "myExchange2",
    arguments: {},
    type: "direct",
    autoDelete: false,
    durable: false,
    internal: false,
    passive: false,
    nowait: false,
    ticket: 0,
  });
  await channel.declareQueue({
    arguments: {},
    autoDelete: false,
    durable: false,
    exclusive: false,
    nowait: false,
    passive: false,
    queue: "myQueue",
    ticket: 0,
  });

  await channel.qos({
    global: true,
    prefetchCount: 1,
    prefetchSize: 0,
  });

  channel.consume(
    {
      ticket: 0,
      consumerTag: "myConsumer",
      noAck: false,
      noLocal: false,
      nowait: false,
      queue: "myQueue",
      arguments: {},
      exclusive: false,
    },
    (message, properties, fields) => {
      const msg = JSON.parse(new TextDecoder().decode(message));
      console.log("message received:", msg);
      assertEquals(msg, TESTMESSAGE);
      channel.ack({
        deliveryTag: fields.deliveryTag,
        multiple: false,
      });
    },
  );

  console.log("message published:", TESTMESSAGE);
  channel.publish(
    new TextEncoder().encode(JSON.stringify(TESTMESSAGE)),
    {
      exchange: "myExchange2",
      routingKey: "myQueue",
      immediate: false,
      mandatory: false,
      ticket: 1,
    },
    { appId: "quicksilver" },
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await conn.close();
});
