const { organizeAssets } = require("./src/organize");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");

console.log(
  chalk.blue(
    figlet.textSync("Organize.js", {
      horizontalLayout: "default",
    })
  )
);

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(chalk.red("Missing input/output path"));
  console.log(
    chalk.magentaBright("Usage: node index.js /path/to/input /path/to/output")
  );
  process.exit();
}

const inputArg = args[0];
const outputArg = args[1];

const inputPath = path.resolve(path.join(process.cwd(), inputArg));
const outputPath = path.resolve(path.join(process.cwd(), outputArg));

console.log(chalk.blue(`Source Directory: ${inputPath}`));
console.log(chalk.blue(`Output Directory: ${outputPath}`));

organizeAssets(inputPath, outputPath);
