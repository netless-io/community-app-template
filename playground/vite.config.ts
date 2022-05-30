import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  define: {
    "import.meta.env.VITE_DEV_APP_NAME": JSON.stringify(get_dev_app_name()),
  },
});

function get_dev_app_name() {
  let app_path = process.argv[3];
  if (app_path) {
    app_path = app_path.replace(/\\/g, "/");
    let i = app_path.lastIndexOf("packages/");
    if (i !== -1) {
      return app_path.slice(i + "packages/".length);
    } else {
      warn_no_dev_app();
    }
  } else if (!process.env.VITE_DEV_APP_NAME) {
    warn_no_dev_app();
  }

  return process.env.VITE_DEV_APP_NAME;
}

function warn_no_dev_app() {
  console.warn("Not set VITE_DEV_APP_NAME");
  console.warn("Example: npx vite playground ./packages/demo/hello-world");
}
