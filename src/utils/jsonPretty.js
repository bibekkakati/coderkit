const htmlEntities = (string) => {
    return string
        .replace(/&/g, "&amp;")
        .replace(/\\"/g, "&bsol;&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};
const replacer = (match, p1, p2, p3, p4) => {
    const part = { indent: p1, key: p2, value: p3, end: p4 };
    const key = "<span>";
    const val = "<span class=text-warning>";
    const bool = "<span class=text-secondary>";
    const str = "<span class=text-success>";
    const isBool = ["true", "false"].includes(part.value);
    const valSpan = /^"/.test(part.value) ? str : isBool ? bool : val;
    const findName = /"([\w]+)": |(.*): /;
    const indentHtml = part.indent || "";
    const keyName = part.key && part.key.replace(findName, "$1$2");
    const keyHtml = part.key ? key + `"${keyName}"` + "</span>: " : "";
    const valueHtml = part.value ? valSpan + part.value + "</span>" : "";
    const endHtml = part.end || "";
    return indentHtml + keyHtml + valueHtml + endHtml;
};
const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/gm;

export default function jsonPretty(jsonString) {
    return htmlEntities(jsonString).replace(jsonLine, replacer);
}
