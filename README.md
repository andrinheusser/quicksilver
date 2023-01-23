# Quicksilver - Deno AMQP 0.9.1 Client for RabbitMQ

AMQP client implementation to grok AMQP.

## Looking for a production-ready Deno AMQP Client?

I suggest [lenkan/deno-amqp](https://github.com/lenkan/deno-amqp).

## Features 

- [x] Encoding / Decoding Frames
- [x] Connection & Channel Class Architecture
- [x] Opening Connections & Channels
- [x] Declaring Queues, Exchanges, Bindings
- [x] Basic Qos, ack, reject
- [x] Heartbeating
- [x] Sending Messages
- [x] Consuming Messages
- [ ] Error Handling / Connection & Channel Exceptions / Gracefully close connections
- [x] mod.ts with relevant exports
- [ ] Extend Encoding/Decoding tests
- [ ] Basic get / return

## Codegen

Run `deno task codegen`

## Tests

Module tests require a rabbitmq instance running on localhost.

