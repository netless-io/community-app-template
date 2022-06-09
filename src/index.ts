import type { NetlessApp } from "@netless/window-manager";

import { createApp } from "vue";
import styles from "./style.css?inline";
import App from "./components/App.vue";

/**
 * Register it before joining room:
 * ```js
 * WindowManager.register({
 *   kind: "HelloWorld",
 *   src: HelloWorld
 * })
 * ```
 * Then you can use it in your room:
 * ```js
 * manager.addApp({ kind: 'HelloWorld' })
 * ```
 * Read more about how to make a netless app here:
 * https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md
 */
const HelloWorld: NetlessApp = {
  kind: "HelloWorld",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-hello-world";
    box.mountContent($content);

    const app = createApp(App).provide("context", context);

    app.mount($content);

    context.emitter.on("destroy", () => {
      app.unmount();
    });
  },
};

export default HelloWorld;
