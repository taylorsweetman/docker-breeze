#! /usr/bin/env node

import { execSync, spawn } from "child_process";
import { Command } from "commander";

const toStdOut = (buf) => {
  console.log(buf.toString().slice(0, -1));
};

const spawnNewPipedProcess = (command, args) => {
  const spawnedProc = spawn(command, [...args], {
    shell: true,
  });

  spawnedProc.stdout.pipe(process.stdout);
  spawnedProc.stderr.pipe(process.stderr);

  process.stdin.on("data", (data) => {
    spawnedProc.stdin.write(data);
  });

  spawnedProc.on("close", (code) => {
    process.exit(code);
  });
};

const main = async () => {
  try {
    const program = new Command();

    program
      .name("db")
      .description("A collection of aliases for running Docker commands");

    program
      .command("ps")
      .description("List running containers")
      .option("-a, --all", "Show all containers (default shows just running)")
      .action((options) => {
        const dps = options.all
          ? execSync("docker ps -a")
          : execSync("docker ps");
        toStdOut(dps);
      });

    program
      .command("cpr")
      .description("Prune all non-running containers")
      .action(() => {
        spawnNewPipedProcess("docker", ["container", "prune"]);
      });

    program
      .command("ipr")
      .description("Prune all dangling images")
      .action(() => {
        spawnNewPipedProcess("docker", ["image", "prune"]);
      });

    program.parse();
  } catch (error) {}
};

main();
