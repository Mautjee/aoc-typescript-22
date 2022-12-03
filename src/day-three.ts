import { INSPECT_MAX_BYTES } from "buffer";
import { Console } from "console";
import * as fs from "fs";

interface Bag {
  compartment1: string;
  compartment2: string;
}

const file = "src/inputs/day-three.txt";

const readFile = (localFilePath: string) => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");

  const lines = data.split("\n");

  return lines;
};
const splitInCompartments = (completeBags: string[]): Bag[] => {
  return completeBags.map((line, index) => {
    const size = line.length;
    return {
      compartment1: line.slice(0, size / 2),
      compartment2: line.slice(size / 2, size),
    };
  });
};

const getDubbleItemInBag = (bags: Bag[]): string[] => {
  let doubleLetters: string[] = [];
  let found = false;

  bags.forEach((comp) => {
    found = false;
    const LetterArray = comp.compartment1.split("");
    LetterArray.forEach((letter) => {
      if (found) {
        return;
      }
      if (comp.compartment2.includes(letter)) {
        doubleLetters.push(letter);
        found = true;
        return;
      } else {
        found = false;
      }
    });
  });
  return doubleLetters;
};
const countPriorityTotal = (items: string[]): number => {
  let totalPoints = 0;
  const alfabed = "abcdefghijklmnopqrstuvwxyz";
  const upperAphabed = alfabed.toUpperCase();

  items.forEach((letter) => {
    let priorityValue = 0;
    if (alfabed.includes(letter)) {
      priorityValue = alfabed.indexOf(letter) + 1;
    } else {
      priorityValue = upperAphabed.indexOf(letter) + 1 + 26;
    }
    totalPoints = totalPoints + priorityValue;
  });
  return totalPoints;
};

const part1 = (input: string[]): number => {
  const bagWithCompartments = splitInCompartments(input);

  const doubleItems = getDubbleItemInBag(bagWithCompartments);

  return countPriorityTotal(doubleItems);
};

const part2 = (input: string[]): number => {
  const groupsOfElfes = [];
  const size = 3;

  while (input.length > 0) {
    groupsOfElfes.push(input.splice(0, size));
  }

  let found = false;
  let items: string[] = [];
  groupsOfElfes.forEach((group) => {
    found = false;
    const LetterArray = group[0].split("");
    LetterArray.forEach((letter) => {
      if (found) {
        return;
      }
      if (group[1].includes(letter) && group[2].includes(letter)) {
        items.push(letter);
        found = true;
        return;
      } else {
        found = false;
      }
    });
  });

  return countPriorityTotal(items);
};

export const dayThree = () => {
  //console.log("Part one -> ", part1(readFile(file)));
  console.log("Part 2 -> ", part2(readFile(file)));
};
