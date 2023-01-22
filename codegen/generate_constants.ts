import spec from "@quicksilver/spec/amqp-rabbitmq-0.9.1.json" assert {
  type: "json",
};
import { encoder } from "@quicksilver/codegen/utils.ts";

// CONSTANTS
const constants = Deno.openSync("./../lib/constants.ts", {
  create: true,
  write: true,
  truncate: true,
});

const writeConst = (s: string) => {
  constants.writeSync(
    encoder.encode(s.replaceAll("-", "_") + "\n"),
  );
};

writeConst("import type { AmqpDomainType } from '@quicksilver/lib/types.ts';");

for (const { name, value } of spec.constants) {
  writeConst(`export const ${name.toUpperCase()} = ${value};`);
}
for (const { name, clxName: clx, id, methods } of spec.classes) {
  const clxName = name || clx;
  writeConst(`export const ${clxName?.toUpperCase()} = ${id};`);
  for (const { name, id } of methods) {
    writeConst(
      `export const ${clxName?.toUpperCase()}_${name.toUpperCase()} = ${id};`,
    );
  }
}
writeConst("\n");
writeConst(
  "export function getTypeForDomain(domain: string): AmqpDomainType {",
);
writeConst("  switch (domain) {");
for (const [domain, type] of spec.domains) {
  writeConst(`    case "${domain}": return "${type}";`);
}
writeConst("    default: throw new Error(`Unknown domain: ${domain}`);");
writeConst("  }");
writeConst("}");
writeConst("\n");
