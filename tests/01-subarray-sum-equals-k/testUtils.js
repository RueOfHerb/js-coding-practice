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

function bruteForceSubarraySum(nums, k) {
  let count = 0;
  for (let start = 0; start < nums.length; start++) {
    let sum = 0;
    for (let end = start; end < nums.length; end++) {
      sum += nums[end];
      if (sum === k) count++;
    }
  }
  return count;
}

function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 0, 25);
    const nums = Array.from({ length }, () => randomInt(rng, -15, 15));

    // Bias k towards an actual subarray sum half the time, so a
    // meaningful fraction of trials have at least one match instead of
    // mostly exercising the "no match" path.
    let k;
    if (length > 0 && rng() < 0.5) {
      const start = randomInt(rng, 0, length - 1);
      const end = randomInt(rng, start, length - 1);
      k = nums.slice(start, end + 1).reduce((a, b) => a + b, 0);
    } else {
      k = randomInt(rng, -20, 20);
    }

    cases.push([nums, k]);
  }
  return cases;
}

module.exports = { mulberry32, randomInt, bruteForceSubarraySum, generateRandomCases };
