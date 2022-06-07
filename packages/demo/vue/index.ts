import type { NetlessApp } from "@netless/window-manager";

import { createApp } from "vue";
import App from "./App.vue";

const AppVue: NetlessApp = {
  kind: "Vue",
  setup(context) {
    const box = context.getBox();

    const $content = document.createElement("div");
    $content.className = "app-vue";
    box.mountContent($content);

    const app = createApp(App);
    app.provide("context", context);
    app.mount($content);

    context.emitter.on("destroy", () => {
      app.unmount();
    });
  },
};

export default AppVue;
