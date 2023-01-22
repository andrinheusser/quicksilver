import spec from "@quicksilver/spec/amqp-rabbitmq-0.9.1.json" assert {
  type: "json",
};

import {
  camelCase,
  encoder,
  getArgs,
  toDecoderMethod,
} from "@quicksilver/codegen/utils.ts";

const amqpDecode = Deno.openSync("./../lib/decode.ts", {
  create: true,
  write: true,
  truncate: true,
});
let decodeCode = "";
decodeCode += 'import Decoder from "@quicksilver/src/coding/Decoder.ts";\n';
decodeCode +=
  'import { getTypeForDomain } from "@quicksilver/lib/constants.ts";\n';
decodeCode +=
  'import type { DecodedClassMethod } from "@quicksilver/lib/types.ts";\n';

decodeCode +=
  "export default function decodeMethod(payload: Uint8Array): DecodedClassMethod {\n";
decodeCode += "\tconst decoder = new Decoder(payload);\n";
decodeCode += "\tconst clxId = decoder.read('short');\n";
decodeCode += "\tconst methodId = decoder.read('short');\n";
decodeCode += "\tswitch(clxId){\n";
spec.classes.forEach(({ clxName, name, id: clxId, methods }) => {
  const clx = clxName || name;
  decodeCode += `\t\t// ${clx}\n`;
  decodeCode += `\t\tcase ${clxId}:\n`;
  decodeCode += "\t\t\tswitch(methodId){\n";

  methods.forEach(({ name: method, id: methodId, arguments: args }) => {
    decodeCode += `\t\t\t\tcase ${methodId}:\n`;
    decodeCode += `\t\t\t\t\treturn {\n`;
    decodeCode += `\t\t\t\t\t\t_kind: "${clx}.${method}",\n`;
    args.forEach((arg) => {
      const { type, name } = getArgs(arg);
      const decoderMethod = toDecoderMethod(type);
      decodeCode += `\t\t\t\t\t\t\t${
        camelCase(name)
      }: decoder.${decoderMethod}(getTypeForDomain('${
        type.replaceAll("-", "_")
      }')),\n`;
    });
    decodeCode += `\t\t\t\t\t}\n`;
  });

  decodeCode += "\t\t\t}\n";
  decodeCode += "\t\t\tbreak;\n";
});
decodeCode += "\t}\n";
decodeCode += "\tthrow new Error(`Unknown method: ${clxId}.${methodId}`);\n";
decodeCode += "}\n";

amqpDecode.writeSync(encoder.encode(decodeCode));
