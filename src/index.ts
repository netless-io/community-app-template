import type { NetlessApp } from "@netless/window-manager";

import styles from "./style.css?inline";

/**
 * Register it before joining room:
 * ```js
 * WindowManager.register({
 *   kind: "Counter",
 *   src: Counter
 * })
 * ```
 * Then you can use it in your room:
 * ```js
 * manager.addApp({ kind: 'Counter' })
 * ```
 * Read more about how to make a netless app here:
 * https://github.com/netless-io/window-manager/blob/master/docs/develop-app.md
 */
const Counter: NetlessApp = {
  kind: "Counter",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-counter";
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

export default Counter;
