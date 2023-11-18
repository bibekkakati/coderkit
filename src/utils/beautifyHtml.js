import { html_beautify } from "js-beautify";

export default function (code, indentingSpace = 2) {
    const r = html_beautify(code?.replaceAll("\n", ""), {
        indent_inner_html: true,
        indent_char: " ",
        indent_size: indentingSpace,
    });

    return r;
}
