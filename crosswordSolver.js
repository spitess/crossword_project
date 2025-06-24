import { validateParams } from "./helpers/paramsValidator.js";
import { parseGrid } from "./helpers/Parser.js";
import { solve } from "./helpers/Solver.js";

function crosswordSolver(emptyPuzzle, words) {
  if (!validateParams(emptyPuzzle, words)) return console.log("Error");

  const grid = parseGrid(puzzle);
  const solved = grid.map((row) => [...row]);
  const revers = grid.map((row) => [...row]);

  const success = solve(grid, solved, words, 0);

  solve(grid, revers, words.reverse(), 0);

  if (solved.includes("0")) {
    console.log("Error");
    return;
  }

  if (!success) {
    console.log("Error");
    return;
  }

  const output = solved.map((row) => row.join("")).join("\n");
  const reverse = revers.map((row) => row.join("")).join("\n");

  if (output !== reverse) {
    console.log("Error");
    return;
  }
}

const puzzle = "2001\n0..0\n1000\n0..0";
const words = ["casa", "alan", "ciao", "anta"];

let NewPuzzle = puzzle.split("\n");
export const first = puzzle.split("\n");
export const CountPuzzle = NewPuzzle.map((row) => row.split("").map((_) => 0));

crosswordSolver(puzzle, words);
