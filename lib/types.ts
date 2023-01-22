import type { AmqpBasicProperties } from '@quicksilver/src/coding/types.ts'

export type AmqpDomainType = "bit"  | "longstr"  | "short"  | "shortstr"  | "longlong"  | "long"  | "octet"  | "table"  | "timestamp" ;

export interface BasicQos {
	prefetchSize: number;
	prefetchCount: number;
	global: boolean;
}
export interface DecodedBasicQos extends BasicQos {
	_kind: "basic.qos";
}
export interface BasicQosOk {
}
export interface DecodedBasicQosOk extends BasicQosOk {
	_kind: "basic.qos-ok";
}
export interface BasicConsume {
	ticket: number;
	queue: string;
	consumerTag: string;
	noLocal: boolean;
	noAck: boolean;
	exclusive: boolean;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedBasicConsume extends BasicConsume {
	_kind: "basic.consume";
}
export interface BasicConsumeOk {
	consumerTag: string;
}
export interface DecodedBasicConsumeOk extends BasicConsumeOk {
	_kind: "basic.consume-ok";
}
export interface BasicCancel {
	consumerTag: string;
	nowait: boolean;
}
export interface DecodedBasicCancel extends BasicCancel {
	_kind: "basic.cancel";
}
export interface BasicCancelOk {
	consumerTag: string;
}
export interface DecodedBasicCancelOk extends BasicCancelOk {
	_kind: "basic.cancel-ok";
}
export interface BasicPublish {
	ticket: number;
	exchange: string;
	routingKey: string;
	mandatory: boolean;
	immediate: boolean;
}
export interface DecodedBasicPublish extends BasicPublish {
	_kind: "basic.publish";
}
export interface BasicReturn {
	replyCode: number;
	replyText: string;
	exchange: string;
	routingKey: string;
}
export interface DecodedBasicReturn extends BasicReturn {
	_kind: "basic.return";
}
export interface BasicDeliver {
	consumerTag: string;
	deliveryTag: number;
	redelivered: boolean;
	exchange: string;
	routingKey: string;
}
export interface DecodedBasicDeliver extends BasicDeliver {
	_kind: "basic.deliver";
}
export interface BasicGet {
	ticket: number;
	queue: string;
	noAck: boolean;
}
export interface DecodedBasicGet extends BasicGet {
	_kind: "basic.get";
}
export interface BasicGetOk {
	deliveryTag: number;
	redelivered: boolean;
	exchange: string;
	routingKey: string;
	messageCount: number;
}
export interface DecodedBasicGetOk extends BasicGetOk {
	_kind: "basic.get-ok";
}
export interface BasicGetEmpty {
	clusterId: string;
}
export interface DecodedBasicGetEmpty extends BasicGetEmpty {
	_kind: "basic.get-empty";
}
export interface BasicAck {
	deliveryTag: number;
	multiple: boolean;
}
export interface DecodedBasicAck extends BasicAck {
	_kind: "basic.ack";
}
export interface BasicReject {
	deliveryTag: number;
	requeue: boolean;
}
export interface DecodedBasicReject extends BasicReject {
	_kind: "basic.reject";
}
export interface BasicRecoverAsync {
	requeue: boolean;
}
export interface DecodedBasicRecoverAsync extends BasicRecoverAsync {
	_kind: "basic.recover-async";
}
export interface BasicRecover {
	requeue: boolean;
}
export interface DecodedBasicRecover extends BasicRecover {
	_kind: "basic.recover";
}
export interface BasicRecoverOk {
}
export interface DecodedBasicRecoverOk extends BasicRecoverOk {
	_kind: "basic.recover-ok";
}
export interface BasicNack {
	deliveryTag: number;
	multiple: boolean;
	requeue: boolean;
}
export interface DecodedBasicNack extends BasicNack {
	_kind: "basic.nack";
}
export interface ConnectionStart {
	versionMajor: number;
	versionMinor: number;
	serverProperties: Record<string, unknown>;
	mechanisms: string;
	locales: string;
}
export interface DecodedConnectionStart extends ConnectionStart {
	_kind: "connection.start";
}
export interface ConnectionStartOk {
	clientProperties: Record<string, unknown>;
	mechanism: string;
	response: string;
	locale: string;
}
export interface DecodedConnectionStartOk extends ConnectionStartOk {
	_kind: "connection.start-ok";
}
export interface ConnectionSecure {
	challenge: string;
}
export interface DecodedConnectionSecure extends ConnectionSecure {
	_kind: "connection.secure";
}
export interface ConnectionSecureOk {
	response: string;
}
export interface DecodedConnectionSecureOk extends ConnectionSecureOk {
	_kind: "connection.secure-ok";
}
export interface ConnectionTune {
	channelMax: number;
	frameMax: number;
	heartbeat: number;
}
export interface DecodedConnectionTune extends ConnectionTune {
	_kind: "connection.tune";
}
export interface ConnectionTuneOk {
	channelMax: number;
	frameMax: number;
	heartbeat: number;
}
export interface DecodedConnectionTuneOk extends ConnectionTuneOk {
	_kind: "connection.tune-ok";
}
export interface ConnectionOpen {
	virtualHost: string;
	capabilities: string;
	insist: boolean;
}
export interface DecodedConnectionOpen extends ConnectionOpen {
	_kind: "connection.open";
}
export interface ConnectionOpenOk {
	knownHosts: string;
}
export interface DecodedConnectionOpenOk extends ConnectionOpenOk {
	_kind: "connection.open-ok";
}
export interface ConnectionClose {
	replyCode: number;
	replyText: string;
	classId: number;
	methodId: number;
}
export interface DecodedConnectionClose extends ConnectionClose {
	_kind: "connection.close";
}
export interface ConnectionCloseOk {
}
export interface DecodedConnectionCloseOk extends ConnectionCloseOk {
	_kind: "connection.close-ok";
}
export interface ConnectionBlocked {
	reason: string;
}
export interface DecodedConnectionBlocked extends ConnectionBlocked {
	_kind: "connection.blocked";
}
export interface ConnectionUnblocked {
}
export interface DecodedConnectionUnblocked extends ConnectionUnblocked {
	_kind: "connection.unblocked";
}
export interface ConnectionUpdateSecret {
	newSecret: string;
	reason: string;
}
export interface DecodedConnectionUpdateSecret extends ConnectionUpdateSecret {
	_kind: "connection.update-secret";
}
export interface ConnectionUpdateSecretOk {
}
export interface DecodedConnectionUpdateSecretOk extends ConnectionUpdateSecretOk {
	_kind: "connection.update-secret-ok";
}
export interface ChannelOpen {
	outOfBand: string;
}
export interface DecodedChannelOpen extends ChannelOpen {
	_kind: "channel.open";
}
export interface ChannelOpenOk {
	channelId: string;
}
export interface DecodedChannelOpenOk extends ChannelOpenOk {
	_kind: "channel.open-ok";
}
export interface ChannelFlow {
	active: boolean;
}
export interface DecodedChannelFlow extends ChannelFlow {
	_kind: "channel.flow";
}
export interface ChannelFlowOk {
	active: boolean;
}
export interface DecodedChannelFlowOk extends ChannelFlowOk {
	_kind: "channel.flow-ok";
}
export interface ChannelClose {
	replyCode: number;
	replyText: string;
	classId: number;
	methodId: number;
}
export interface DecodedChannelClose extends ChannelClose {
	_kind: "channel.close";
}
export interface ChannelCloseOk {
}
export interface DecodedChannelCloseOk extends ChannelCloseOk {
	_kind: "channel.close-ok";
}
export interface AccessRequest {
	realm: string;
	exclusive: boolean;
	passive: boolean;
	active: boolean;
	write: boolean;
	read: boolean;
}
export interface DecodedAccessRequest extends AccessRequest {
	_kind: "access.request";
}
export interface AccessRequestOk {
	ticket: number;
}
export interface DecodedAccessRequestOk extends AccessRequestOk {
	_kind: "access.request-ok";
}
export interface ExchangeDeclare {
	ticket: number;
	exchange: string;
	type: string;
	passive: boolean;
	durable: boolean;
	autoDelete: boolean;
	internal: boolean;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedExchangeDeclare extends ExchangeDeclare {
	_kind: "exchange.declare";
}
export interface ExchangeDeclareOk {
}
export interface DecodedExchangeDeclareOk extends ExchangeDeclareOk {
	_kind: "exchange.declare-ok";
}
export interface ExchangeDelete {
	ticket: number;
	exchange: string;
	ifUnused: boolean;
	nowait: boolean;
}
export interface DecodedExchangeDelete extends ExchangeDelete {
	_kind: "exchange.delete";
}
export interface ExchangeDeleteOk {
}
export interface DecodedExchangeDeleteOk extends ExchangeDeleteOk {
	_kind: "exchange.delete-ok";
}
export interface ExchangeBind {
	ticket: number;
	destination: string;
	source: string;
	routingKey: string;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedExchangeBind extends ExchangeBind {
	_kind: "exchange.bind";
}
export interface ExchangeBindOk {
}
export interface DecodedExchangeBindOk extends ExchangeBindOk {
	_kind: "exchange.bind-ok";
}
export interface ExchangeUnbind {
	ticket: number;
	destination: string;
	source: string;
	routingKey: string;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedExchangeUnbind extends ExchangeUnbind {
	_kind: "exchange.unbind";
}
export interface ExchangeUnbindOk {
}
export interface DecodedExchangeUnbindOk extends ExchangeUnbindOk {
	_kind: "exchange.unbind-ok";
}
export interface QueueDeclare {
	ticket: number;
	queue: string;
	passive: boolean;
	durable: boolean;
	exclusive: boolean;
	autoDelete: boolean;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedQueueDeclare extends QueueDeclare {
	_kind: "queue.declare";
}
export interface QueueDeclareOk {
	queue: string;
	messageCount: number;
	consumerCount: number;
}
export interface DecodedQueueDeclareOk extends QueueDeclareOk {
	_kind: "queue.declare-ok";
}
export interface QueueBind {
	ticket: number;
	queue: string;
	exchange: string;
	routingKey: string;
	nowait: boolean;
	arguments: Record<string, unknown>;
}
export interface DecodedQueueBind extends QueueBind {
	_kind: "queue.bind";
}
export interface QueueBindOk {
}
export interface DecodedQueueBindOk extends QueueBindOk {
	_kind: "queue.bind-ok";
}
export interface QueuePurge {
	ticket: number;
	queue: string;
	nowait: boolean;
}
export interface DecodedQueuePurge extends QueuePurge {
	_kind: "queue.purge";
}
export interface QueuePurgeOk {
	messageCount: number;
}
export interface DecodedQueuePurgeOk extends QueuePurgeOk {
	_kind: "queue.purge-ok";
}
export interface QueueDelete {
	ticket: number;
	queue: string;
	ifUnused: boolean;
	ifEmpty: boolean;
	nowait: boolean;
}
export interface DecodedQueueDelete extends QueueDelete {
	_kind: "queue.delete";
}
export interface QueueDeleteOk {
	messageCount: number;
}
export interface DecodedQueueDeleteOk extends QueueDeleteOk {
	_kind: "queue.delete-ok";
}
export interface QueueUnbind {
	ticket: number;
	queue: string;
	exchange: string;
	routingKey: string;
	arguments: Record<string, unknown>;
}
export interface DecodedQueueUnbind extends QueueUnbind {
	_kind: "queue.unbind";
}
export interface QueueUnbindOk {
}
export interface DecodedQueueUnbindOk extends QueueUnbindOk {
	_kind: "queue.unbind-ok";
}
export interface TxSelect {
}
export interface DecodedTxSelect extends TxSelect {
	_kind: "tx.select";
}
export interface TxSelectOk {
}
export interface DecodedTxSelectOk extends TxSelectOk {
	_kind: "tx.select-ok";
}
export interface TxCommit {
}
export interface DecodedTxCommit extends TxCommit {
	_kind: "tx.commit";
}
export interface TxCommitOk {
}
export interface DecodedTxCommitOk extends TxCommitOk {
	_kind: "tx.commit-ok";
}
export interface TxRollback {
}
export interface DecodedTxRollback extends TxRollback {
	_kind: "tx.rollback";
}
export interface TxRollbackOk {
}
export interface DecodedTxRollbackOk extends TxRollbackOk {
	_kind: "tx.rollback-ok";
}
export interface ConfirmSelect {
	nowait: boolean;
}
export interface DecodedConfirmSelect extends ConfirmSelect {
	_kind: "confirm.select";
}
export interface ConfirmSelectOk {
}
export interface DecodedConfirmSelectOk extends ConfirmSelectOk {
	_kind: "confirm.select-ok";
}

export type DecodedClassMethod = DecodedBasicQos | DecodedBasicQosOk | DecodedBasicConsume | DecodedBasicConsumeOk | DecodedBasicCancel | DecodedBasicCancelOk | DecodedBasicPublish | DecodedBasicReturn | DecodedBasicDeliver | DecodedBasicGet | DecodedBasicGetOk | DecodedBasicGetEmpty | DecodedBasicAck | DecodedBasicReject | DecodedBasicRecoverAsync | DecodedBasicRecover | DecodedBasicRecoverOk | DecodedBasicNack | DecodedConnectionStart | DecodedConnectionStartOk | DecodedConnectionSecure | DecodedConnectionSecureOk | DecodedConnectionTune | DecodedConnectionTuneOk | DecodedConnectionOpen | DecodedConnectionOpenOk | DecodedConnectionClose | DecodedConnectionCloseOk | DecodedConnectionBlocked | DecodedConnectionUnblocked | DecodedConnectionUpdateSecret | DecodedConnectionUpdateSecretOk | DecodedChannelOpen | DecodedChannelOpenOk | DecodedChannelFlow | DecodedChannelFlowOk | DecodedChannelClose | DecodedChannelCloseOk | DecodedAccessRequest | DecodedAccessRequestOk | DecodedExchangeDeclare | DecodedExchangeDeclareOk | DecodedExchangeDelete | DecodedExchangeDeleteOk | DecodedExchangeBind | DecodedExchangeBindOk | DecodedExchangeUnbind | DecodedExchangeUnbindOk | DecodedQueueDeclare | DecodedQueueDeclareOk | DecodedQueueBind | DecodedQueueBindOk | DecodedQueuePurge | DecodedQueuePurgeOk | DecodedQueueDelete | DecodedQueueDeleteOk | DecodedQueueUnbind | DecodedQueueUnbindOk | DecodedTxSelect | DecodedTxSelectOk | DecodedTxCommit | DecodedTxCommitOk | DecodedTxRollback | DecodedTxRollbackOk | DecodedConfirmSelect | DecodedConfirmSelectOk;

export type AmqpMethodKind = "basic.qos" | "basic.qos-ok" | "basic.consume" | "basic.consume-ok" | "basic.cancel" | "basic.cancel-ok" | "basic.publish" | "basic.return" | "basic.deliver" | "basic.get" | "basic.get-ok" | "basic.get-empty" | "basic.ack" | "basic.reject" | "basic.recover-async" | "basic.recover" | "basic.recover-ok" | "basic.nack" | "connection.start" | "connection.start-ok" | "connection.secure" | "connection.secure-ok" | "connection.tune" | "connection.tune-ok" | "connection.open" | "connection.open-ok" | "connection.close" | "connection.close-ok" | "connection.blocked" | "connection.unblocked" | "connection.update-secret" | "connection.update-secret-ok" | "channel.open" | "channel.open-ok" | "channel.flow" | "channel.flow-ok" | "channel.close" | "channel.close-ok" | "access.request" | "access.request-ok" | "exchange.declare" | "exchange.declare-ok" | "exchange.delete" | "exchange.delete-ok" | "exchange.bind" | "exchange.bind-ok" | "exchange.unbind" | "exchange.unbind-ok" | "queue.declare" | "queue.declare-ok" | "queue.bind" | "queue.bind-ok" | "queue.purge" | "queue.purge-ok" | "queue.delete" | "queue.delete-ok" | "queue.unbind" | "queue.unbind-ok" | "tx.select" | "tx.select-ok" | "tx.commit" | "tx.commit-ok" | "tx.rollback" | "tx.rollback-ok" | "confirm.select" | "confirm.select-ok";


export type AmqpDecodedMethodEvents = {
	"basic.qos": [DecodedBasicQos & { channel: number }];
	"basic.qos-ok": [DecodedBasicQosOk & { channel: number }];
	"basic.consume": [DecodedBasicConsume & { channel: number }];
	"basic.consume-ok": [DecodedBasicConsumeOk & { channel: number }];
	"basic.cancel": [DecodedBasicCancel & { channel: number }];
	"basic.cancel-ok": [DecodedBasicCancelOk & { channel: number }];
	"basic.publish": [DecodedBasicPublish & { channel: number } & { _properties: AmqpBasicProperties, _content?: Uint8Array } ];
	"basic.return": [DecodedBasicReturn & { channel: number } & { _properties: AmqpBasicProperties, _content?: Uint8Array } ];
	"basic.deliver": [DecodedBasicDeliver & { channel: number } & { _properties: AmqpBasicProperties, _content?: Uint8Array } ];
	"basic.get": [DecodedBasicGet & { channel: number }];
	"basic.get-ok": [DecodedBasicGetOk & { channel: number } & { _properties: AmqpBasicProperties, _content?: Uint8Array } ];
	"basic.get-empty": [DecodedBasicGetEmpty & { channel: number }];
	"basic.ack": [DecodedBasicAck & { channel: number }];
	"basic.reject": [DecodedBasicReject & { channel: number }];
	"basic.recover-async": [DecodedBasicRecoverAsync & { channel: number }];
	"basic.recover": [DecodedBasicRecover & { channel: number }];
	"basic.recover-ok": [DecodedBasicRecoverOk & { channel: number }];
	"basic.nack": [DecodedBasicNack & { channel: number }];
	"connection.start": [DecodedConnectionStart & { channel: number }];
	"connection.start-ok": [DecodedConnectionStartOk & { channel: number }];
	"connection.secure": [DecodedConnectionSecure & { channel: number }];
	"connection.secure-ok": [DecodedConnectionSecureOk & { channel: number }];
	"connection.tune": [DecodedConnectionTune & { channel: number }];
	"connection.tune-ok": [DecodedConnectionTuneOk & { channel: number }];
	"connection.open": [DecodedConnectionOpen & { channel: number }];
	"connection.open-ok": [DecodedConnectionOpenOk & { channel: number }];
	"connection.close": [DecodedConnectionClose & { channel: number }];
	"connection.close-ok": [DecodedConnectionCloseOk & { channel: number }];
	"connection.blocked": [DecodedConnectionBlocked & { channel: number }];
	"connection.unblocked": [DecodedConnectionUnblocked & { channel: number }];
	"connection.update-secret": [DecodedConnectionUpdateSecret & { channel: number }];
	"connection.update-secret-ok": [DecodedConnectionUpdateSecretOk & { channel: number }];
	"channel.open": [DecodedChannelOpen & { channel: number }];
	"channel.open-ok": [DecodedChannelOpenOk & { channel: number }];
	"channel.flow": [DecodedChannelFlow & { channel: number }];
	"channel.flow-ok": [DecodedChannelFlowOk & { channel: number }];
	"channel.close": [DecodedChannelClose & { channel: number }];
	"channel.close-ok": [DecodedChannelCloseOk & { channel: number }];
	"access.request": [DecodedAccessRequest & { channel: number }];
	"access.request-ok": [DecodedAccessRequestOk & { channel: number }];
	"exchange.declare": [DecodedExchangeDeclare & { channel: number }];
	"exchange.declare-ok": [DecodedExchangeDeclareOk & { channel: number }];
	"exchange.delete": [DecodedExchangeDelete & { channel: number }];
	"exchange.delete-ok": [DecodedExchangeDeleteOk & { channel: number }];
	"exchange.bind": [DecodedExchangeBind & { channel: number }];
	"exchange.bind-ok": [DecodedExchangeBindOk & { channel: number }];
	"exchange.unbind": [DecodedExchangeUnbind & { channel: number }];
	"exchange.unbind-ok": [DecodedExchangeUnbindOk & { channel: number }];
	"queue.declare": [DecodedQueueDeclare & { channel: number }];
	"queue.declare-ok": [DecodedQueueDeclareOk & { channel: number }];
	"queue.bind": [DecodedQueueBind & { channel: number }];
	"queue.bind-ok": [DecodedQueueBindOk & { channel: number }];
	"queue.purge": [DecodedQueuePurge & { channel: number }];
	"queue.purge-ok": [DecodedQueuePurgeOk & { channel: number }];
	"queue.delete": [DecodedQueueDelete & { channel: number }];
	"queue.delete-ok": [DecodedQueueDeleteOk & { channel: number }];
	"queue.unbind": [DecodedQueueUnbind & { channel: number }];
	"queue.unbind-ok": [DecodedQueueUnbindOk & { channel: number }];
	"tx.select": [DecodedTxSelect & { channel: number }];
	"tx.select-ok": [DecodedTxSelectOk & { channel: number }];
	"tx.commit": [DecodedTxCommit & { channel: number }];
	"tx.commit-ok": [DecodedTxCommitOk & { channel: number }];
	"tx.rollback": [DecodedTxRollback & { channel: number }];
	"tx.rollback-ok": [DecodedTxRollbackOk & { channel: number }];
	"confirm.select": [DecodedConfirmSelect & { channel: number }];
	"confirm.select-ok": [DecodedConfirmSelectOk & { channel: number }];
};

