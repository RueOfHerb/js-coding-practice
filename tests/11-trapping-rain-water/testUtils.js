// Shared test infrastructure for validating alternative solutions to this
// problem against each other. Not a test file itself (no `test(...)` calls),
// so Jest won't try to run it directly.

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

// Independent reference implementation: precompute the running max to the
// left and right of every index in two passes, then sum the trapped water
// at each index in a third pass. This is deliberately a different shape
// from both the brute-force basic solution (no nested scans) and the
// two-pointer optimal solution (no inward-closing pointers), so it serves
// as a genuinely independent check on both.
function referenceTrap(height) {
  const n = height.length;
  if (n === 0) return 0;

  const leftMax = new Array(n);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  const rightMax = new Array(n);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return total;
}

// Generates a mix of edge-case shapes (empty, single, pair, flat,
// monotonic) and generic random bumpy arrays of non-negative integer
// heights, so the property-based tests exercise a wide variety of
// terrain shapes beyond the hand-picked cases.
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const shape = rng();

    let heights;
    if (shape < 0.1) {
      heights = [];
    } else if (shape < 0.2) {
      heights = [randomInt(rng, 0, 10)];
    } else if (shape < 0.3) {
      heights = [randomInt(rng, 0, 10), randomInt(rng, 0, 10)];
    } else if (shape < 0.4) {
      // flat array of equal heights
      const length = randomInt(rng, 3, 12);
      const value = randomInt(rng, 0, 10);
      heights = new Array(length).fill(value);
    } else if (shape < 0.55) {
      // strictly (non-strictly, to allow plateaus) increasing
      const length = randomInt(rng, 3, 12);
      heights = [];
      let current = randomInt(rng, 0, 5);
      for (let j = 0; j < length; j++) {
        heights.push(current);
        current += randomInt(rng, 0, 4);
      }
    } else if (shape < 0.7) {
      // strictly (non-strictly, to allow plateaus) decreasing
      const length = randomInt(rng, 3, 12);
      heights = [];
      let current = randomInt(rng, 10, 20);
      for (let j = 0; j < length; j++) {
        heights.push(current);
        current -= randomInt(rng, 0, 4);
        current = Math.max(current, 0);
      }
    } else {
      // generic random bumpy terrain
      const length = randomInt(rng, 0, 30);
      heights = Array.from({ length }, () => randomInt(rng, 0, 10));
    }

    cases.push([heights]);
  }

  return cases;
}

module.exports = { mulberry32, randomInt, referenceTrap, generateRandomCases };
