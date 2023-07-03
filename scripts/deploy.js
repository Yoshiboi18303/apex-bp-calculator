const { exec: execSync } = require("child_process");
const { promisify } = require("util");
const prompts = require("prompts");
const kleur = require("kleur");

const exec = promisify(execSync);

async function main() {
    const answers = await prompts([
        {
            type: "text",
            name: "commitMessage",
            message: "Please enter your commit message.",
            validate: (value) => value.length <= 0 ? "Required" : true
        },
        {
            type: "confirm",
            name: "isFirstCommit",
            message: "Is this your first deployment?"
        },
        {
            type: "confirm",
            name: "isSure",
            message: "Are you sure you're ready to deploy?"
        }
    ]);

    if (!answers.isSure) {
        console.log(kleur.yellow("Close one! Deployment cancelled."));
        process.exit(0);
    }

    console.log(kleur.cyan("Pushing to GitHub..."))

    await exec("git add .");

    await exec(`git commit -m "${answers.commitMessage}"`);

    if (answers.isFirstCommit) {
        console.log(kleur.cyan("Setting up the push..."));

        await exec("git branch -M main");

        await exec("git remote add origin https://github.com/Yoshiboi18303/apex-bp-calculator")

        console.log(kleur.cyan("Pushing..."));

        await exec("git push -u origin main")
    } else await exec("git push");

    console.log(kleur.green("Push done!"));
    console.log(kleur.cyan("Publishing to npm..."));

    const deploymentMessage = await exec("npm publish --access=public");

    if (deploymentMessage.stderr.length) {
        console.log(kleur.red("Deployment might've failed, please read the logs below.\n\n"));
        console.log(kleur.red(deploymentMessage.stderr));
    } else console.log(kleur.green("Deployment succeeded, hopefully!"));

    console.log(kleur.green("Done!"));
}

(async () => {
    await main();
})();
