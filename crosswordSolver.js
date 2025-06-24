function crosswordSolver(emptyPuzzle, words) {
    if (typeof emptyPuzzle !== 'string') {
        console.log('Error');
        return;
    }

    let i = 0; j = i + 1;
    let validity = true;

    while (i < words.length && j < words.length) {
        if (words[i] !== words[j]) {
            j++
        } else {
            validity = false;
            break
        }
        if (i === words.length - 1) {
            i++
        }
    }

    if (!validity) {
        console.log('Error');
        return
    }

    if (words.length < 3 || !/^[.\n012]+$/.test(emptyPuzzle) || !Array.isArray(words)) {
        console.log('Error');
        return;
    }

    let foundInvalidWord = false;

    for (let i = 0; i < words.length; i++) {
        if (typeof words[i] !== "string") {
            foundInvalidWord = true;
            break;
        }
    }

    if (foundInvalidWord) {
        console.log("Error");
        return;
    }


    words.sort((a, b) => b.length - a.length);
    const shortest = words[words.length - 1].length;
    const wordStarts = [];
    let tag = 0;

    const grid = emptyPuzzle.split('\n').map(line => line.split(''));
    const height = grid.length;
    const width = grid[0].length;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === '2') {
                tag += 2;
            } else if (grid[i][j] === '1') {
                tag += 1;
            }
            if (grid[i][j] === '1' || grid[i][j] === '2') {
                if (j === 0 || grid[i][j - 1] === '0' || grid[i][j - 1] === '.') {
                    let k = j;
                    while (k < width && (grid[i][k] === '0' || grid[i][k] === '1' || grid[i][k] === '2')) {
                        k++;
                    }
                    if (k - j >= shortest) {
                        wordStarts.push({ row: i, col: j, direction: 'horizontal' });
                    }
                }
                if (i === 0 || grid[i - 1][j] === '0' || grid[i - 1][j] === '.') {
                    let m = i;
                    while (m < height && (grid[m][j] === '0' || grid[m][j] === '1' || grid[m][j] === '2')) {
                        m++;
                    }
                    if (m - i >= shortest) {
                        wordStarts.push({ row: i, col: j, direction: 'vertical' });
                    }
                }
            }
        }
    }

    if (tag !== words.length) {
        console.log('Error');
        return;
    }

    function solve(index) {

        if (index === words.length) {
            return true;
        }


        const word = words[index];
        for (const start of wordStarts) {
            if (canPlace(word, start)) {
                place(word, start);

                if (solve(index + 1)) {
                    return true;
                }
                remove(word, start);
            }
        }

        return false;
    }

    function canPlace(word, start) {
        let { row, col, direction } = start;
        for (let i = 0; i < word.length; i++) {
            if (row >= height || col >= width) return false;
            if (grid[row][col] !== '0' && grid[row][col] !== '1' && grid[row][col] !== '2' && grid[row][col] !== word[i]) {
                return false;
            }

            if (direction === 'horizontal') {
                col++
            } else {
                row++
            }

        }
        return true;
    }

    function place(word, start) {
        let { row, col, direction } = start;
        for (let i = 0; i < word.length; i++) {
            grid[row][col] = word[i];
            direction === 'horizontal' ? col++ : row++;
        }
    }

    function remove(word, start) {
        let { row, col, direction } = start;
        for (let i = 0; i < word.length; i++) {
            grid[row][col] = '0';

            if (direction === 'horizontal') {
                col++
            } else {
                row++
            }
        }
    }

    if (solve(0)) {
        console.log(grid.map(row => row.join('')).join('\n'));
    } else {
        console.log('Error');
    }
}
const puzzle = '2001\n0..0\n1000\n0..0\n'
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words);
