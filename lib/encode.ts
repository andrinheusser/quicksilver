import Encoder from "@quicksilver/src/coding/Encoder.ts";
import { getTypeForDomain } from "@quicksilver/lib/constants.ts";
import type { BasicQos } from "./types.ts";
import type { BasicConsume } from "./types.ts";
import type { BasicConsumeOk } from "./types.ts";
import type { BasicCancel } from "./types.ts";
import type { BasicCancelOk } from "./types.ts";
import type { BasicPublish } from "./types.ts";
import type { BasicReturn } from "./types.ts";
import type { BasicDeliver } from "./types.ts";
import type { BasicGet } from "./types.ts";
import type { BasicGetOk } from "./types.ts";
import type { BasicGetEmpty } from "./types.ts";
import type { BasicAck } from "./types.ts";
import type { BasicReject } from "./types.ts";
import type { BasicRecoverAsync } from "./types.ts";
import type { BasicRecover } from "./types.ts";
import type { BasicNack } from "./types.ts";
import type { ConnectionStart } from "./types.ts";
import type { ConnectionStartOk } from "./types.ts";
import type { ConnectionSecure } from "./types.ts";
import type { ConnectionSecureOk } from "./types.ts";
import type { ConnectionTune } from "./types.ts";
import type { ConnectionTuneOk } from "./types.ts";
import type { ConnectionOpen } from "./types.ts";
import type { ConnectionOpenOk } from "./types.ts";
import type { ConnectionClose } from "./types.ts";
import type { ConnectionBlocked } from "./types.ts";
import type { ConnectionUpdateSecret } from "./types.ts";
import type { ChannelOpen } from "./types.ts";
import type { ChannelOpenOk } from "./types.ts";
import type { ChannelFlow } from "./types.ts";
import type { ChannelFlowOk } from "./types.ts";
import type { ChannelClose } from "./types.ts";
import type { AccessRequest } from "./types.ts";
import type { AccessRequestOk } from "./types.ts";
import type { ExchangeDeclare } from "./types.ts";
import type { ExchangeDelete } from "./types.ts";
import type { ExchangeBind } from "./types.ts";
import type { ExchangeUnbind } from "./types.ts";
import type { QueueDeclare } from "./types.ts";
import type { QueueDeclareOk } from "./types.ts";
import type { QueueBind } from "./types.ts";
import type { QueuePurge } from "./types.ts";
import type { QueuePurgeOk } from "./types.ts";
import type { QueueDelete } from "./types.ts";
import type { QueueDeleteOk } from "./types.ts";
import type { QueueUnbind } from "./types.ts";
import type { ConfirmSelect } from "./types.ts";

export function encodeBasicQos(args: BasicQos): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('long'), args.prefetchSize ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.prefetchCount ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.global ?? undefined);
	return encoder.buf;
}
export function encodeBasicQosOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 11);
	return encoder.buf;
}
export function encodeBasicConsume(args: BasicConsume): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 20);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.consumerTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.noLocal ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.noAck ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.exclusive ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeBasicConsumeOk(args: BasicConsumeOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 21);
	encoder.encode(getTypeForDomain('shortstr'), args.consumerTag ?? undefined);
	return encoder.buf;
}
export function encodeBasicCancel(args: BasicCancel): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 30);
	encoder.encode(getTypeForDomain('shortstr'), args.consumerTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	return encoder.buf;
}
export function encodeBasicCancelOk(args: BasicCancelOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 31);
	encoder.encode(getTypeForDomain('shortstr'), args.consumerTag ?? undefined);
	return encoder.buf;
}
export function encodeBasicPublish(args: BasicPublish): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 40);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.mandatory ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.immediate ?? undefined);
	return encoder.buf;
}
export function encodeBasicReturn(args: BasicReturn): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 50);
	encoder.encode(getTypeForDomain('short'), args.replyCode ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.replyText ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	return encoder.buf;
}
export function encodeBasicDeliver(args: BasicDeliver): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 60);
	encoder.encode(getTypeForDomain('shortstr'), args.consumerTag ?? undefined);
	encoder.encode(getTypeForDomain('longlong'), args.deliveryTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.redelivered ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	return encoder.buf;
}
export function encodeBasicGet(args: BasicGet): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 70);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.noAck ?? undefined);
	return encoder.buf;
}
export function encodeBasicGetOk(args: BasicGetOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 71);
	encoder.encode(getTypeForDomain('longlong'), args.deliveryTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.redelivered ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('message_count'), args.messageCount ?? undefined);
	return encoder.buf;
}
export function encodeBasicGetEmpty(args: BasicGetEmpty): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 72);
	encoder.encode(getTypeForDomain('shortstr'), args.clusterId ?? undefined);
	return encoder.buf;
}
export function encodeBasicAck(args: BasicAck): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 80);
	encoder.encode(getTypeForDomain('longlong'), args.deliveryTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.multiple ?? undefined);
	return encoder.buf;
}
export function encodeBasicReject(args: BasicReject): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 90);
	encoder.encode(getTypeForDomain('longlong'), args.deliveryTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.requeue ?? true);
	return encoder.buf;
}
export function encodeBasicRecoverAsync(args: BasicRecoverAsync): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 100);
	encoder.encode(getTypeForDomain('bit'), args.requeue ?? undefined);
	return encoder.buf;
}
export function encodeBasicRecover(args: BasicRecover): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 110);
	encoder.encode(getTypeForDomain('bit'), args.requeue ?? undefined);
	return encoder.buf;
}
export function encodeBasicRecoverOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 111);
	return encoder.buf;
}
export function encodeBasicNack(args: BasicNack): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 60);
	encoder.encode('short', 120);
	encoder.encode(getTypeForDomain('longlong'), args.deliveryTag ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.multiple ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.requeue ?? true);
	return encoder.buf;
}
export function encodeConnectionStart(args: ConnectionStart): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('octet'), args.versionMajor ?? undefined);
	encoder.encode(getTypeForDomain('octet'), args.versionMinor ?? 9);
	encoder.encode(getTypeForDomain('peer_properties'), args.serverProperties ?? undefined);
	encoder.encode(getTypeForDomain('longstr'), args.mechanisms ?? "PLAIN");
	encoder.encode(getTypeForDomain('longstr'), args.locales ?? "en_US");
	return encoder.buf;
}
export function encodeConnectionStartOk(args: ConnectionStartOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 11);
	encoder.encode(getTypeForDomain('peer_properties'), args.clientProperties ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.mechanism ?? "PLAIN");
	encoder.encode(getTypeForDomain('longstr'), args.response ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.locale ?? "en_US");
	return encoder.buf;
}
export function encodeConnectionSecure(args: ConnectionSecure): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 20);
	encoder.encode(getTypeForDomain('longstr'), args.challenge ?? undefined);
	return encoder.buf;
}
export function encodeConnectionSecureOk(args: ConnectionSecureOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 21);
	encoder.encode(getTypeForDomain('longstr'), args.response ?? undefined);
	return encoder.buf;
}
export function encodeConnectionTune(args: ConnectionTune): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 30);
	encoder.encode(getTypeForDomain('short'), args.channelMax ?? undefined);
	encoder.encode(getTypeForDomain('long'), args.frameMax ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.heartbeat ?? undefined);
	return encoder.buf;
}
export function encodeConnectionTuneOk(args: ConnectionTuneOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 31);
	encoder.encode(getTypeForDomain('short'), args.channelMax ?? undefined);
	encoder.encode(getTypeForDomain('long'), args.frameMax ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.heartbeat ?? undefined);
	return encoder.buf;
}
export function encodeConnectionOpen(args: ConnectionOpen): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 40);
	encoder.encode(getTypeForDomain('shortstr'), args.virtualHost ?? "/");
	encoder.encode(getTypeForDomain('shortstr'), args.capabilities ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.insist ?? undefined);
	return encoder.buf;
}
export function encodeConnectionOpenOk(args: ConnectionOpenOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 41);
	encoder.encode(getTypeForDomain('shortstr'), args.knownHosts ?? undefined);
	return encoder.buf;
}
export function encodeConnectionClose(args: ConnectionClose): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 50);
	encoder.encode(getTypeForDomain('short'), args.replyCode ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.replyText ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.classId ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.methodId ?? undefined);
	return encoder.buf;
}
export function encodeConnectionCloseOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 51);
	return encoder.buf;
}
export function encodeConnectionBlocked(args: ConnectionBlocked): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 60);
	encoder.encode(getTypeForDomain('shortstr'), args.reason ?? undefined);
	return encoder.buf;
}
export function encodeConnectionUnblocked(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 61);
	return encoder.buf;
}
export function encodeConnectionUpdateSecret(args: ConnectionUpdateSecret): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 70);
	encoder.encode(getTypeForDomain('longstr'), args.newSecret ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.reason ?? undefined);
	return encoder.buf;
}
export function encodeConnectionUpdateSecretOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 10);
	encoder.encode('short', 71);
	return encoder.buf;
}
export function encodeChannelOpen(args: ChannelOpen): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('shortstr'), args.outOfBand ?? undefined);
	return encoder.buf;
}
export function encodeChannelOpenOk(args: ChannelOpenOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 11);
	encoder.encode(getTypeForDomain('longstr'), args.channelId ?? undefined);
	return encoder.buf;
}
export function encodeChannelFlow(args: ChannelFlow): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 20);
	encoder.encode(getTypeForDomain('bit'), args.active ?? undefined);
	return encoder.buf;
}
export function encodeChannelFlowOk(args: ChannelFlowOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 21);
	encoder.encode(getTypeForDomain('bit'), args.active ?? undefined);
	return encoder.buf;
}
export function encodeChannelClose(args: ChannelClose): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 40);
	encoder.encode(getTypeForDomain('short'), args.replyCode ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.replyText ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.classId ?? undefined);
	encoder.encode(getTypeForDomain('short'), args.methodId ?? undefined);
	return encoder.buf;
}
export function encodeChannelCloseOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 20);
	encoder.encode('short', 41);
	return encoder.buf;
}
export function encodeAccessRequest(args: AccessRequest): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 30);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('shortstr'), args.realm ?? "/data");
	encoder.encode(getTypeForDomain('bit'), args.exclusive ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.passive ?? true);
	encoder.encode(getTypeForDomain('bit'), args.active ?? true);
	encoder.encode(getTypeForDomain('bit'), args.write ?? true);
	encoder.encode(getTypeForDomain('bit'), args.read ?? true);
	return encoder.buf;
}
export function encodeAccessRequestOk(args: AccessRequestOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 30);
	encoder.encode('short', 11);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? 1);
	return encoder.buf;
}
export function encodeExchangeDeclare(args: ExchangeDeclare): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.type ?? "direct");
	encoder.encode(getTypeForDomain('bit'), args.passive ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.durable ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.autoDelete ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.internal ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeExchangeDeclareOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 11);
	return encoder.buf;
}
export function encodeExchangeDelete(args: ExchangeDelete): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 20);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.ifUnused ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	return encoder.buf;
}
export function encodeExchangeDeleteOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 21);
	return encoder.buf;
}
export function encodeExchangeBind(args: ExchangeBind): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 30);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.destination ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.source ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeExchangeBindOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 31);
	return encoder.buf;
}
export function encodeExchangeUnbind(args: ExchangeUnbind): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 40);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.destination ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.source ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeExchangeUnbindOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 40);
	encoder.encode('short', 51);
	return encoder.buf;
}
export function encodeQueueDeclare(args: QueueDeclare): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.passive ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.durable ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.exclusive ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.autoDelete ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeQueueDeclareOk(args: QueueDeclareOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 11);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('message_count'), args.messageCount ?? undefined);
	encoder.encode(getTypeForDomain('long'), args.consumerCount ?? undefined);
	return encoder.buf;
}
export function encodeQueueBind(args: QueueBind): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 20);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeQueueBindOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 21);
	return encoder.buf;
}
export function encodeQueuePurge(args: QueuePurge): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 30);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	return encoder.buf;
}
export function encodeQueuePurgeOk(args: QueuePurgeOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 31);
	encoder.encode(getTypeForDomain('message_count'), args.messageCount ?? undefined);
	return encoder.buf;
}
export function encodeQueueDelete(args: QueueDelete): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 40);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.ifUnused ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.ifEmpty ?? undefined);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	return encoder.buf;
}
export function encodeQueueDeleteOk(args: QueueDeleteOk): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 41);
	encoder.encode(getTypeForDomain('message_count'), args.messageCount ?? undefined);
	return encoder.buf;
}
export function encodeQueueUnbind(args: QueueUnbind): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 50);
	encoder.encode(getTypeForDomain('short'), args.ticket ?? undefined);
	encoder.encode(getTypeForDomain('queue_name'), args.queue ?? undefined);
	encoder.encode(getTypeForDomain('exchange_name'), args.exchange ?? undefined);
	encoder.encode(getTypeForDomain('shortstr'), args.routingKey ?? undefined);
	encoder.encode(getTypeForDomain('table'), args.arguments ?? {});
	return encoder.buf;
}
export function encodeQueueUnbindOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 50);
	encoder.encode('short', 51);
	return encoder.buf;
}
export function encodeTxSelect(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 10);
	return encoder.buf;
}
export function encodeTxSelectOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 11);
	return encoder.buf;
}
export function encodeTxCommit(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 20);
	return encoder.buf;
}
export function encodeTxCommitOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 21);
	return encoder.buf;
}
export function encodeTxRollback(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 30);
	return encoder.buf;
}
export function encodeTxRollbackOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 90);
	encoder.encode('short', 31);
	return encoder.buf;
}
export function encodeConfirmSelect(args: ConfirmSelect): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 85);
	encoder.encode('short', 10);
	encoder.encode(getTypeForDomain('bit'), args.nowait ?? undefined);
	return encoder.buf;
}
export function encodeConfirmSelectOk(): Uint8Array {
	const encoder = new Encoder();
	encoder.encode('short', 85);
	encoder.encode('short', 11);
	return encoder.buf;
}
