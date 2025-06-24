import { validateParams } from "./helpers/paramsValidator.js";
import { parseGrid } from "./helpers/Parser.js";
import { solve } from "./helpers/Solver.js";

function crosswordSolver(emptyPuzzle, words) {
  if (!validateParams(emptyPuzzle, words)) return console.log("Error");

  const { grid, wordStarts, tag } = parseGrid(emptyPuzzle, words);

  if (tag !== words.length) return console.log("Error");

  words.sort((a, b) => b.length - a.length);

  if (solve(grid, wordStarts, words, 0)) {
    console.log(grid.map((row) => row.join("")).join("\n"));
  } else {
    console.log("Error");
  }
}

const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];
crosswordSolver(puzzle, words);
