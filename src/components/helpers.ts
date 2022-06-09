import type { RoomState } from "@netless/fastboard";
import type { AppContext, Storage } from "@netless/window-manager";

import { Readable, readable, Writable } from "svelte/store";

/**
 * @example
 * const storage = context.createStorage("counter", { count: 0 })
 * const count = connectStorage(storage, "count")
 * $: console.log($count++) // 0
 */
export function connectStorage<
  TState extends Record<string, any> = any,
  TKey extends keyof TState = keyof TState
>(storage: Storage<TState>, key: TKey): Writable<TState[TKey]> {
  return {
    subscribe: fn => (
      fn(storage.state[key]),
      storage.addStateChangedListener(diff => {
        diff[key] && fn(storage.state[key]);
      })
    ),
    set: value => storage.setState({ [key]: value } as any),
    update: fn => storage.setState({ [key]: fn(storage.state[key]) } as any),
  };
}

/**
 * @example
 * const writable = useWritable(context)
 * $: console.log($writable) // true
 */
export function useWritable(context: AppContext) {
  return readable(context.getIsWritable(), set => {
    const update = () => set(context.getIsWritable());
    context.emitter.on("writableChange", update);
    return () => context.emitter.off("writableChange", update);
  });
}

function pluckMemberId(member: RoomState["roomMembers"][number]): string {
  return member.payload?.uid || String(member.memberId);
}

/**
 * @example
 * const members = useMembers(context)
 * $: console.log($members) // ["user123", "lol233"]
 */
export function useMembers(context: AppContext): Readable<string[]> {
  const displayer = context.getDisplayer();

  return readable(displayer.state.roomMembers.map(pluckMemberId), set => {
    const update = (state: Partial<RoomState>) => {
      if (state.roomMembers) {
        set(displayer.state.roomMembers.map(pluckMemberId));
      }
    };
    displayer.callbacks.on("onRoomStateChanged", update);
    return () => displayer.callbacks.off("onRoomStateChanged", update);
  });
}

/**
 * @example
 * const me = useMemberID(context) // "user123"
 */
export function useMemberID(context: AppContext): string {
  return context.getRoom()?.uid || "";
}
