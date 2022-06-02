const cwd = process.cwd().replace(/\\/g, "/");
const i = cwd.indexOf("/community-apps/packages/");

if (i === -1) error_exit();

const paths = cwd
  .slice(i + "/community-apps/".length)
  .split("/")
  .slice(0, 3);

if (paths.length !== 3) error_exit();

const app_name = paths.join("/");

const fg = require("fast-glob");
const fs = require("fs");
const path = require("path");

const assets = {
  playground: fg.sync(`./playground.{js,ts}`),
  logo: fg.sync(`./logo.{svg,png}`),
};
render_config(app_name, assets);

console.log(">", ["vite", "playground"].join(" "));
process.exit(
  require("child_process").spawnSync(bin("npx"), ["vite", "playground", app_name], {
    stdio: "inherit",
    cwd: cwd.slice(0, i + "/community-apps".length),
  }).status
);

function error_exit() {
  console.error("scripts/start.js needs to be run in app directory");
  process.exit(1);
}

function bin(name) {
  return process.platform === "win32" ? name + ".cmd" : name;
}

function render_config(app_name, assets) {
  let result = "// @ts-nocheck\n";

  if (assets.playground.length) {
    let playground = path.join(app_name, assets.playground[0]);
    result += `import * as playground from ${JSON.stringify("../" + playground)};\n`;
  } else {
    result += `let playground = null;\n`;
  }

  if (assets.logo.length) {
    let logo = path.join(app_name, assets.logo[0]);
    result += `import logo from ${JSON.stringify("../" + logo)};\n`;
  } else {
    result += `let logo = null;\n`;
  }

  result += "\nexport { playground, logo };\n";
  fs.writeFileSync("../../../playground/config.ts", result);
}
