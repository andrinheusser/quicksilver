import Decoder from "@quicksilver/src/coding/Decoder.ts";
import { getTypeForDomain } from "@quicksilver/lib/constants.ts";
import type { DecodedClassMethod } from "@quicksilver/lib/types.ts";
export default function decodeMethod(payload: Uint8Array): DecodedClassMethod {
	const decoder = new Decoder(payload);
	const clxId = decoder.read('short');
	const methodId = decoder.read('short');
	switch(clxId){
		// basic
		case 60:
			switch(methodId){
				case 10:
					return {
						_kind: "basic.qos",
							prefetchSize: decoder.readNumber(getTypeForDomain('long')),
							prefetchCount: decoder.readNumber(getTypeForDomain('short')),
							global: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 11:
					return {
						_kind: "basic.qos-ok",
					}
				case 20:
					return {
						_kind: "basic.consume",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							consumerTag: decoder.readString(getTypeForDomain('shortstr')),
							noLocal: decoder.readBoolean(getTypeForDomain('bit')),
							noAck: decoder.readBoolean(getTypeForDomain('bit')),
							exclusive: decoder.readBoolean(getTypeForDomain('bit')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 21:
					return {
						_kind: "basic.consume-ok",
							consumerTag: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 30:
					return {
						_kind: "basic.cancel",
							consumerTag: decoder.readString(getTypeForDomain('shortstr')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 31:
					return {
						_kind: "basic.cancel-ok",
							consumerTag: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 40:
					return {
						_kind: "basic.publish",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							mandatory: decoder.readBoolean(getTypeForDomain('bit')),
							immediate: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 50:
					return {
						_kind: "basic.return",
							replyCode: decoder.readNumber(getTypeForDomain('short')),
							replyText: decoder.readString(getTypeForDomain('shortstr')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 60:
					return {
						_kind: "basic.deliver",
							consumerTag: decoder.readString(getTypeForDomain('shortstr')),
							deliveryTag: decoder.readBigNumber(getTypeForDomain('longlong')),
							redelivered: decoder.readBoolean(getTypeForDomain('bit')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 70:
					return {
						_kind: "basic.get",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							noAck: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 71:
					return {
						_kind: "basic.get-ok",
							deliveryTag: decoder.readBigNumber(getTypeForDomain('longlong')),
							redelivered: decoder.readBoolean(getTypeForDomain('bit')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							messageCount: decoder.readNumber(getTypeForDomain('message_count')),
					}
				case 72:
					return {
						_kind: "basic.get-empty",
							clusterId: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 80:
					return {
						_kind: "basic.ack",
							deliveryTag: decoder.readBigNumber(getTypeForDomain('longlong')),
							multiple: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 90:
					return {
						_kind: "basic.reject",
							deliveryTag: decoder.readBigNumber(getTypeForDomain('longlong')),
							requeue: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 100:
					return {
						_kind: "basic.recover-async",
							requeue: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 110:
					return {
						_kind: "basic.recover",
							requeue: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 111:
					return {
						_kind: "basic.recover-ok",
					}
				case 120:
					return {
						_kind: "basic.nack",
							deliveryTag: decoder.readBigNumber(getTypeForDomain('longlong')),
							multiple: decoder.readBoolean(getTypeForDomain('bit')),
							requeue: decoder.readBoolean(getTypeForDomain('bit')),
					}
			}
			break;
		// connection
		case 10:
			switch(methodId){
				case 10:
					return {
						_kind: "connection.start",
							versionMajor: decoder.readNumber(getTypeForDomain('octet')),
							versionMinor: decoder.readNumber(getTypeForDomain('octet')),
							serverProperties: decoder.readTable(getTypeForDomain('peer_properties')),
							mechanisms: decoder.readString(getTypeForDomain('longstr')),
							locales: decoder.readString(getTypeForDomain('longstr')),
					}
				case 11:
					return {
						_kind: "connection.start-ok",
							clientProperties: decoder.readTable(getTypeForDomain('peer_properties')),
							mechanism: decoder.readString(getTypeForDomain('shortstr')),
							response: decoder.readString(getTypeForDomain('longstr')),
							locale: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 20:
					return {
						_kind: "connection.secure",
							challenge: decoder.readString(getTypeForDomain('longstr')),
					}
				case 21:
					return {
						_kind: "connection.secure-ok",
							response: decoder.readString(getTypeForDomain('longstr')),
					}
				case 30:
					return {
						_kind: "connection.tune",
							channelMax: decoder.readNumber(getTypeForDomain('short')),
							frameMax: decoder.readNumber(getTypeForDomain('long')),
							heartbeat: decoder.readNumber(getTypeForDomain('short')),
					}
				case 31:
					return {
						_kind: "connection.tune-ok",
							channelMax: decoder.readNumber(getTypeForDomain('short')),
							frameMax: decoder.readNumber(getTypeForDomain('long')),
							heartbeat: decoder.readNumber(getTypeForDomain('short')),
					}
				case 40:
					return {
						_kind: "connection.open",
							virtualHost: decoder.readString(getTypeForDomain('shortstr')),
							capabilities: decoder.readString(getTypeForDomain('shortstr')),
							insist: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 41:
					return {
						_kind: "connection.open-ok",
							knownHosts: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 50:
					return {
						_kind: "connection.close",
							replyCode: decoder.readNumber(getTypeForDomain('short')),
							replyText: decoder.readString(getTypeForDomain('shortstr')),
							classId: decoder.readNumber(getTypeForDomain('short')),
							methodId: decoder.readNumber(getTypeForDomain('short')),
					}
				case 51:
					return {
						_kind: "connection.close-ok",
					}
				case 60:
					return {
						_kind: "connection.blocked",
							reason: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 61:
					return {
						_kind: "connection.unblocked",
					}
				case 70:
					return {
						_kind: "connection.update-secret",
							newSecret: decoder.readString(getTypeForDomain('longstr')),
							reason: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 71:
					return {
						_kind: "connection.update-secret-ok",
					}
			}
			break;
		// channel
		case 20:
			switch(methodId){
				case 10:
					return {
						_kind: "channel.open",
							outOfBand: decoder.readString(getTypeForDomain('shortstr')),
					}
				case 11:
					return {
						_kind: "channel.open-ok",
							channelId: decoder.readString(getTypeForDomain('longstr')),
					}
				case 20:
					return {
						_kind: "channel.flow",
							active: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 21:
					return {
						_kind: "channel.flow-ok",
							active: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 40:
					return {
						_kind: "channel.close",
							replyCode: decoder.readNumber(getTypeForDomain('short')),
							replyText: decoder.readString(getTypeForDomain('shortstr')),
							classId: decoder.readNumber(getTypeForDomain('short')),
							methodId: decoder.readNumber(getTypeForDomain('short')),
					}
				case 41:
					return {
						_kind: "channel.close-ok",
					}
			}
			break;
		// access
		case 30:
			switch(methodId){
				case 10:
					return {
						_kind: "access.request",
							realm: decoder.readString(getTypeForDomain('shortstr')),
							exclusive: decoder.readBoolean(getTypeForDomain('bit')),
							passive: decoder.readBoolean(getTypeForDomain('bit')),
							active: decoder.readBoolean(getTypeForDomain('bit')),
							write: decoder.readBoolean(getTypeForDomain('bit')),
							read: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 11:
					return {
						_kind: "access.request-ok",
							ticket: decoder.readNumber(getTypeForDomain('short')),
					}
			}
			break;
		// exchange
		case 40:
			switch(methodId){
				case 10:
					return {
						_kind: "exchange.declare",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							type: decoder.readString(getTypeForDomain('shortstr')),
							passive: decoder.readBoolean(getTypeForDomain('bit')),
							durable: decoder.readBoolean(getTypeForDomain('bit')),
							autoDelete: decoder.readBoolean(getTypeForDomain('bit')),
							internal: decoder.readBoolean(getTypeForDomain('bit')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 11:
					return {
						_kind: "exchange.declare-ok",
					}
				case 20:
					return {
						_kind: "exchange.delete",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							ifUnused: decoder.readBoolean(getTypeForDomain('bit')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 21:
					return {
						_kind: "exchange.delete-ok",
					}
				case 30:
					return {
						_kind: "exchange.bind",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							destination: decoder.readString(getTypeForDomain('exchange_name')),
							source: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 31:
					return {
						_kind: "exchange.bind-ok",
					}
				case 40:
					return {
						_kind: "exchange.unbind",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							destination: decoder.readString(getTypeForDomain('exchange_name')),
							source: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 51:
					return {
						_kind: "exchange.unbind-ok",
					}
			}
			break;
		// queue
		case 50:
			switch(methodId){
				case 10:
					return {
						_kind: "queue.declare",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							passive: decoder.readBoolean(getTypeForDomain('bit')),
							durable: decoder.readBoolean(getTypeForDomain('bit')),
							exclusive: decoder.readBoolean(getTypeForDomain('bit')),
							autoDelete: decoder.readBoolean(getTypeForDomain('bit')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 11:
					return {
						_kind: "queue.declare-ok",
							queue: decoder.readString(getTypeForDomain('queue_name')),
							messageCount: decoder.readNumber(getTypeForDomain('message_count')),
							consumerCount: decoder.readNumber(getTypeForDomain('long')),
					}
				case 20:
					return {
						_kind: "queue.bind",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 21:
					return {
						_kind: "queue.bind-ok",
					}
				case 30:
					return {
						_kind: "queue.purge",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 31:
					return {
						_kind: "queue.purge-ok",
							messageCount: decoder.readNumber(getTypeForDomain('message_count')),
					}
				case 40:
					return {
						_kind: "queue.delete",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							ifUnused: decoder.readBoolean(getTypeForDomain('bit')),
							ifEmpty: decoder.readBoolean(getTypeForDomain('bit')),
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 41:
					return {
						_kind: "queue.delete-ok",
							messageCount: decoder.readNumber(getTypeForDomain('message_count')),
					}
				case 50:
					return {
						_kind: "queue.unbind",
							ticket: decoder.readNumber(getTypeForDomain('short')),
							queue: decoder.readString(getTypeForDomain('queue_name')),
							exchange: decoder.readString(getTypeForDomain('exchange_name')),
							routingKey: decoder.readString(getTypeForDomain('shortstr')),
							arguments: decoder.readTable(getTypeForDomain('table')),
					}
				case 51:
					return {
						_kind: "queue.unbind-ok",
					}
			}
			break;
		// tx
		case 90:
			switch(methodId){
				case 10:
					return {
						_kind: "tx.select",
					}
				case 11:
					return {
						_kind: "tx.select-ok",
					}
				case 20:
					return {
						_kind: "tx.commit",
					}
				case 21:
					return {
						_kind: "tx.commit-ok",
					}
				case 30:
					return {
						_kind: "tx.rollback",
					}
				case 31:
					return {
						_kind: "tx.rollback-ok",
					}
			}
			break;
		// confirm
		case 85:
			switch(methodId){
				case 10:
					return {
						_kind: "confirm.select",
							nowait: decoder.readBoolean(getTypeForDomain('bit')),
					}
				case 11:
					return {
						_kind: "confirm.select-ok",
					}
			}
			break;
	}
	throw new Error(`Unknown method: ${clxId}.${methodId}`);
}
