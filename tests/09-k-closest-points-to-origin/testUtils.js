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

function distSq([x, y]) {
  return x * x + y * y;
}

// Independent reference implementation: sort every point by squared
// distance to the origin and take the first k. Written independently of
// ANSWER-KEY (no quickselect, no partitioning) so it's a trustworthy
// oracle. When distances tie, this returns *a* correct answer, but not
// necessarily the only correct one - that's why randomized tests below
// validate the *property* of being a k-closest selection (see
// isValidKClosestSelection) rather than diffing against this directly.
function referenceKClosest(points, k) {
  return [...points].sort((a, b) => distSq(a) - distSq(b)).slice(0, k);
}

// Checks that `result` is a valid answer for "the k closest points to the
// origin out of `points`", tolerating any tie-breaking choice.
//
// A result is valid when:
//   1. It has exactly k points.
//   2. It's a sub-multiset of the original points (respecting duplicate
//      point values - can't return a point more times than it appeared).
//   3. No returned point is farther than the k-th smallest distance
//      among all input points (the "threshold").
//   4. Every input point strictly closer than the threshold is present in
//      the result (points strictly closer than the threshold are never
//      optional - only ties at the threshold distance are).
function isValidKClosestSelection(points, k, result) {
  if (!Array.isArray(result) || result.length !== k) return false;

  const keyOf = ([x, y]) => `${x},${y}`;

  const originalCounts = new Map();
  for (const p of points) {
    const key = keyOf(p);
    originalCounts.set(key, (originalCounts.get(key) || 0) + 1);
  }

  const resultCounts = new Map();
  for (const p of result) {
    const key = keyOf(p);
    const used = (resultCounts.get(key) || 0) + 1;
    if (used > (originalCounts.get(key) || 0)) return false; // not a valid sub-multiset
    resultCounts.set(key, used);
  }

  const sortedDist = points.map(distSq).sort((a, b) => a - b);
  const threshold = sortedDist[k - 1];

  for (const p of result) {
    if (distSq(p) > threshold) return false;
  }

  const mandatoryCounts = new Map();
  for (const p of points) {
    if (distSq(p) < threshold) {
      const key = keyOf(p);
      mandatoryCounts.set(key, (mandatoryCounts.get(key) || 0) + 1);
    }
  }

  for (const [key, count] of mandatoryCounts.entries()) {
    if ((resultCounts.get(key) || 0) < count) return false;
  }

  return true;
}

function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 1, 20);
    const points = [];
    for (let j = 0; j < length; j++) {
      // Occasionally duplicate an already-generated point so ties (both in
      // point value and in distance) get exercised.
      if (points.length > 0 && rng() < 0.25) {
        points.push([...points[randomInt(rng, 0, points.length - 1)]]);
      } else {
        points.push([randomInt(rng, -10, 10), randomInt(rng, -10, 10)]);
      }
    }

    const k = randomInt(rng, 1, length);
    cases.push([points, k]);
  }
  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  referenceKClosest,
  isValidKClosestSelection,
  generateRandomCases,
};
