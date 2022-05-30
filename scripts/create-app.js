const argv = require("minimist")(process.argv.slice(2), { string: ["_"] });
const prompts = require("prompts");
const fse = require("fs-extra");
const path = require("path");
const render = require("./render");

async function createNetlessApp() {
  const templateTypes = await fse.readdir(path.join(__dirname, "template"));

  console.log("\n -= Netless App Generator =- \n");

  const renderConfig = await prompts([
    {
      name: "template",
      type: "autocomplete",
      message: "Choose template type:",
      initial: "vanilla",
      choices: templateTypes.map(title => ({ title })),
    },
    {
      name: "name",
      type: "text",
      message: "Enter project name.",
      initial: "my-demo",
    },
    {
      name: "title",
      type: "text",
      message: "Title for the demo window:",
      initial: "New Window",
    },
  ]);

  try {
    const result = await render(renderConfig);
    const packagePath = path.relative(process.cwd(), result.packagePath);
    console.log(`\n\n New package "${result.fullName}" has been created at ${packagePath}\n`);
    console.log(
      `\n Run \`cd ${packagePath} && npm install && npm start\` to develop the package.\n`
    );
  } catch (e) {
    if (argv.debug) {
      throw e;
    } else {
      console.error(`\n${e.message}\n`);
    }
  }
}

createNetlessApp();
