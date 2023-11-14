import { css_beautify } from "js-beautify";

export default function beautifyCss(code, indentingSpace = 2) {
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
}
