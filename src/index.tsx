import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import styles from "./style.css?inline";

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

    const root = createRoot($content);

    root.render(<App context={context} />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};

export default HelloWorld;
