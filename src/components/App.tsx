import type { AppContext } from "@netless/window-manager";

import React, { useEffect, useState } from "react";

export interface AppProps {
  context: AppContext;
}

/**
 * This is a basic counter example of using netless app storage api in React.
 *
 * To make use of the sync storage, we have to adjust a normal react state's
 * `setState` api to apply changes to the storage. See the `setCount` implementation.
 *
 * The storage will tell us when the state is changed, then we can update the local state
 * in the `addStateChangedListener` callback.
 */
export function App({ context }: AppProps) {
  const [storage] = useState(() => context.createStorage("counter", { count: 0 }));
  const [count, realSetCount] = useState(() => storage.state.count);

  useEffect(
    () =>
      storage.addStateChangedListener(() => {
        realSetCount(storage.state.count);
      }),
    [storage]
  );

  const setCount = (count: number) => {
    storage.setState({ count });
  };

  console.log("<App /> count =", count);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
