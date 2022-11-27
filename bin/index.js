import { execSync } from "child_process";
import { Command } from "commander";

const main = () => {
  const program = new Command();

  program
    .name("d-b")
    .description("A collection of aliases for running Docker commands");

  program.command("dps").action(() => {
    try {
      const dps = execSync("docker ps");
      console.log(dps.toString());
    } catch (error) {}
  });

  program.parse();
};

main();
