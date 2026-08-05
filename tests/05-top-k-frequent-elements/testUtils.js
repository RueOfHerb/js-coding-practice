// Shared test infrastructure for this problem.
//
// Note: unlike the other problems in this repo, "top k frequent" doesn't
// have a single correct output to compare against. When multiple elements
// tie on frequency at the k-th boundary, any of them is a valid answer
// (e.g. nums=[1,2,3,4], k=2 -- every element has frequency 1, so any two
// of them are acceptable). So instead of a reference implementation, this
// exports a *validator*: given (nums, k, result), it checks the
// invariants any correct answer must satisfy, and returns a list of
// human-readable violations (empty = valid).

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

function validateTopKFrequent(nums, k, result) {
  const violations = [];
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const expectedLength = Math.min(k, freq.size);
  if (result.length !== expectedLength) {
    violations.push(`expected length ${expectedLength}, got ${result.length}`);
  }

  const seen = new Set();
  for (const n of result) {
    if (seen.has(n)) violations.push(`duplicate element ${n} in result`);
    seen.add(n);
    if (!freq.has(n)) violations.push(`element ${n} does not appear in nums`);
  }

  if (violations.length === 0 && result.length > 0) {
    const minResultFreq = Math.min(...result.map((n) => freq.get(n)));
    for (const [num, count] of freq.entries()) {
      if (!seen.has(num) && count > minResultFreq) {
        violations.push(
          `excluded element ${num} has frequency ${count}, greater than min included frequency ${minResultFreq}`
        );
      }
    }
  }

  return violations;
}

// Small maxDistinct relative to length forces repeats, so the generated
// arrays actually have interesting frequency distributions.
function generateRandomArray(rng, maxLength, maxDistinct) {
  const length = randomInt(rng, 1, maxLength);
  const distinctValues = randomInt(rng, 1, maxDistinct);
  return Array.from({ length }, () => randomInt(rng, -distinctValues, distinctValues));
}

function generateRandomCases(seed, numCases, maxLength = 20, maxDistinct = 6) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    const nums = generateRandomArray(rng, maxLength, maxDistinct);
    const distinctCount = new Set(nums).size;
    const k = randomInt(rng, 1, distinctCount);
    cases.push([nums, k]);
  }
  return cases;
}

module.exports = { mulberry32, randomInt, validateTopKFrequent, generateRandomCases };
