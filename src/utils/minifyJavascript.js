import { minify } from "terser";

export default async function minifyJavascript(code, options) {
    const r = await minify(code, {
        sourceMap: false,
        ...options,
    });
    return r.code;
}
