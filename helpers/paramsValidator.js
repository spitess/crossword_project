export function validateParams(puzzle, words) {
    
  if (!validePuzzle(puzzle) || !valideWords(words)) {
    return false;
  } else {
    return true;
  }
}


export const validePuzzle = (puzzle) => {
        console.log(12);

  if (typeof puzzle !== "string") return false;
  const isValid = /^[012.\n]*[012.]$/.test(puzzle);
  if (!isValid) return false;

  const rows = puzzle.split("\n");
  const width = rows[0].length;
  if (!rows.every((r) => r.length === width)) return false;
  if (puzzle == "") return false;
};


export const valideWords = (words) => {
        console.log(12);

  if (!Array.isArray(words) || words.length < 1) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    if (typeof words[i] !== "string") return false;
  }
  let set = new Set(words);
  return set.size == words.length;
};
