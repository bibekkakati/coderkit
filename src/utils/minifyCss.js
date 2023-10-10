export default function minifyCSS(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove line breaks and extra whitespace
    css = css.replace(/\n/g, "");
    css = css.replace(/\r/g, "");
    css = css.replace(/\t/g, "");
    css = css.replace(/\s+/g, " ");

    return css;
}
