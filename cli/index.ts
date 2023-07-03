#!/usr/bin/env node

// MIT License
//
// Copyright (c) 2023 Yoshiboi18303
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import yargs from "yargs";
import { bold, cyan, green, yellow } from "kleur/colors";
import { hideBin } from "yargs/helpers";
import cli from "../package.json";
import { promisify } from "util";
import { exec as execSync } from "child_process";
import { calculate, getPrompts } from "../utils/";

const exec = promisify(execSync);

function logVersion(name: string, version: string) {
  console.log(`${cyan(`${name}:`)} ${green(version)}`);
}

async function main() {
  const args = await yargs
    .default(hideBin(process.argv))
    .scriptName("abp")
    .version(false)
    .option("current-level", {
      alias: "cl",
      type: "number",
      describe: "Your current battle pass level",
    })
    .option("goal-level", {
      alias: ["goal", "gl"],
      type: "number",
      describe: "Your current battle pass level goal",
    })
    .option("version", {
      type: "boolean",
      describe: "Shows the CLI version.",
    }).argv;

  if (args.version) {
    const npmVersion = (await exec("npm --version")).stdout;
    const nodeVersion = process.version;

    logVersion(cli.name, cli.version);
    logVersion("Node", nodeVersion);
    logVersion("npm", npmVersion);
    process.exit(0);
  }

  const answers = await getPrompts(args);
  const starsRequired = calculate(
    answers["current-level"],
    answers["goal-level"],
    answers.extraStars
  );

  if (starsRequired <= 0) {
    console.log(
      bold(
        `You're already ${
          answers["current-level"] > answers["goal-level"] ? "past" : "at"
        } level ${cyan(answers["goal-level"])}! ${green("Congratulations!")}`
      )
    );
    process.exit(0);
  }

  console.log(
    `You will need ${yellow(starsRequired)} stars to get from level ${cyan(
      answers["current-level"]
    )} to ${green(answers["goal-level"])} in the Battle Pass. ${bold(
      green("Good luck!")
    )}`
  );
  console.log(
    yellow(
      "Please note that this is just an estimation, if the math is off, please feel free to contribute!"
    )
  );
}

// Run our main function asynchronously.
(async () => {
  await main();
})();
