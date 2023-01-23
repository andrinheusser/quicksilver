import { assertEquals } from "https://deno.land/std@0.172.0/testing/asserts.ts";
import { AmqpConnection } from "@quicksilver/mod.ts";

async function benchmarkFunction(
  fn: () => void | Promise<void>,
): Promise<number> {
  const now = window.performance.now();
  await fn();
  return window.performance.now() - now;
}

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
  const COUNT = 1000;
  const queue = "q" + Math.random().toString(36).slice(2, 7);
  const conn = await connect();
  const channel = await conn.createChannel();
  await channel.declareExchange({
    exchange: "quicksilverTestExchange",
    arguments: {},
    type: "direct",
    autoDelete: true,
    durable: false,
    internal: false,
    passive: false,
    nowait: false,
    ticket: 0,
  });
  await channel.declareQueue({
    arguments: {},
    autoDelete: true,
    durable: false,
    exclusive: false,
    nowait: false,
    passive: false,
    queue,
    ticket: 0,
  });

  await channel.qos({
    global: true,
    prefetchCount: COUNT,
    prefetchSize: 0,
  });

  const encoder = new TextEncoder();

  const publishMs = await benchmarkFunction(() => {
    for (let i = 0; i < 1000; i++) {
      channel.publish(
        encoder.encode(i.toString()),
        {
          exchange: "",
          routingKey: queue,
          immediate: false,
          mandatory: false,
          ticket: 1,
        },
        {},
      );
    }
  });
  console.log(
    "Publishing 1000 messages took",
    publishMs,
    "ms",
  );
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const consumeMs = await benchmarkFunction(async () => {
    let count = 0;
    await new Promise<void>((resolve, _reject) => {
      channel.consume(
        {
          ticket: 0,
          consumerTag: "testConsumer",
          noAck: false,
          noLocal: false,
          nowait: false,
          queue,
          arguments: {},
          exclusive: false,
        },
        (_message, _properties, _fields) => {
          count++;
          if (count === COUNT) {
            resolve();
          }
        },
      );
    });
  });
  console.log("Consuming 1000 messages took", consumeMs, "ms");

  await conn.close();
});
