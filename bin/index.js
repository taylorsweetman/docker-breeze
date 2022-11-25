import { execSync } from "child_process";

const main = () => {
  console.log("Hello world!");
  const dps = execSync("docker ps");
  console.log(dps.toString());
};

main();
