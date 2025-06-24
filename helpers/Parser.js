export function parseGrid(emptyPuzzle, words) {
  const grid = emptyPuzzle.split('\n').map(line => line.split(''));
  const height = grid.length;
  const width = grid[0].length;
  const shortest = words[words.length - 1].length;
  const wordStarts = [];
  let tag = 0;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === '2') tag += 2;
      else if (grid[i][j] === '1') tag += 1;

      if (grid[i][j] === '1' || grid[i][j] === '2') {
        if (j === 0 || grid[i][j - 1] === '0' || grid[i][j - 1] === '.') {
          let k = j;
          while (k < width && ['0', '1', '2'].includes(grid[i][k])) k++;
          if (k - j >= shortest) wordStarts.push({ row: i, col: j, direction: 'horizontal' });
        }
        if (i === 0 || grid[i - 1][j] === '0' || grid[i - 1][j] === '.') {
          let m = i;
          while (m < height && ['0', '1', '2'].includes(grid[m][j])) m++;
          if (m - i >= shortest) wordStarts.push({ row: i, col: j, direction: 'vertical' });
        }
      }
    }
  }
  return { grid, wordStarts, tag, shortest };
}