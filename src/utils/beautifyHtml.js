import { html_beautify } from "js-beautify";

export default function (code, indentingSpace) {
    const r = html_beautify(code, {
        indent_inner_html: false,
        indent_char: " ",
        indent_size: indentingSpace,
    });

    return r;
}
