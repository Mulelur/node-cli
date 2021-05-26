import arg from "arg";
import chalk from "chalk";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--scan": Boolean,
      "--install": Boolean,
      "-scan": "--scan",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    scanFiles: args["--scan "] || false,
    runInstall: args["--install"] || false,
  };
}

export function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  const path = require("path");
  const fs = require("fs");
  const input = fs.createReadStream(path.join(__dirname, "files", "test.js"));

  const rl = require("readline").createInterface({
    input: input,
    terminal: false,
  });

  var lineNumber = 0;

  rl.on("line", function (l) {
    lineNumber++;
    var o = Array.from(l);
    var regex = /^.+\s*([+-]\s*.+\s*)*\s=\s*.+\;$/g;
    var noColun = /\)?$/;

    const isValidJS = regex.test(l);
    if (!isValidJS) {
      noSpace = o.indexOf("=");
      noSemiColon = o.indexOf(";");
      if (noSpace > -1) {
        const type = "no space between the assignments";
        console.log(
          "line " +
            lineNumber +
            ":^" +
            noSpace +
            "style guide violated :" +
            type
        );
      }
      if (noSemiColon > -1) {
        const type = "no semi colon";
        console.log(
          "at line " +
            lineNumber +
            ":^" +
            noSemiColon +
            "  " +
            "style guide violated :" +
            type
        );
      }
    } else {
      // console.log('valid');
    }
  });
  console.log("%s Scan Complete", chalk.green.bold("DONE"));
}
