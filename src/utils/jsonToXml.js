import { XMLBuilder } from "fast-xml-parser";

export default function jsonToXml(code, indentingSpace) {
    const b = new XMLBuilder({
        format: true,
        indentBy: " ".repeat(Number(indentingSpace)),
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
    });
    const xml = b.build(code);
    return xml;
}
