import * as fs from "fs";

const dataFile = "src/inputs/day-one.txt";
const testFile = "src/inputs/day-one-test.txt";

const currentFile = dataFile;

type Elf = number[];

const readFile = (localFilePath: string): Elf[] => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");
  let textByLine = data.split("\n");
  let allElves: Elf[] = [];
  let tempElf: Elf = [];
  textByLine.forEach((element, index) => {
    if (element !== "") {
      tempElf.push(Number(element));
    }
    if (element === "") {
      allElves.push(tempElf);
      tempElf = [];
    }
    if (textByLine.length - 1 === index) {
      allElves.push([Number(element)]);
    }
  });

  return allElves;
};

const calculateCaloriesOfElves = (allElves: Elf[]): number[] => {
  const elvesTotalCalory = allElves.map((elf) => {
    return elf.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  });
  return elvesTotalCalory.sort((a, b) => b - a);
};

const part1 = (allElves: Elf[]): number => {
  return calculateCaloriesOfElves(allElves)[0];
};

const part2 = (allElves: Elf[]): number => {
  const allCaloriesElves = calculateCaloriesOfElves(allElves);
  return allCaloriesElves.slice(0, 3).reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
};

export const dayOne = () => {
  console.log("Answer part1: ", part1(readFile(currentFile)));
  console.log("Answer part2: ", part2(readFile(currentFile)));
};
