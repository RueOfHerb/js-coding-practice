// Shared test infrastructure: an independent reference implementation plus
// a seeded random-intervals generator, so both solution.js and
// solution.optimal.js can be checked against the same cases without
// duplicating this logic.

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

function cloneIntervals(intervals) {
  return intervals.map((iv) => iv.slice());
}

// Sorts a copy by [start, end] so two merge results can be compared
// regardless of the order an implementation happens to emit them in.
function normalize(intervals) {
  return cloneIntervals(intervals).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function generateRandomInterval(rng, maxCoord) {
  const a = randomInt(rng, 0, maxCoord);
  const b = randomInt(rng, 0, maxCoord);
  return a <= b ? [a, b] : [b, a];
}

function generateRandomIntervals(rng, maxCount, maxCoord) {
  const count = randomInt(rng, 0, maxCount);
  return Array.from({ length: count }, () => generateRandomInterval(rng, maxCoord));
}

// Reference implementation: classic sort-by-start + linear scan, written
// independently of whatever solution.js / solution.optimal.js do.
function mergeReference(intervals) {
  if (intervals.length === 0) return [];
  const sorted = cloneIntervals(intervals).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const result = [sorted[0].slice()];
  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }
  return result;
}

// Small maxCoord keeps overlap likely, so most random cases actually
// exercise merging rather than mostly producing disjoint intervals.
function generateRandomCases(seed, numCases, maxCount = 10, maxCoord = 20) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    cases.push([generateRandomIntervals(rng, maxCount, maxCoord)]);
  }
  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  cloneIntervals,
  normalize,
  mergeReference,
  generateRandomCases,
};
