import type { RoomState } from "@netless/fastboard";
import type { AppContext } from "@netless/window-manager";

import { useEffect, useMemo, useState } from "react";

/**
 * @example
 * const writable = useWritable(context) // true
 */
export function useWritable(context: AppContext) {
  const [writable, setWritable] = useState(() => context.getIsWritable());

  useEffect(() => {
    const update = () => setWritable(context.getIsWritable());
    context.emitter.on("writableChange", update);
    return () => context.emitter.off("writableChange", update);
  }, [context]);

  return writable;
}

/**
 * @example
 * const [counterState, setCounterState] = useStorage(context, "counter", { count: 0 })
 * console.log(counterState) // { count: 0 }
 * setCounterState({ count: 2 })
 */
export function useStorage<T>(
  context: AppContext,
  namespace: string,
  defaultState: T | (() => T)
): [T, (v: Partial<T>) => void] {
  const [storage] = useState(() =>
    context.createStorage<T>(
      namespace,
      typeof defaultState === "function" ? (defaultState as () => T)() : defaultState
    )
  );
  const [state, _setState] = useState(storage.state);
  const setState = useMemo(() => storage.setState.bind(storage), [context]);

  useEffect(
    () =>
      storage.addStateChangedListener(() => {
        _setState({ ...storage.state });
      }),
    [storage]
  );

  return [state, setState];
}

function pluckMemberId(member: RoomState["roomMembers"][number]): string {
  return member.payload?.uid || String(member.memberId);
}

/**
 * @example
 * const members = useMembers(context) // ["user123", "lol233"]
 */
export function useMembers(context: AppContext): string[] {
  const [members, setMembers] = useState(() =>
    context.getDisplayer().state.roomMembers.map(pluckMemberId)
  );

  useEffect(() => {
    const displayer = context.getDisplayer();
    const handler = (state: Partial<RoomState>) => {
      if (state.roomMembers) {
        setMembers(displayer.state.roomMembers.map(pluckMemberId));
      }
    };
    displayer.callbacks.on("onRoomStateChanged", handler);
    return () => {
      displayer.callbacks.off("onRoomStateChanged", handler);
    };
  }, [context]);

  return members;
}

/**
 * @example
 * const myUID = useMemberID(context) // "user123"
 */
export function useMemberID(context: AppContext): string {
  return useMemo(() => context.getRoom()?.uid || "", [context]);
}
