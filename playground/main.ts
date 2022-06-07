import "./style.css";
import { FastboardApp, register, Theme } from "@netless/fastboard";

import { apps, createFastboard, mount } from "@netless/fastboard";
import { playground, logo } from "./config";

const $app = document.getElementById("app") as HTMLDivElement;
const $theme_btn = document.getElementById("theme") as HTMLButtonElement;
const $reset_btn = document.getElementById("reset") as HTMLButtonElement;

let fastboard: FastboardApp | undefined;
let ui: ReturnType<typeof mount> | undefined;
let theme: Theme = "light";

function validate() {
  if (!import.meta.env.VITE_APPID) {
    $app.textContent = "Please set VITE_APPID in your .env file";
    return false;
  }
  if (!import.meta.env.VITE_ROOM_UUID) {
    $app.textContent = "Please set VITE_ROOM_UUID in your .env file";
    return false;
  }
  if (!import.meta.env.VITE_ROOM_TOKEN) {
    $app.textContent = "Please set VITE_ROOM_TOKEN in your .env file";
    return false;
  }

  return true;
}

async function main() {
  await register_app();

  fastboard = await createFastboard({
    sdkConfig: {
      appIdentifier: import.meta.env.VITE_APPID,
      region: "cn-hz",
    },
    joinRoom: {
      uid: Math.random().toString(36).slice(2),
      uuid: import.meta.env.VITE_ROOM_UUID,
      roomToken: import.meta.env.VITE_ROOM_TOKEN,
    },
  });

  ui = mount(fastboard, $app);

  $reset_btn.onclick = () => {
    if (fastboard) {
      fastboard.cleanCurrentScene();
      const { manager } = fastboard;
      Object.keys(manager.apps || {}).forEach(manager.closeApp.bind(manager));
    }
  };
  $reset_btn.disabled = false;

  $theme_btn.onclick = () => {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.style.colorScheme = theme;
    document.body.classList.toggle("netless-color-scheme-dark", theme === "dark");
    ui && ui.update({ theme });
  };

  (window as any).fastboard = fastboard;
  (window as any).room = fastboard.room;
  (window as any).manager = fastboard.manager;
  (window as any).ui = ui;
}

async function register_app() {
  if (playground) {
    const app = playground.default;
    register({
      kind: app.kind,
      src: app,
    });

    const open = playground.open;
    apps.clear();
    apps.push({
      icon: logo || "",
      kind: app.kind,
      label: app.kind.replace(/([a-z])([A-Z])/, "$1 $2"),
      onClick: fastboard => {
        open ? open(fastboard.manager) : fastboard.manager.addApp({ kind: app.kind });
      },
    });
  }
}

if (validate()) main().catch(console.error);
