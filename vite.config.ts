import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";

export default defineConfig(({ mode }) => ({
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
