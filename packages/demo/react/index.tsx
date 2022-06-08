import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import { Counter } from "./components/Counter";
import styles from "./style.css?inline";

const AppReact: NetlessApp<{}, {}, {}, void> = {
  kind: "React",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-react";
    box.mountContent($content);

    const root = createRoot($content);
    root.render(<Counter context={context} />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};

export default AppReact;
