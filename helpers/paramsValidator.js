export function validateParams(puzzle, words) {
  if (!validePuzzle(puzzle, words) || !valideWords(words)) {
    return false;
  } else {
    return true;
  }
}

export const validePuzzle = (puzzle, words) => {
  let regx = /\d/g;
  let arr = [];
  let variable = puzzle.match(regx) || [];
  arr.push(...variable);
  let count = 0;
  for (let l = 0; l < arr.length; l++) {
    count += Number(arr[l]);
  }
  if (count != words.length) return false;

  const isValid = /^[012.\n]*[^\n]$/.test(puzzle);
  if (!isValid) return false;
  const rows = puzzle.split("\n");
  const width = rows[0].length;
  if (!rows.every((r) => r.length === width)) return false;
  if (puzzle == "") return false;
  return true;
};

export const valideWords = (words) => {
  if (!Array.isArray(words) || words.length < 1) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    if (typeof words[i] !== "string") return false;
  }
  let set = new Set(words);
  return set.size == words.length;
};
