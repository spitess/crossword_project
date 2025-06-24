/**
 * دالة رئيسية لحل لغز الكلمات المتقاطعة
 * @param {string} emptyPuzzle - سلسلة تمثل اللغز الفارغ
 * @param {string[]} words - مصفوفة الكلمات
 */
function crosswordSolver(emptyPuzzle, words) {
  // 1. المحلل: تحليل اللغز إلى شبكة وتحديد الفتحات
  const parseResult = parsePuzzle(emptyPuzzle);
  if (!parseResult.valid) {
    console.log("Error");
    return;
  }
  const { grid, slots } = parseResult;

  // 2. مدقق المدخلات: التحقق من صحة المدخلات
  if (!validateInput(slots, words)) {
    console.log("Error");
    return;
  }

  // 3. الحلّال: محاولة حل اللغز باستخدام التراجع
  const solutions = solvePuzzle(grid, slots, words);

  // 4. مدقق الحل: التحقق من أن الحل وحيد
  if (solutions.length !== 1) {
    console.log("Error");
    return;
  }

  // 5. مُنَسّق الإخراج: طباعة الحل
  console.log(formatOutput(solutions[0]));
}

/**
 * المحلل: تحليل سلسلة اللغز إلى شبكة وتحديد الفتحات
 * @param {string} puzzle - سلسلة اللغز
 * @returns {Object} - الشبكة والفتحات أو valid: false
 */
function parsePuzzle(puzzle) {
  // تقسيم السلسلة إلى صفوف
  const rows = puzzle.split("\n").filter(row => row.length > 0);
  if (rows.length === 0) return { valid: false };

  // التحقق من أن اللغز مستطيل
  const width = rows[0].length;
  if (!rows.every(row => row.length === width)) return { valid: false };

  // إنشاء الشبكة
  const grid = rows.map(row => row.split(""));

  // التحقق من الأحرف الصالحة
  if (!/^[0-9.\n]+$/.test(puzzle)) return { valid: false };

  // تحديد الفتحات
  const slots = [];
  const height = grid.length;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const num = parseInt(grid[r][c]);
      if (isNaN(num) || num === 0) continue;

      let slotsAdded = 0;

      // فتحة أفقية
      if (c === 0 || grid[r][c - 1] === "." || grid[r][c - 1] === "0") {
        let k = c;
        let cells = [];
        while (k < width && grid[r][k] !== ".") {
          cells.push([r, k]);
          k++;
        }
        const length = k - c;
        if (length >= 2 && slotsAdded < num) {
          slots.push({
            row: r,
            col: c,
            direction: "horizontal",
            length,
            cells
          });
          slotsAdded++;
        }
      }

      // فتحة رأسية
      if (r === 0 || grid[r - 1][c] === "." || grid[r - 1][c] === "0") {
        let m = r;
        let cells = [];
        while (m < height && grid[m][c] !== ".") {
          cells.push([m, c]);
          m++;
        }
        const length = m - r;
        if (length >= 2 && slotsAdded < num) {
          slots.push({
            row: r,
            col: c,
            direction: "vertical",
            length,
            cells
          });
          slotsAdded++;
        }
      }

      // التحقق من أن عدد الفتحات يتطابق مع الرقم
      if (slotsAdded < num) return { valid: false };
    }
  }

  return { valid: true, grid, slots };
}

/**
 * مدقق المدخلات: التحقق من صحة الكلمات والفتحات
 * @param {Object[]} slots - قائمة الفتحات
 * @param {string[]} words - قائمة الكلمات
 * @returns {boolean} - صحة المدخلات
 */
function validateInput(slots, words) {
  // التحقق من أن الكلمات مصفوفة وغير فارغة
  if (!Array.isArray(words) || words.length < 1) return false;

  // التحقق من أن الكلمات سلاسل نصية ولا تتكرر
  if (words.some(word => typeof word !== "string" || !/^[a-zA-Z]+$/.test(word))) return false;
  if (new Set(words).size !== words.length) return false;

  // التحقق من تطابق عدد الفتحات مع عدد الكلمات
  if (slots.length !== words.length) return false;

  // التحقق من تطابق أطوال الفتحات مع أطوال الكلمات
  const slotLengths = slots.map(slot => slot.length).sort((a, b) => a - b);
  const wordLengths = words.map(word => word.length).sort((a, b) => a - b);
  return slotLengths.every((len, i) => len === wordLengths[i]);
}

/**
 * الحلّال: حل اللغز باستخدام التراجع
 * @param {string[][]} grid - الشبكة
 * @param {Object[]} slots - الفتحات
 * @param {string[]} words - الكلمات
 * @returns {string[][][]} - قائمة الحلول
 */
function solvePuzzle(grid, slots, words) {
  const solutions = [];
  const usedWords = new Set();
  const tempGrid = grid.map(row => row.slice());

  function backtrack(index) {
    if (index === slots.length) {
      solutions.push(tempGrid.map(row => row.slice()));
      return solutions.length <= 1; // التوقف إذا وجدنا أكثر من حل
    }

    const slot = slots[index];
    for (const word of words) {
      if (usedWords.has(word)) continue;

      if (canPlace(word, slot, tempGrid)) {
        place(word, slot, tempGrid);
        usedWords.add(word);

        if (!backtrack(index + 1)) return false;

        remove(word, slot, tempGrid);
        usedWords.delete(word);
      }
    }

    return true;
  }

  backtrack(0);
  return solutions;
}

/**
 * التحقق من إمكانية وضع كلمة في فتحة
 * @param {string} word - الكلمة
 * @param {Object} start - الفتحة
 * @param {string[][]} grid - الشبكة
 * @returns {boolean} - إمكانية الوضع
 */
function canPlace(word, start, grid) {
  const { row, col, direction, length, cells } = start;
  if (word.length !== length) return false;

  for (let i = 0; i < word.length; i++) {
    const [r, c] = cells[i];
    const current = grid[r][c];
    if (current === ".") return false;
    if (!isNaN(parseInt(current))) continue;
    if (current !== word[i]) return false;
  }
  return true;
}

/**
 * وضع كلمة في فتحة
 * @param {string} word - الكلمة
 * @param {Object} start - الفتحة
 * @param {string[][]} grid - الشبكة
 */
function place(word, start, grid) {
  const { cells } = start;
  for (let i = 0; i < word.length; i++) {
    const [r, c] = cells[i];
    if (!isNaN(parseInt(grid[r][c]))) continue;
    grid[r][c] = word[i];
  }
}

/**
 * إزالة كلمة من فتحة
 * @param {string} word - الكلمة
 * @param {Object} start - الفتحة
 * @param {string[][]} grid - الشبكة
 */
function remove(word, start, grid) {
  const { cells } = start;
  for (let i = 0; i < word.length; i++) {
    const [r, c] = cells[i];
    if (!isNaN(parseInt(grid[r][c])) || grid[r][c] === ".") continue;
    grid[r][c] = "0";
  }
}

/**
 * مُنَسّق الإخراج: تحويل الشبكة إلى سلسلة
 * @param {string[][]} grid - الشبكة المحلولة
 * @returns {string} - السلسلة المُنسقة
 */
function formatOutput(grid) {
  return grid.map(row => row.join("")).join("\n");
}

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words);
