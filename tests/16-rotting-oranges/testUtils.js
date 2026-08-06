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

// Reference implementation: minute-by-minute simulation, independently
// written from the multi-source BFS used in ANSWER-KEY/solution.optimal.js.
// Operates on a deep copy of the input so it never mutates the caller's grid.
function orangesRottingReference(inputGrid) {
  const grid = cloneGrid(inputGrid);
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;

  const countFresh = () => {
    let fresh = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) fresh++;
      }
    }
    return fresh;
  };

  let minutes = 0;

  while (countFresh() > 0) {
    const toRot = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== 1) continue;
        const neighbors = [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ];
        const adjacentToRotten = neighbors.some(
          ([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 2
        );
        if (adjacentToRotten) toRot.push([r, c]);
      }
    }

    if (toRot.length === 0) {
      // Fresh oranges remain but none can rot this minute: unreachable.
      return -1;
    }

    for (const [r, c] of toRot) {
      grid[r][c] = 2;
    }
    minutes++;
  }

  return minutes;
}

// Generates a random m x n grid of 0 (empty), 1 (fresh), 2 (rotten), biasing
// the mix of cell values per-case so the overall suite covers: no fresh
// oranges, fresh oranges that can never be reached, grids with no oranges at
// all, and grids with a healthy mix of all three values.
function generateRandomGrid(rng, maxDim) {
  const rows = randomInt(rng, 1, maxDim);
  const cols = randomInt(rng, 1, maxDim);

  // Weighted pool of value distributions to pick from per grid, so repeated
  // calls produce a good variety of shapes across a batch of random cases.
  const mode = rng();
  let weights;
  if (mode < 0.15) {
    weights = [0.7, 0, 0.3]; // no fresh oranges at all -> answer should be 0
  } else if (mode < 0.3) {
    weights = [0.9, 0.1, 0]; // fresh oranges but zero rotten -> likely -1
  } else if (mode < 0.45) {
    weights = [1, 0, 0]; // no oranges at all -> answer should be 0
  } else {
    weights = [0.4, 0.35, 0.25]; // general mix
  }

  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const roll = rng();
      if (roll < weights[0]) {
        row.push(0);
      } else if (roll < weights[0] + weights[1]) {
        row.push(1);
      } else {
        row.push(2);
      }
    }
    grid.push(row);
  }
  return grid;
}

function generateRandomCases(seed, numCases, maxDim = 6) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    cases.push([generateRandomGrid(rng, maxDim)]);
  }
  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  cloneGrid,
  generateRandomGrid,
  orangesRottingReference,
  generateRandomCases,
};
