import * as fs from "fs";

export const readFile = (localFilePath: string): number[] => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");
  let textByLine = data.split("\n");
  let numByLine: number[] = [];
  textByLine.forEach((element) => {
    numByLine.push(parseInt(element));
  });

  return numByLine;
};
