import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

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
