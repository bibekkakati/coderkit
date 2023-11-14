import js_beautify from "js-beautify";

export default function beautifyJavascript(code, indentingSpace = 2) {
    const r = js_beautify(code, {
        indent_char: " ",
        max_preserve_newlines: "2",
        preserve_newlines: true,
        indent_scripts: "normal",
        brace_style: "collapse,preserve-inline",
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: true,
        end_with_newline: true,
        wrap_line_length: "0",
        indent_inner_html: true,
        comma_first: false,
        e4x: true,
        indent_empty_lines: false,
        indent_size: indentingSpace,
    });

    return r;
}
