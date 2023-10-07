import { minify } from "terser";

const codeMinifier = {
    minifyJavaScript: async (code, options) => {
        const r = await minify(code, {
            sourceMap: false,
            ...options,
        });
        return r.code;
    },

    minifyCSS: (css) => {
        // Remove comments
        css = css.replace(/\/\*[\s\S]*?\*\//g, "");

        // Remove line breaks and extra whitespace
        css = css.replace(/\n/g, "");
        css = css.replace(/\r/g, "");
        css = css.replace(/\t/g, "");
        css = css.replace(/\s+/g, " ");

        return css;
    },

    minifyHTML: (html) => {
        // Minify embedded CSS
        html = html.replace(
            /<style[^>]*>([\s\S]*?)<\/style>/g,
            function (match, group) {
                return "<style>" + codeMinifier.minifyCSS(group) + "</style>";
            }
        );

        const minfifyJS = (js) => {
            // Remove JavaScript comments
            js = js.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, "");

            // Remove line breaks and extra whitespace
            js = js.replace(/\n/g, "");
            js = js.replace(/\r/g, "");
            js = js.replace(/\t/g, "");
            js = js.replace(/\s+/g, " ");

            return js;
        };

        // Minify embedded JavaScript
        html = html.replace(
            /<script[^>]*>([\s\S]*?)<\/script>/g,
            function (match, group) {
                return "<script>" + minfifyJS(group) + "</script>";
            }
        );

        // Remove HTML comments
        html = html.replace(/<!--([\s\S]*?)-->/g, "");

        // Remove line breaks and extra whitespace
        html = html.replace(/\n/g, "");
        html = html.replace(/\r/g, "");
        html = html.replace(/\t/g, "");
        html = html.replace(/\s+/g, " ");

        return html;
    },
};

export default codeMinifier;
