import { AmqpBasicProperties } from "./types.ts";

export const amqpBasicPropertyTypes: Record<string, string> = {
  "contentType": "short-string",
  "contentEncoding": "short-string",
  "headers": "field-table",
  "deliveryMode": "OCTET",
  "priority": "OCTET",
  "correlationId": "short-string",
  "replyTo": "short-string",
  "expiration": "short-string",
  "messageId": "short-string",
  "timestamp": "timestamp",
  "type": "short-string",
  "userId": "short-string",
  "appId": "short-string",
};
