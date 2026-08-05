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

function cloneGrid(grid) {
  return grid.map((row) => row.slice());
}

function generateRandomGrid(rng, maxDim, landProbability) {
  const rows = randomInt(rng, 1, maxDim);
  const cols = randomInt(rng, 1, maxDim);
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(rng() < landProbability ? '1' : '0');
    }
    grid.push(row);
  }
  return grid;
}

// Reference implementation: plain BFS flood fill on a visited[][] array
// (never mutates the input grid), independently written from whatever
// solution.js / solution.optimal.js do.
function numIslandsReference(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  const visited = grid.map((row) => row.map(() => false));
  let count = 0;

  function bfs(startR, startC) {
    const queue = [[startR, startC]];
    visited[startR][startC] = true;
    while (queue.length) {
      const [r, c] = queue.shift();
      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];
      for (const [nr, nc] of neighbors) {
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !visited[nr][nc] &&
          grid[nr][nc] === '1'
        ) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1' && !visited[r][c]) {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
}

function generateRandomCases(seed, numCases, maxDim = 6) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    // Vary land density per case for more diverse island shapes/counts.
    const density = Math.min(0.85, Math.max(0.15, 0.5 + (rng() - 0.5) * 0.6));
    cases.push([generateRandomGrid(rng, maxDim, density)]);
  }
  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  cloneGrid,
  generateRandomGrid,
  numIslandsReference,
  generateRandomCases,
};
