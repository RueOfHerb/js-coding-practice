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

// Independent reference implementation, deliberately not written the same
// way as either ANSWER-KEY solution: split into separate sorted arrays of
// start times and end times, then sweep with two pointers. Walking starts
// in order and only "releasing" a room when an end time is reached before
// the next start keeps a running count of rooms in use; the answer is the
// peak of that count. A start time equal to an end time is treated as the
// room freeing up first (strict "<" comparison below), matching the
// classic LeetCode "Meeting Rooms II" touching-boundary semantics.
function referenceMinMeetingRooms(intervals) {
  const n = intervals.length;
  if (n === 0) return 0;

  const starts = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);

  let roomsInUse = 0;
  let peakRooms = 0;
  let startPtr = 0;
  let endPtr = 0;

  while (startPtr < n) {
    if (starts[startPtr] < ends[endPtr]) {
      roomsInUse++;
      startPtr++;
      peakRooms = Math.max(peakRooms, roomsInUse);
    } else {
      roomsInUse--;
      endPtr++;
    }
  }

  return peakRooms;
}

function shuffle(rng, array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Non-overlapping meetings with a strictly positive gap between each pair,
// so they never overlap and never even touch. Minimum rooms should be 1
// (for a non-empty set) since every meeting can reuse the same room.
function generateNonOverlapping(rng, count) {
  const intervals = [];
  let cursor = randomInt(rng, 0, 10);

  for (let i = 0; i < count; i++) {
    const start = cursor;
    const end = start + randomInt(rng, 1, 10);
    intervals.push([start, end]);
    cursor = end + randomInt(rng, 1, 5); // strictly positive gap: no touching
  }

  return intervals;
}

// Meetings that all strictly contain a common point in time, so every pair
// overlaps. Minimum rooms should equal the number of meetings.
function generateAllOverlapping(rng, count) {
  const intervals = [];
  const commonPoint = randomInt(rng, 10, 50);

  for (let i = 0; i < count; i++) {
    const start = commonPoint - randomInt(rng, 1, 10);
    const end = commonPoint + randomInt(rng, 1, 10);
    intervals.push([start, end]);
  }

  return intervals;
}

// A chain of meetings where each one starts exactly when the previous one
// ends. Touching is not overlapping, so minimum rooms should be 1.
function generateTouchingChain(rng, count) {
  const intervals = [];
  let cursor = randomInt(rng, 0, 10);

  for (let i = 0; i < count; i++) {
    const start = cursor;
    const end = start + randomInt(rng, 1, 10);
    intervals.push([start, end]);
    cursor = end; // next meeting touches this one's end exactly
  }

  return intervals;
}

// Fully random intervals with no particular structure, for general coverage.
function generateRandomIntervals(rng, count) {
  const intervals = [];

  for (let i = 0; i < count; i++) {
    const start = randomInt(rng, 0, 50);
    const end = start + randomInt(rng, 1, 20);
    intervals.push([start, end]);
  }

  return intervals;
}

// Generates a mix of case categories: empty input, no overlaps at all,
// everything mutually overlapping, a chain of exactly-touching meetings,
// and fully random intervals. Every non-empty case is shuffled so the
// solution under test cannot assume chronologically-sorted input.
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const roll = rng();
    let intervals;

    if (roll < 0.1) {
      intervals = [];
    } else {
      const count = randomInt(rng, 1, 10);

      if (roll < 0.3) {
        intervals = generateNonOverlapping(rng, count);
      } else if (roll < 0.5) {
        intervals = generateAllOverlapping(rng, count);
      } else if (roll < 0.7) {
        intervals = generateTouchingChain(rng, count);
      } else {
        intervals = generateRandomIntervals(rng, count);
      }

      intervals = shuffle(rng, intervals);
    }

    cases.push([intervals]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  referenceMinMeetingRooms,
  generateRandomCases,
};
