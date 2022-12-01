import * as fs from "fs";

const dataFile = "src/inputs/day-one.txt";
const testFile = "src/inputs/day-one-test.txt";

const currentFile = dataFile;

interface Elf {
  calories: number[];
}

const readFile = (localFilePath: string): Elf[] => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");
  let textByLine = data.split("\n");
  let allElves: Elf[] = [];
  let tempElf: Elf = { calories: [] };
  textByLine.forEach((element, index) => {
    if (element !== "") {
      tempElf.calories.push(Number(element));
    }
    if (element === "") {
      allElves.push(tempElf);
      tempElf = { calories: [] };
    }
    if (textByLine.length - 1 === index) {
      allElves.push({ calories: [Number(element)] });
    }
  });

  return allElves;
};

const part1 = (allElves: Elf[]): number => {
  let mostCallories = 0;
  allElves.forEach((elf) => {
    const sum = elf.calories.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    if (sum > mostCallories) {
      mostCallories = sum;
    }
  });
  return mostCallories;
};

const part2 = (allElves: Elf[]): number => {
  let topThreeElves = [0, 0, 0];
  let sums: number[] = [];
  allElves.forEach((elf) => {
    const sum = elf.calories.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    sums.push(sum);
  });
  sums.sort((a, b) => b - a);
  topThreeElves.forEach((n, i) => {
    topThreeElves[i] = sums[i];
  });
  return topThreeElves.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
};

export const dayOne = () => {
  console.log("Answer part1: ", part1(readFile(currentFile)));
  console.log("Answer part2: ", part2(readFile(currentFile)));
};
