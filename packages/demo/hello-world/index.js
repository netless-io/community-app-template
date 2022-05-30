import styles from "./style.css?inline";

/**
 * @type {import('@netless/window-manager').NetlessApp<{}, {}, {}, void>}
 */
const HelloWorld = {
  kind: "HelloWorld",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-hello-world";
    $content.innerHTML = "<button></button>";
    box.mountContent($content);

    const $button = $content.querySelector("button");

    const storage = context.createStorage("counter");
    storage.ensureState({ count: 1 });

    const refresh_button = () => {
      log("refresh_button", storage.state.count);
      $button.textContent = storage.state.count;
    };
    refresh_button();

    const dispose = storage.addStateChangedListener(refresh_button);

    $button.onclick = ev => {
      if (context.getIsWritable()) {
        log("set_state", storage.state.count + 1);
        const x = ev.shiftKey ? -1 : 1;
        storage.setState({ count: storage.state.count + x });
      }
    };

    context.emitter.on("destroy", () => {
      dispose();
    });

    function log(...args) {
      console.log("%c HelloWorld ", "background:#FF8C00;color:#fff", ...args);
    }
  },
};

export default HelloWorld;
