import * as fs from "fs";
import { validateHeaderName } from "http";
/*
A & X = Rock     -> 1
B & Y = Paper    -> 2
C & Z = Scissors -> 3

Win   -> 6
Draw  -> 3
Lose  -> 0

PART ONE
A X -> Draw 4
A Y -> Win  8
A Z -> Lose 3

B X -> Lose 1
B Y -> Draw 5
B Z -> Win  9

C X -> Win  7
C Y -> Lose 2
C Z -> Draw 6

PART TWO

Z Win  -> 6
Y Draw  -> 3
X Lose -> 0

A & X = Rock     -> 1
B & Y = Paper    -> 2
C & Z = Scissors -> 3

A X z -> 0+3= 3
A Y x-> 3+1=  4
A Z y -> 6+2= 8

B X y -> 0+1= 1
B Y y -> 3+2= 5
B Z z -> 6+3= 9

C X y -> 0+2= 2 
C Y z -> 3+3= 6
C Z x -> 6+1= 7
*/
type Options =
  | "B Y"
  | "A Z"
  | "B X"
  | "A X"
  | "C X"
  | "C Y"
  | "C Z"
  | "B Z"
  | "A Y";
type Games = { [key: string]: number };
const input: Games = {
  "B Y": 309,
  "A Z": 649,
  "B X": 89,
  "A X": 132,
  "C X": 106,
  "C Y": 659,
  "C Z": 214,
  "B Z": 121,
  "A Y": 221,
};
const calc: Record<string, (amount: number) => number> = {
  "B X": (amount: number) => {
    return amount * 1;
  },
};

// const readFile = (localFilePath: string) => {
//   let data = fs.readFileSync(localFilePath).toString("utf-8");
//   const textByLine = data.split("\n");
//   return textByLine.reduce((accumulator, value) => {
//     return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
//   }, {});
// };

const partOne = () => {
  const options = Object.keys(input);

  let totalPoints = 0;

  options.forEach((option) => {
    switch (option) {
      case "B Y":
        totalPoints = totalPoints + input[option] * 5;
        break;
      case "A Z":
        totalPoints = totalPoints + input[option] * 8;
        break;
      case "B X":
        totalPoints = totalPoints + input[option] * 1;
        break;
      case "A X":
        totalPoints = totalPoints + input[option] * 3;
        break;
      case "C X":
        totalPoints = totalPoints + input[option] * 2;
        break;
      case "C Y":
        totalPoints = totalPoints + input[option] * 6;
        break;
      case "C Z":
        totalPoints = totalPoints + input[option] * 7;
        break;
      case "B Z":
        totalPoints = totalPoints + input[option] * 9;
        break;
      case "A Y":
        totalPoints = totalPoints + input[option] * 4;
        break;
    }
  });
  return totalPoints;
};

export const dayTwo = () => {
  console.log("part one: ", partOne());
};
