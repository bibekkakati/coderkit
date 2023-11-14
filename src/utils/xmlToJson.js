import { XMLParser } from "fast-xml-parser";

export default function xmlToJson(code, options) {
    const p = new XMLParser({
        ...options,
        attributeNamePrefix: "@_",
    });
    const obj = p.parse(code);

    return obj;
}
