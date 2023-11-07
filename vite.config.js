import react from "@vitejs/plugin-react";
import fs from "fs";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import viteCompression from "vite-plugin-compression";

const getAppPages = function () {
    const dir = "./app";
    const filenames = fs.readdirSync(dir);
    const map = {};

    for (let i = 0; i < filenames.length; i++) {
        const filename = filenames[i];
        const key = filename.split(".")[0];
        map[key] = `${dir}/${filename}`;
    }

    return map;
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        viteCompression({ algorithm: "brotliCompress" }),
        visualizer(),
    ],
    build: {
        minify: "terser",
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ...getAppPages(),
            },
        },
    },
});
