/// <reference types="vite/client" />

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
 *
 * @type {import("@netless/window-manager").NetlessApp}
 */
const HelloWorld = {
  kind: "HelloWorld",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-hello-world";
    box.mountContent($content);

    const $button = document.createElement("button");
    $content.appendChild($button);

    const storage = context.createStorage("counter", { count: 0 });
    $button.onclick = ev => {
      storage.setState({ count: storage.state.count + (ev.shiftKey ? -1 : 1) });
    };

    function refresh() {
      $button.textContent = String(storage.state.count);
    }
    const dispose = storage.addStateChangedListener(refresh);
    refresh();

    context.emitter.on("destroy", () => {
      dispose();
    });
  },
};

export default HelloWorld;
