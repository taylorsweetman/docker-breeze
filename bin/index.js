#! /usr/bin/env node

import { execSync } from "child_process";
import { Command } from "commander";

const toStdOut = (buf) => {
  console.log(buf.toString().slice(0, -1));
};

const main = () => {
  const program = new Command();

  program
    .name("db")
    .description("A collection of aliases for running Docker commands");

  program
    .command("ps")
    .option("-a, --all", "Show all containers (default shows just running)")
    .action((options) => {
      try {
        const dps = options.all
          ? execSync("docker ps -a")
          : execSync("docker ps");
        toStdOut(dps);
      } catch (error) {}
    });

  program.parse();
};

main();
