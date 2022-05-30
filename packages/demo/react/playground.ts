import type { WindowManager } from "@netless/window-manager";
import app from "./index";

export default app;

export function open(manager: WindowManager) {
  manager.addApp({ kind: app.kind });
}
