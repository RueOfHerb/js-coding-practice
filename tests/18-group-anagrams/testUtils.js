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

// Sorted-character key: identical for all anagrams of one another, and
// only for anagrams of one another, so it can be used as a canonical
// group identity independent of both the ANSWER-KEY implementations and
// whatever key scheme (or lack thereof) the solution under test uses.
function anagramKey(str) {
  return str.split('').sort().join('');
}

// Independent reference implementation: groups strings by anagramKey.
function referenceGroupAnagrams(strs) {
  const groupsByKey = new Map();

  for (const str of strs) {
    const key = anagramKey(str);
    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, []);
    }
    groupsByKey.get(key).push(str);
  }

  return Array.from(groupsByKey.values());
}

// Normalizes a string[][] grouping result into a canonical, order-independent
// form: each group becomes a sorted array of its members, and the groups
// themselves are sorted (by anagramKey of their first member, which is the
// same for every member of a well-formed group) so two groupings that
// partition the same multiset of strings the same way compare equal
// regardless of group order or within-group order.
function normalizeGrouping(groups) {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => {
      const keyA = a.length > 0 ? anagramKey(a[0]) : '';
      const keyB = b.length > 0 ? anagramKey(b[0]) : '';
      if (keyA !== keyB) return keyA < keyB ? -1 : 1;
      // Fallback tiebreaker in the (impossible for valid groupings, but
      // defensive) case of duplicate keys: compare the groups' own content.
      const strA = JSON.stringify(a);
      const strB = JSON.stringify(b);
      return strA < strB ? -1 : strA > strB ? 1 : 0;
    });
}

// Compares two string[][] results to check they represent the same
// partition of the same multiset of strings, regardless of group order or
// within-group order.
function sameGrouping(actual, expected) {
  const normalizedActual = normalizeGrouping(actual);
  const normalizedExpected = normalizeGrouping(expected);
  return JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
}

// Generates random arrays of lowercase strings from a small alphabet and
// short lengths so plenty of anagram collisions occur. Occasionally
// includes the empty string and duplicate strings.
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const alphabet = 'abc';
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 0, 15);
    const strs = [];

    for (let j = 0; j < length; j++) {
      // Occasionally emit the empty string as an element.
      if (rng() < 0.1) {
        strs.push('');
        continue;
      }

      const strLen = randomInt(rng, 1, 5);
      let str = '';
      for (let c = 0; c < strLen; c++) {
        const idx = randomInt(rng, 0, alphabet.length - 1);
        str += alphabet[idx];
      }

      // Occasionally duplicate a previously generated string to exercise
      // multiplicity handling within a group.
      if (strs.length > 0 && rng() < 0.2) {
        strs.push(strs[randomInt(rng, 0, strs.length - 1)]);
      } else {
        strs.push(str);
      }
    }

    cases.push([strs]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  anagramKey,
  referenceGroupAnagrams,
  sameGrouping,
  generateRandomCases,
};
