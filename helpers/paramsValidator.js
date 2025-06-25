export function validateParams(puzzle, words) {
  if (!validePuzzle(puzzle, words) || !valideWords(words)) {
    return false;
  } else {
    return true;
  }
}

export const validePuzzle = (puzzle, words) => {
  // const puzzleWithoutNewlines = puzzle.replace(/\n/g, "");
  const rows = puzzle.split("\n");
  const width = rows[0].length;
  const height = rows.length;
  // for (let i = 0; i < puzzleWithoutNewlines.length; i++) {
  //   const char = puzzleWithoutNewlines[i];
  //   const left = i % width === 0 ? "." : puzzleWithoutNewlines[i - 1];
  //   if (char === "2") {
  //     if (left !== ".") return false;
  //   } else if (char === "1") {
  //     if (left !== ".") return false;
  //   }
  // }

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
    let arrr = words.sort((a, b) => a.length - b.length);
  if (
    width != arrr[arrr.length - 1].length ||
    height != arrr[arrr.length - 1].length
  ) {
    return false;
  }

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
