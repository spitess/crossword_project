export function horizontal(row, word, index) {
    let count = 0
    let match = ''
    for (let i = index; i < row.length; i++) {
        if (row[i] === '.') break
        if (!isNaN(row[i])) {
            count++
        } else {
            if (row[i] !== word[count] && word[count] !== undefined) break
            match += row[i]
            count++
        }
    }
    if (match === word) return false
    return count === word.length
}

export function vertical(grid, word, index, row) {
    let count = 0
    let match = ''
    for (let i = row; i < grid.length; i++) {
        if (grid[i][index] === '.') break
        if (!isNaN(grid[i][index])) {
            count++
        } else {
            if (grid[i][index] !== word[count] && word[count] !== undefined) break
            match += grid[i][index]
            count++
        }
    }
    if (match === word) return false
    return count === word.length
}