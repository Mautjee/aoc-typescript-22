import * as fs from "fs";
/*
A & X = Rock     -> 1
B & Y = Paper    -> 2
C & Z = Scissors -> 3

Win   -> 6
Draw  -> 3
Lose  -> 0

A Y -> 
B X
C Z
*/

const readFile = (localFilePath: string) => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");
  let textByLine = data.split("\n");
  textByLine.forEach((element, index) => {
    console.log(element);
  });
};

export const dayTwo = () => {
  readFile("src/inputs/day-two-test.txt");
};
