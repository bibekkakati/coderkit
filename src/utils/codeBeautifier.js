import js_beautify, { css_beautify, html_beautify } from "js-beautify";

const codeBeautifier = {
    javascriptCode: (code, indentingSpace) => {
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
    },

    cssCode: (code, indentingSpace) => {
        const r = css_beautify(code, {
            indent_char: " ",
            selector_separator_newline: true,
            newline_between_rules: true,
            space_around_selector_separator: false,
            space_around_combinator: false,
            eol: "\n",
            indent_size: indentingSpace,
        });

        return r;
    },

    htmlCode: (code, indentingSpace) => {
        const r = html_beautify(code, {
            indent_inner_html: false,
            indent_char: " ",
            indent_size: indentingSpace,
        });

        return r;
    },
};

export default codeBeautifier;
