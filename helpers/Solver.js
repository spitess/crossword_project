import { canPlace } from "./canPlace.js";
import { place } from "./Place.js";
import { remove } from "./Remove.js";

export function solve(grid, wordStarts, words, index) {
  if (index === words.length) return true;

  const word = words[index];
  for (const start of wordStarts) {
    if (canPlace(word, start, grid)) {
      place(word, start, grid);
      if (solve(grid, wordStarts, words, index + 1)) return true;
      remove(word, start, grid);
    }
  }
  return false;
}
