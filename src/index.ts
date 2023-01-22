import AmqpConnection from "@quicksilver/src/AmqpConnection.ts";

const amqpConnection = new AmqpConnection({
  host: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  virtualHost: "/",
  heartbeat: 60,
});

await amqpConnection.connect();

await amqpConnection.createChannel();

const channel1 = await amqpConnection.createChannel();

await channel1.declareExchange({
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

await channel1.declareQueue({
  arguments: {},
  autoDelete: false,
  durable: false,
  exclusive: false,
  nowait: false,
  passive: false,
  queue: "myQueue",
  ticket: 0,
});

await channel1.bindQueue({
  arguments: {},
  exchange: "myExchange2",
  queue: "myQueue",
  routingKey: "myQueue",
  nowait: false,
  ticket: 0,
});

await channel1.qos({
  global: true,
  prefetchCount: 1,
  prefetchSize: 0,
});

setInterval(() => {
  channel1.publish(
    new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
    {
      exchange: "myExchange2",
      routingKey: "myQueue",
      immediate: false,
      mandatory: false,
      ticket: 1,
    },
    { appId: "quicksilver" },
  );
}, 20);

channel1.consume(
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
    //console.log("message:", JSON.parse(new TextDecoder().decode(message)));
    channel1.ack({
      deliveryTag: fields.deliveryTag,
      multiple: false,
    });
  },
);
