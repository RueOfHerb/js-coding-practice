// Shared test infrastructure: an independent reference implementation plus
// a seeded random-grid generator, so both solution.js and solution.optimal.js
// can be checked against the same cases without duplicating this logic.

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

// Reference implementation: DFS backtracking on a deep copy of the board
// using an in-place sentinel mark, independently written from whatever
// solution.js / solution.optimal.js do. Never mutates the caller's board.
function existReference(board, word) {
  if (!board || board.length === 0 || board[0].length === 0) {
    return word.length === 0;
  }

  const working = cloneBoard(board);
  const rows = working.length;
  const cols = working[0].length;
  const SEEN = '*';

  function search(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (working[r][c] !== word[index]) return false;

    const original = working[r][c];
    working[r][c] = SEEN;

    const result =
      search(r - 1, c, index + 1) ||
      search(r + 1, c, index + 1) ||
      search(r, c - 1, index + 1) ||
      search(r, c + 1, index + 1);

    working[r][c] = original;
    return result;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (search(r, c, 0)) return true;
    }
  }

  return false;
}

function generateRandomGrid(rng, maxDim, alphabet) {
  const rows = randomInt(rng, 1, maxDim);
  const cols = randomInt(rng, 1, maxDim);
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(alphabet[randomInt(rng, 0, alphabet.length - 1)]);
    }
    grid.push(row);
  }
  return grid;
}

// Traces a real random walk (no cell reused) through the grid and returns
// the word it spells out, guaranteeing the word is findable in this grid.
function extractRandomPath(rng, grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const startR = randomInt(rng, 0, rows - 1);
  const startC = randomInt(rng, 0, cols - 1);
  const length = randomInt(rng, 1, Math.min(rows * cols, 6));

  const visited = grid.map((row) => row.map(() => false));
  let r = startR;
  let c = startC;
  visited[r][c] = true;
  let word = grid[r][c];

  for (let step = 1; step < length; step++) {
    const neighbors = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]);

    if (neighbors.length === 0) break;

    const [nr, nc] = neighbors[randomInt(rng, 0, neighbors.length - 1)];
    visited[nr][nc] = true;
    word += grid[nr][nc];
    r = nr;
    c = nc;
  }

  return word;
}

function randomWord(rng, alphabet, minLen, maxLen) {
  const length = randomInt(rng, minLen, maxLen);
  let word = '';
  for (let i = 0; i < length; i++) {
    word += alphabet[randomInt(rng, 0, alphabet.length - 1)];
  }
  return word;
}

// Generates [board, word] cases against a tiny alphabet ("ABC") to force
// lots of overlap and false starts during search. Half the time the word
// is traced from a real path through the grid (guaranteed findable), and
// half the time it's a fully random word of letters from the same
// alphabet (which may or may not be findable), similar in spirit to how
// problem 1's testUtils biases k towards a real subarray sum half the time.
function generateRandomCases(seed, numCases, maxDim = 4) {
  const rng = mulberry32(seed);
  const alphabet = 'ABC';
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const grid = generateRandomGrid(rng, maxDim, alphabet);
    let word;
    if (rng() < 0.5) {
      word = extractRandomPath(rng, grid);
    } else {
      word = randomWord(rng, alphabet, 1, 6);
    }
    cases.push([grid, word]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  cloneBoard,
  existReference,
  generateRandomGrid,
  extractRandomPath,
  randomWord,
  generateRandomCases,
};
