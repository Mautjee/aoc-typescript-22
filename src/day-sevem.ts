

import * as fs from "fs";

const file = "src/inputs/day-seven-test.txt";

const readFile = (localFilePath: string) => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");

  const lines = data.split("\n");

  return lines;
};

console.log(readFile(file));
