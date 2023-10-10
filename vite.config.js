import react from "@vitejs/plugin-react";
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
    },
});
