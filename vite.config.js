import react from "@vitejs/plugin-react";
import glob from "glob";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import viteCompression from "vite-plugin-compression";

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
                main: "index.html",
                ...glob.sync("./app/*.html").reduce(
                    (obj, file) => ({
                        ...obj,
                        [file
                            .split("/")
                            .slice(1)
                            .join(".")
                            .replace(/(\.index)?\.html$/, "")]: file,
                    }),
                    {}
                ),
            },
        },
    },
});
