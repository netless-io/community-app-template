const cwd = process.cwd().replace(/\\/g, "/");
const i = cwd.indexOf("/community-apps/packages/");

if (i === -1) error_exit();

const paths = cwd
  .slice(i + "/community-apps/".length)
  .split("/")
  .slice(0, 3);

if (paths.length !== 3) error_exit();

console.log(">", ["vite", "playground", paths.join("/")].join(" "));
process.exit(
  require("child_process").spawnSync(bin("npx"), ["vite", "playground", paths.join("/")], {
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
