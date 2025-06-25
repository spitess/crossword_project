import { validateParams } from "./helpers/paramsValidator.js";
import { parseGrid } from "./helpers/Parser.js";
import { solve } from "./helpers/Solver.js";

function crosswordSolver(puzzleString, wordList) {
  if (!validateParams(puzzleString, wordList)) return console.log("Error");

  const parsedGrid = parseGrid(puzzleString);
  const solutionGrid = parsedGrid.map((row) => [...row]);
  const reversedGrid = parsedGrid.map((row) => [...row]);

  const success = solve(parsedGrid, solutionGrid, wordList, 0);

  solve(parsedGrid, reversedGrid, wordList.reverse(), 0);

  if (solutionGrid.includes("0")) {
    console.log("Error");
    return;
  }

  if (!success) {
    console.log("Error");
    return;
  }

  const output = solutionGrid.map((row) => row.join("")).join("\n");
  const reversedOutput = reversedGrid.map((row) => row.join("")).join("\n");

  if (output !== reversedOutput) {
    console.log("Error");
    return;
  }

  console.log(output);
}

const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta",];

crosswordSolver(puzzle, words);
