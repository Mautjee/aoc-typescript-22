import * as fs from "fs";

const file = "src/inputs/day-seven-test.txt";
type Directory = {
  subDirectories: string[];
  directorySize: number;
}
const readFile = (localFilePath: string) => {
  let data = fs.readFileSync(localFilePath).toString("utf-8");

  const lines = data.split("\n");
  //console.log(lines);
  return lines;
};
const parseData = (lines: string[]) => {
  let pointer: string[] = [];
  let directories: Record<string, Directory> = { "/": { subDirectories: [], directorySize: 0 } };
  let ShowingDirectory: boolean = false;
  lines.forEach((line) => {

    const type = line.split(" ");
    if (type[0] === "$") {
      ShowingDirectory = false;
      const direction = type[1];

      if (direction === "cd") {
        switch (type.at(2)) {
          case "/":
            pointer = ["/"];
            break;
          case "..":
            pointer.pop();
            break;
          default:
            directories[type[2]] = { subDirectories: [], directorySize: 0 };
            pointer.push(type[2]);
            break;
        }
      } else {
        ShowingDirectory = true
      }
    }
    else {
      if (type[0] === "dir") {
        directories[pointer[pointer.length - 1]].subDirectories.push(type[1]);
      } else {
        const totalSize = Math.round(directories[pointer[pointer.length - 1]].directorySize);
        directories[pointer[pointer.length - 1]].directorySize = totalSize + Math.round(Number(type[0]))
      }
    }
  });
  const dirTotals = calculateFolderSize(directories);
  return dirTotals.reduce((acc, val) => (val <= 100000) ? acc + val : acc, 0)

};
const calculateFolderSize = (dir: Record<string, Directory>): number[] => {
  let totalSizeFolders: number[] = [];
  const dirNames = Object.keys(dir);

  dirNames.forEach((value) => {
    const dirInfo = dir[value];
    if (dirInfo.subDirectories.length === 0) {
      totalSizeFolders.push(dirInfo.directorySize);
    } else {

      let totalSiz = dirInfo.directorySize;

      dirInfo.subDirectories.forEach((value) => {
        totalSiz = totalSiz + dir[value].directorySize
      });
      totalSizeFolders.push(totalSiz);
    }
  });
  return totalSizeFolders;
};
export const daySeven = () => {
  console.log(parseData(readFile(file)));
}


