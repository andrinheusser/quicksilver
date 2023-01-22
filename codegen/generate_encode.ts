import spec from "@quicksilver/spec/amqp-rabbitmq-0.9.1.json" assert {
  type: "json",
};
import { camelCase, encoder, getArgs } from "@quicksilver/codegen/utils.ts";

const amqpEncode = Deno.openSync("./../lib/encode.ts", {
  create: true,
  write: true,
  truncate: true,
});
let encodeImports = "";
let encodeCode = "";
encodeImports += 'import Encoder from "@quicksilver/src/coding/Encoder.ts";\n';
encodeImports +=
  'import { getTypeForDomain } from "@quicksilver/lib/constants.ts";\n';

encodeCode += "\n";
spec.classes.forEach(({ clxName, name, id: clxId, methods }) => {
  const clx = camelCase(clxName || name || "", true);
  methods.forEach(({ name: method, id: methodId, arguments: args }) => {
    const methodName = camelCase(method, true);
    if (args.length === 0) {
      encodeCode +=
        `export function encode${clx}${methodName}(): Uint8Array {\n`;
      encodeCode += `\tconst encoder = new Encoder();\n`;
      encodeCode += `\tencoder.encode('short', ${clxId});\n`;
      encodeCode += `\tencoder.encode('short', ${methodId});\n`;
    } else {
      encodeImports +=
        `import type { ${clx}${methodName} } from "./types.ts";\n`;
      encodeCode +=
        `export function encode${clx}${methodName}(args: ${clx}${methodName}): Uint8Array {\n`;
      encodeCode += `\tconst encoder = new Encoder();\n`;
      encodeCode += `\tencoder.encode('short', ${clxId});\n`;
      encodeCode += `\tencoder.encode('short', ${methodId});\n`;
      args.forEach((a) => {
        const { type, name, def } = getArgs(a);
        encodeCode += `\tencoder.encode(getTypeForDomain('${
          type.replaceAll("-", "_")
        }'), args.${camelCase(name)} ?? ${def});\n`;
      });
    }
    encodeCode += `\treturn encoder.buf;\n`;
    encodeCode += "}\n";
  });
});

amqpEncode.writeSync(encoder.encode(encodeImports + encodeCode));
