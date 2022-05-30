const ejs = require("ejs");
const fg = require("fast-glob");
const fse = require("fs-extra");
const path = require("path");
const { camelCase, upperFirst } = require("lodash");

const pkg = require("../package.json");
const packagesDir = path.join(__dirname, "..", pkg.packagesDir);

/**
 * @typedef {Object} RenderConfig
 * @property {"typescript" | "vanilla"} template - Template type
 * @property {string} name - App name
 * @property {string} title - Window title
 */

/**
 * @param {RenderConfig} config
 */
async function render({ template = "vanilla", name, title = "New Window" }) {
  const fullName = name;
  const camelName = upperFirst(camelCase(name));

  if (await fse.pathExists(path.join(packagesDir, fullName))) {
    throw new Error(`Package "${fullName}" exists.`);
  }

  const templateDir = path.join(__dirname, "template", template);

  if (!(await fse.pathExists(templateDir))) {
    throw new Error(`Template "${template}" not found.`);
  }

  const templateConfig = {
    name,
    fullName,
    camelName,
    title,
  };

  const entries = await fg(["**/*.ejs"], {
    cwd: templateDir,
    dot: true,
    objectMode: true,
  });

  await Promise.all(
    entries.map(async entry => {
      const content = await fse.readFile(path.join(templateDir, entry.path), "utf8");
      fse.outputFile(
        path.join(packagesDir, fullName, entry.path.replace(/.ejs$/, "")),
        ejs.render(content, templateConfig)
      );
    })
  );

  return {
    ...templateConfig,
    packagePath: path.join(packagesDir, fullName),
  };
}

module.exports = render;
