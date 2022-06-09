import { register, apps } from "@netless/fastboard";
import App from "../src/index";
import logo from "../src/logo.svg";

export const registering = register({ kind: App.kind, src: App });
apps.clear();
apps.push({
  kind: App.kind,
  label: App.kind.replace(/([a-z])([A-Z])/g, "$1 $2"),
  icon: logo,
  onClick: fastboard => {
    fastboard.manager.addApp({ kind: App.kind });
  },
});
