import { horizontal, vertical } from "./horizontal_vertical.js";
import { CountPuzzle, first } from "../crosswordSolver.js";

function verifyStarts() {
  for (let i = 0; i < CountPuzzle.length; i++) {
    for (let j = 0; j < CountPuzzle[i].length; j++) {
      const cell = first[i][j];

      if (cell === "1") {
        if (CountPuzzle[i][j] !== 1) return false;
      } else if (cell === "2") {
        if (CountPuzzle[i][j] !== 2) return false;
      } else if (cell === "0") {
        if (CountPuzzle[i][j] !== 0) return false;
      }
    }
  }

  return true;
}
export function solve(grid, solved, words, index) {
  if (index === words.length && !verifyStarts()) {
    return false;
  }
  if (index === words.length && verifyStarts()) {
    return;
  }

  const word = words[index];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "1" || grid[row][col] === "2") {
        if (horizontal(solved[row], word, col)) {
          const backup = [...solved[row]];
          CountPuzzle[row][col]++;

          for (let i = 0; i < word.length; i++) {
            solved[row][col + i] = word[i];
          }
          if (solve(grid, solved, words, index + 1));
          CountPuzzle[row][col]--;

          solved[row] = backup;
        }

        if (vertical(solved, word, col, row)) {
          const backup = [];
          CountPuzzle[row][col]++;

          for (let i = 0; i < word.length; i++) {
            backup.push(solved[row + i][col]);
            solved[row + i][col] = word[i];
          }
          if (solve(grid, solved, words, index + 1));
          CountPuzzle[row][col]--;

          for (let i = 0; i < word.length; i++) {
            solved[row + i][col] = backup[i];
          }
        }
      }
    }
  }

  return false;
}
