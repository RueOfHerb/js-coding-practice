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

// Independent reference implementation, written without looking at the
// ANSWER-KEY: sort ascending and index from the end of the array.
function referenceFindKthLargest(nums, k) {
  const ascending = [...nums].sort((a, b) => a - b);
  return ascending[ascending.length - k];
}

function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 1, 30);
    const nums = Array.from({ length }, () => randomInt(rng, -50, 50));

    // Bias towards duplicate-heavy arrays some of the time by drawing from
    // a much smaller value range, so the generator also exercises arrays
    // with lots of repeated values.
    if (rng() < 0.3) {
      const small = randomInt(rng, 1, 5);
      for (let j = 0; j < nums.length; j++) {
        nums[j] = randomInt(rng, -small, small);
      }
    }

    const k = randomInt(rng, 1, length);
    cases.push([nums, k]);
  }

  return cases;
}

module.exports = { mulberry32, randomInt, referenceFindKthLargest, generateRandomCases };
