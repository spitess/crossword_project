export const validator = (puzzle, words) => {
  if (!Array.isArray(words) || !checDuplicate(words) || puzzle == "") {
    return false;
  }
  return true;
};
export const checDuplicate = (words) => {
  let set = new Set(words);  
  return set.size == words.length;
};
