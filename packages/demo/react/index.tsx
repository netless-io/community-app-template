import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./style.css?inline";

interface CounterProps {
  count: number;
  setCount: (count: number) => void;
}

function Counter({ count, setCount }: CounterProps) {
  console.log("Counter:", count);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

const AppReact: NetlessApp<{}, {}, {}, void> = {
  kind: "React",
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-react";
    box.mountContent($content);

    const storage = context.createStorage("counter", { count: 0 });

    const root = createRoot($content);
    const refresh = () => {
      const setCount = (count: number) => storage.setState({ count });
      root.render(<Counter count={storage.state.count} setCount={setCount} />);
    };
    const dispose = storage.addStateChangedListener(refresh);
    refresh();

    context.emitter.on("destroy", () => {
      dispose();
      root.unmount();
    });
  },
};

export default AppReact;
