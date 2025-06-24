export function canPlace(word, start, grid) {
  const { row, col, direction } = start;
  const height = grid.length;
  const width = grid[0].length;
  let r = row, c = col;
  for (let i = 0; i < word.length; i++) {
    if (r >= height || c >= width) return false;
    const cell = grid[r][c];
    if (!['0', '1', '2', word[i]].includes(cell)) return false;
    direction === 'horizontal' ? c++ : r++;
  }
  return true;
}