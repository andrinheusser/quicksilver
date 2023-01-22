import spec from "@quicksilver/spec/amqp-rabbitmq-0.9.1.json" assert {
  type: "json",
};
import { camelCase, encoder } from "./utils.ts";

const amqpDecodedMethodPublisher = Deno.openSync(
  "./../lib/MethodPublisher.ts",
  {
    create: true,
    write: true,
    truncate: true,
  },
);

let imports = "";

imports = `import { EventEmitter } from '@quicksilver/deps.ts'\n`;
imports +=
  `import { DecodedHeaderFrame, MethodFrame } from '@quicksilver/src/framing/types.ts'\n`;
imports +=
  `import type {AmqpDecodedMethodEvents} from '@quicksilver/lib/types.ts'\n\n`;
imports +=
  `import type {AmqpBasicProperties} from '@quicksilver/src/coding/types.ts'\n\n`;

let code = "\n\n";

code += `class MethodPublisher{\n\n`;
code +=
  `  constructor(private events = new EventEmitter<AmqpDecodedMethodEvents>) {\n`;
code += `  }\n\n`;
code += `  public unsubscribeAll() {\n`;
code += `    this.events.off()\n`;
code += `  }\n\n`;
code +=
  `  public emit(frame: MethodFrame, header?: DecodedHeaderFrame, content?: Uint8Array) {\n`;
code += `    switch(frame.content._kind) {\n`;
spec.classes.forEach((clx) => {
  const clxName = camelCase(clx.clxName || clx.name || "", false);
  clx.methods.forEach((method) => {
    const methodName = method.name;
    code += `      case '${clxName}.${methodName}':\n`;
    if (
      methodName === "return" || methodName === "deliver" ||
      methodName === "get-ok" || methodName === "publish"
    ) {
      code +=
        `        this.events.emit('${clxName}.${methodName}', {...frame.content, channel: frame.channel, _properties: header!.properties, _content: content});\n`;
    } else {
      code +=
        `        this.events.emit('${clxName}.${methodName}', {...frame.content, channel: frame.channel});\n`;
    }
    code += `        break;\n`;
  });
});
code += `      default:\n`;
code += `        throw new Error('Unknown method');\n`;
code += `    }\n`;
code += `  }\n`;
spec.classes.forEach((clx) => {
  const clxName = clx.clxName || clx.name || "";
  clx.methods.forEach((method) => {
    const methodName = method.name;
    imports += `import type { Decoded${camelCase(clxName, true)}${
      camelCase(methodName, true)
    } } from '@quicksilver/lib/types.ts'\n`;
    if (
      methodName === "return" || methodName === "deliver" ||
      methodName === "get-ok" || methodName === "publish"
    ) {
      code += `  on${camelCase(clxName, true)}${
        camelCase(methodName, true)
      }(channel: number, cb: (args: { _properties: AmqpBasicProperties, _content?: Uint8Array } & Decoded${
        camelCase(clxName, true)
      }${camelCase(methodName, true)}) => void) : () => void {\n`;
    } else {
      code += `  on${camelCase(clxName, true)}${
        camelCase(methodName, true)
      }(channel: number, cb: (args: Decoded${camelCase(clxName, true)}${
        camelCase(methodName, true)
      }) => void) : () => void {\n`;
    }
    code +=
      `    this.events.on('${clxName}.${methodName}', ({ channel: c, ...data }) => {\n`;

    code += `      if(channel === c) {\n`;
    code += `        cb(data);\n`;
    code += `      }\n`;
    code += `    });\n`;
    code +=
      `    return () => this.events.off('${clxName}.${methodName}', cb);\n`;

    code += `  }\n`;
  });
});
code += `}\n`;
code += `export default new MethodPublisher();\n`;

amqpDecodedMethodPublisher.writeSync(encoder.encode(imports + code));
