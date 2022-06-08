import type { AppContext } from "@netless/window-manager";
import React, { useState, useEffect } from "react";

interface CounterProps {
  context: AppContext;
}

export function Counter({ context }: CounterProps) {
  const [storage] = useState(() => context.createStorage("counter", { count: 0 }));
  const [count, setCount] = useState(storage.state.count);

  useEffect(() => {
    const storage = context.createStorage("counter", { count: 0 });

    return storage.addStateChangedListener(() => {
      setCount(storage.state.count);
    });
  }, []);

  const increment = () => {
    storage.setState({ count: count + 1 });
  };

  console.log("Counter:", count);
  return <button onClick={increment}>{count}</button>;
}
