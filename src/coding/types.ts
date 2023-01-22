export type AmqpBasicProperties = {
  contentType?: string;
  contentEncoding?: string;
  headers?: { [key: string]: unknown };
  deliveryMode?: number;
  priority?: number;
  correlationId?: string;
  replyTo?: string;
  expiration?: string;
  messageId?: string;
  timestamp?: Date;
  type?: string;
  userId?: string;
  appId?: string;
};
