import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import pkg from "./package.json";

export default defineConfig(({ mode }) => ({
  plugins: [
    svelte({
      experimental: {
        useVitePreprocess: true,
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["cjs", "es"],
      fileName: "index",
    },
    sourcemap: mode === "production",
    outDir: "dist",
    rollupOptions: {
      external: ["@netless/fastboard", "@netless/window-manager", "white-web-sdk"],
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        exports: "named",
      },
    },
    minify: mode === "production",
  },
  clearScreen: false,
  server: {
    open: true,
  },
}));
