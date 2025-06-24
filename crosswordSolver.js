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
  console.log(output);
}

const puzzle = "1001\n0..0\n1001\n0..0";
const words = ["casa", "alan", "ciao", "anta"];
crosswordSolver(puzzle, words);
