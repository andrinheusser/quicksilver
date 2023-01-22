import spec from "./../spec/amqp-rabbitmq-0.9.1.json" assert { type: "json" };

const camelCase = (name?: string, ucFirst = false) => {
  if (!name) return "";
  const parts = name.split("-");
  let camelCase = ucFirst ? "" : parts[0];
  for (let i = ucFirst ? 0 : 1; i < parts.length; i++) {
    camelCase += parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  return camelCase;
};

const getArgs = (args: Record<string, unknown>) => {
  const type = args.type as string || args.domain as string || "??";
  const name = args.name as string;
  let def = args["default-value"] as string || undefined;
  if (typeof def === "string") def = `"${def}"`;
  if (typeof def === "number") def = `${def}`;
  if (typeof def === "boolean") def = `${def}`;
  if (def === undefined) def = "undefined";
  if (typeof def === "object") def = "{}";
  return { type, name, def, domain: args.domain as string || name };
};

const toJsType = (domain: string) => {
  const type = spec.domains.find(([d]) => d === domain)?.[1];
  if (!type) throw new Error(`Unknown domain: ${domain}`);
  switch (type) {
    case "bit":
      return "boolean";
    case "octet":
    case "long":
    case "short":
    case "longlong":
      return "number";
    case "shortstr":
    case "longstr":
      return "string";
    case "table":
      return "Record<string, unknown>";
    default:
      return "number";
  }
};

const toDecoderMethod = (domain: string) => {
  const type = spec.domains.find(([d]) => d === domain)?.[1];
  if (!type) throw new Error(`Unknown domain: ${domain}`);
  switch (type) {
    case "bit":
      return "readBoolean";
    case "shortstr":
    case "longstr":
      return "readString";
    case "short":
    case "long":
    case "octet":
      return "readNumber";
    case "longlong":
    case "timestamp":
      return "readBigNumber";
    case "table":
      return "readTable";
  }
  throw new Error(`Unknown type ${domain}`);
};

const encoder = new TextEncoder();

export { camelCase, encoder, getArgs, toDecoderMethod, toJsType };
