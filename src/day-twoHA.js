const fs = require("fs");

const readFile = (localFilePath) => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");
  const textByLine = data.split("\n");
  return textByLine.reduce((accumulator, value) => {
    return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
  }, {});
};

const dayTwo = () => {
  const total = readFile("src/inputs/day-two.txt");
  const options = Object.keys(total);

  let totalPoints = 0;

  options.forEach((option) => {
    console.log(total);
    switch (option) {
      case "B Y":
        totalPoints = totalPoints + options.option * 5;
        break;
      case "A Z":
        totalPoints = totalPoints + options.option * 3;
        break;
      case "B X":
        totalPoints = totalPoints + options.option * 1;
        break;
      case "A X":
        totalPoints = totalPoints + options.option * 4;
        break;
      case "C X":
        totalPoints = totalPoints + options.option * 7;
        break;
      case "C Y":
        totalPoints = totalPoints + options.option * 2;
        break;
      case "C Z":
        totalPoints = totalPoints + options.option * 6;
        break;
      case "B Z":
        totalPoints = totalPoints + options.option * 9;
        break;
      case "A Y":
        totalPoints = totalPoints + options.option * 8;
        break;
    }
  });
  return totalPoints;
};

console.log(dayTwo());
