import { createFastboard, mount } from "@netless/fastboard";
import { get_uid } from "./query";
import { registering } from "./register";
import "./style.css";

main().catch(console.error);

async function main() {
  await registering;

  const fastboard = await createFastboard({
    sdkConfig: {
      appIdentifier: import.meta.env.VITE_APPID,
      region: "cn-hz",
    },
    joinRoom: {
      uid: get_uid(),
      uuid: import.meta.env.VITE_ROOM_UUID,
      roomToken: import.meta.env.VITE_ROOM_TOKEN,
    },
  });

  const $ui = setup();

  const fastboardUI = mount(fastboard, $ui.$whiteboard);

  $ui.onReset(() => {
    fastboard.cleanCurrentScene();
    const { manager } = fastboard;
    Object.keys(manager.apps || {}).forEach(manager.closeApp.bind(manager));
  });

  $ui.onThemeChanged(theme => fastboardUI.update({ theme }));

  expose({ fastboard, room: fastboard.room, manager: fastboard.manager, ui: fastboardUI });
}

/** Put some object in `window` for debugging. */
function expose(record) {
  Object.assign(window, record);
  console.debug("debug variables:", Object.keys(record).join());
}

/** Setup basic UI. */
function setup() {
  const $app = document.querySelector("#app");

  const $whiteboard = $app.appendChild(document.createElement("div"));
  $whiteboard.id = "whiteboard";

  const $controls = $app.appendChild(document.createElement("div"));
  $controls.id = "controls";

  const $resetBtn = $controls.appendChild(document.createElement("button"));
  $resetBtn.id = "reset";
  $resetBtn.title = "Remove all apps & Clear whiteboard";
  $resetBtn.textContent = "Reset";
  let onResetCallback;
  $resetBtn.onclick = () => onResetCallback && onResetCallback();

  const $themeBtn = $controls.appendChild(document.createElement("button"));
  $themeBtn.id = "theme";
  const themeCallbacks = [];
  const prefersDark = matchMedia("(prefers-color-scheme: dark)");
  let theme;
  function toggleTheme(ev) {
    if (ev) {
      theme = ev.matches ? "dark" : "light";
    } else {
      theme = theme === "light" ? "dark" : "light";
    }
    themeCallbacks.forEach(fn => fn(theme));
    document.documentElement.dataset.theme = theme;
    $themeBtn.textContent = theme[0].toUpperCase() + theme.slice(1);
    $themeBtn.title = "Click to change to " + (theme === "light" ? "dark" : "light");
  }
  toggleTheme(prefersDark);
  prefersDark.addEventListener("change", toggleTheme);
  $themeBtn.onclick = toggleTheme.bind(null, undefined);

  return {
    $whiteboard,
    onReset: fn => (onResetCallback = fn),
    onThemeChanged: fn => (themeCallbacks.push(fn), fn(theme)),
  };
}
