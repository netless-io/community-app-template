# Netless App Hello, world!

见 [netless-app](https://github.com/netless-io/netless-app#useful-context-apis) 主页文档。

## 注册与使用

见 [hello-world](../hello-world/README.md) 的文档。

为了能在 playground 里加载 Vue，需要先在根目录 (community-apps/) 安装 `@vitejs/plugin-vue`，并且修改 [playground/vite.config.ts](../../../playground/vite.config.ts) 如下：

```diff
@@ -1,5 +1,7 @@
 import { defineConfig } from "vite";
+import vue from "@vitejs/plugin-vue";

 export default defineConfig({
   clearScreen: false,
+  plugins: [vue()],
 });
```
