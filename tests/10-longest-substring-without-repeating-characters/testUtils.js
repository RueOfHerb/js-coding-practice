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

// Deliberately-simple reference implementation, written independently of
// the ANSWER-KEY solutions: for every starting index, walk forward adding
// characters to a plain object "seen so far" and stop the moment a repeat
// shows up, tracking the longest run found.
function bruteForceLengthOfLongestSubstring(s) {
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    const seen = {};
    let j = i;

    while (j < s.length && !seen[s[j]]) {
      seen[s[j]] = true;
      j++;
    }

    max = Math.max(max, j - i);
  }

  return max;
}

// Alphabets ranging from tiny (forces lots of repeats) to large/varied
// (punctuation and spaces included), so random cases exercise both ends
// of the "how often do characters repeat" spectrum.
const ALPHABETS = [
  'ab',
  'abc',
  'abcdefghij',
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()',
];

function randomString(rng, alphabet, length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet[randomInt(rng, 0, alphabet.length - 1)];
  }
  return result;
}

// Generates an array of single-element tuples (for use with test.each), so
// each case is [s]. Lengths (including 0, i.e. the empty string) and
// alphabets are both randomized per-case using the seeded rng.
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 0, 30);
    const alphabet = ALPHABETS[randomInt(rng, 0, ALPHABETS.length - 1)];
    cases.push([randomString(rng, alphabet, length)]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  bruteForceLengthOfLongestSubstring,
  generateRandomCases,
};
