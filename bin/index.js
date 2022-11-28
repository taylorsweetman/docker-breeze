#! /usr/bin/env node

import { execSync, spawn } from "child_process";
import { Command } from "commander";

const toStdOut = (buf) => {
  console.log(buf.toString().slice(0, -1));
};

const toStdOutWithIdxs = (buf) => {
  const lines = buf.toString().split("\n");
  const linesWithIdxs = lines.map((line, idx) => {
    return idx && line ? `${line}   [${idx}]` : line;
  });
  console.log(linesWithIdxs.join("\n"));
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
        toStdOutWithIdxs(dps);
      });

    program
      .command("ls")
      .description("List images")
      .action(() => {
        const ls = execSync("docker image ls");
        toStdOutWithIdxs(ls);
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

    program
      .command("irm")
      .description("Remove a an image by ID")
      .argument("<imageId>", "The ID of the image to remove")
      .action((imageId) => {
        const irm = execSync(`docker image rm ${imageId}`);
        toStdOut(irm);
      });

    program.parse();
  } catch (error) {}
};

main();
