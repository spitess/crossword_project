export function place(word, start, grid) {
  let { row, col, direction } = start;
  for (let i = 0; i < word.length; i++) {
    grid[row][col] = word[i];
    direction === 'horizontal' ? col++ : row++;
  }
}
