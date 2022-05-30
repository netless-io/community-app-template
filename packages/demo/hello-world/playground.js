import app from "./index.js";

export default app;

/**
 * @param {import('@netless/window-manager').WindowManager} manager
 */
export function open(manager) {
  manager.addApp({ kind: app.kind });
}
