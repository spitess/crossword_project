import { validator } from "./helpers/params_validator.js";
const crosswordSolver = (puzzle, words) => {
  if (!validator(puzzle, words)) {
    return "Error";
  }
  return 1;
};

const puzzle = "2001\n0..0\n2000\n0..0";
const words = ["casa", "alan", "ciao", "anta", "anhta"];
console.log(crosswordSolver(puzzle, words));
