import type { NetlessApp } from "@netless/window-manager";

import styles from "./style.css?inline";

const Messaging: NetlessApp<{}, { message: string }, {}, void> = {
  kind: "Messaging",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-messaging";
    $content.innerHTML = "<input><button>Send</button><pre></pre>";
    box.mountContent($content);

    const $input = $content.querySelector("input") as HTMLInputElement;
    const $button = $content.querySelector("button") as HTMLButtonElement;
    const $pre = $content.querySelector("pre") as HTMLPreElement;

    $button.disabled = true;
    $input.oninput = () => ($button.disabled = !$input.value);

    const dispose = context.addMagixEventListener("message", ({ payload, authorId }) => {
      log("received:", payload);
      $pre.appendChild(document.createTextNode(authorId + ": " + payload + "\n"));
    });

    $button.onclick = () => {
      log("dispatch:", $input.value);
      context.dispatchMagixEvent("message", $input.value);
      $input.value = "";
      $input.dispatchEvent(new InputEvent("input"));
    };

    context.emitter.on("destroy", () => {
      dispose();
    });

    function log(...args: any[]) {
      console.log("%c Messaging ", "background:#FF8C00;color:#fff", ...args);
    }
  },
};

export default Messaging;
