import minifyCSS from "./minifyCss";

export default function minifyHtml(html) {
    // Minify embedded CSS
    html = html.replace(
        /<style[^>]*>([\s\S]*?)<\/style>/g,
        function (match, group) {
            return "<style>" + minifyCSS(group) + "</style>";
        }
    );

    // const minfifyJS = (js) => {
    //     // Remove JavaScript comments
    //     js = js.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, "");

    //     // Remove line breaks and extra whitespace
    //     js = js.replace(/\n/g, "");
    //     js = js.replace(/\r/g, "");
    //     js = js.replace(/\t/g, "");
    //     js = js.replace(/\s+/g, " ");

    //     return js;
    // };

    // Minify embedded JavaScript
    // html = html.replace(
    //     /<script[^>]*>([\s\S]*?)<\/script>/g,
    //     function (match, group) {
    //         return "<script>" + minfifyJS(group) + "</script>";
    //     }
    // );

    // Remove HTML comments
    html = html.replace(/<!--([\s\S]*?)-->/g, "");

    // Remove line breaks and extra whitespace
    html = html.replace(/\n/g, "");
    html = html.replace(/\r/g, "");
    html = html.replace(/\t/g, "");
    html = html.replace(/\s+/g, " ");

    return html;
}
