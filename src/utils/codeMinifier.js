import { minify } from "terser";

const codeMinifier = {
    javascript: async (code, options) => {
        const r = await minify(code, {
            sourceMap: false,
            ...options,
        });
        return r.code;
    },
};

export default codeMinifier;
