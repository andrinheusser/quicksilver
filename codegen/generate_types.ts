import spec from "@quicksilver/spec/amqp-rabbitmq-0.9.1.json" assert {
  type: "json",
};
import {
  camelCase,
  encoder,
  getArgs,
  toJsType,
} from "@quicksilver/codegen/utils.ts";

const amqpTypes = Deno.openSync("./../lib/types.ts", {
  create: true,
  write: true,
  truncate: true,
});
let ts = "import type { AmqpBasicProperties } from '@quicksilver/src/coding/types.ts'\n\n";
const methodKinds: Array<string> = [];

ts += "export type AmqpDomainType = ";
const tSet = new Set<string>();
let i = 0;
for (const [_label, t] of spec.domains) {
  if (tSet.has(t)) continue;
  if (i > 0) ts += " | ";
  ts += `"${t}" `;
  tSet.add(t);
  i++;
}
ts += ";\n\n";

const decodedClassMethodUnion: string[] = [];
spec.classes.forEach((clx) => {
  const name = camelCase(clx.name || clx.clxName, true);
  clx.methods.forEach((method) => {
    const methodName = camelCase(method.name, true);
    ts += `export interface ${name}${methodName} {\n`;
    method.arguments.forEach((arg) => {
      const { type } = getArgs(arg);
      const argName = camelCase(arg.name);
      ts += `\t${argName}: ${toJsType(type)};\n`;
    });
    ts += `}\n`;
    const kind = `${clx.clxName || clx.name}.${method.name}`;
    methodKinds.push(kind);
    ts +=
      `export interface Decoded${name}${methodName} extends ${name}${methodName} {\n`;
    ts += `\t_kind: "${clx.clxName || clx.name}.${method.name}";\n`;
    ts += `}\n`;
    decodedClassMethodUnion.push(`Decoded${name}${methodName}`);
  });
});
ts += "\n";
ts += "export type DecodedClassMethod = ";
decodedClassMethodUnion.forEach((dcmu, i) => {
  if (i > 0) ts += " | ";
  ts += dcmu;
});
ts += ";\n\n";
ts += "export type AmqpMethodKind = " +
  methodKinds.map((m) => `"${m}"`).join(" | ") + ";\n\n";

ts += "\n";

ts += "export type AmqpDecodedMethodEvents = {\n";
spec.classes.forEach((clx) => {
  clx.methods.forEach((method) => {
    ts += `\t"${clx.clxName || clx.name}.${method.name}": [Decoded${
      camelCase(clx.name || clx.clxName, true)
    }${camelCase(method.name, true)} & { channel: number }`;
    const lowerMethod = method.name.toLowerCase();
    if (
      lowerMethod === "publish" || lowerMethod === "return" ||
      lowerMethod === "deliver" || lowerMethod === "get-ok"
    ) {
      ts += ` & { _properties: AmqpBasicProperties, _content?: Uint8Array } `;
    }
    ts += `];\n`;
  });
});
ts += "};\n\n";

amqpTypes.writeSync(encoder.encode(ts));
