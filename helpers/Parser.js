export const parseGrid = (puzzle) => {
  const grid = puzzle.split("\n").map((row) => row.split(""));
  return grid;
};
