export function remove(word, start, grid) {
  let { row, col, direction } = start;
  for (let i = 0; i < word.length; i++) {
    grid[row][col] = '0';
    direction === 'horizontal' ? col++ : row++;
  }
}
