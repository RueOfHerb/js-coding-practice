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

// Independent brute-force reference, written from scratch (not derived from
// ANSWER-KEY): checks every substring of s for validity via a fresh
// character-count comparison against t, tracking the shortest valid one.
function bruteForceMinWindow(s, t) {
  if (t.length === 0) return '';
  if (t.length > s.length) return '';

  const required = {};
  for (const ch of t) {
    required[ch] = (required[ch] || 0) + 1;
  }

  function isValid(substring) {
    const counts = {};
    for (const ch of substring) {
      counts[ch] = (counts[ch] || 0) + 1;
    }
    for (const ch of Object.keys(required)) {
      if ((counts[ch] || 0) < required[ch]) return false;
    }
    return true;
  }

  let best = '';
  for (let start = 0; start < s.length; start++) {
    for (let end = start; end < s.length; end++) {
      const substring = s.slice(start, end + 1);
      if (best !== '' && substring.length >= best.length) break;
      if (isValid(substring)) {
        if (best === '' || substring.length < best.length) {
          best = substring;
        }
        break; // no point extending this start further once valid
      }
    }
  }

  return best;
}

// Checks whether `candidate` is a valid answer: it must be an actual
// substring of s, and it must contain every character of t with at least
// the required multiplicity. Used by tests to tolerate ties between
// multiple minimal-length windows instead of requiring exact string
// equality against a single reference answer.
function isValidWindow(s, t, candidate) {
  if (t.length === 0) return candidate === '';
  if (candidate === '') return false;
  if (!s.includes(candidate)) return false;

  const required = {};
  for (const ch of t) {
    required[ch] = (required[ch] || 0) + 1;
  }
  const counts = {};
  for (const ch of candidate) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  for (const ch of Object.keys(required)) {
    if ((counts[ch] || 0) < required[ch]) return false;
  }
  return true;
}

// Seeded random (s, t) case generator drawing from a small alphabet so that
// valid windows are reasonably common, and t frequently contains repeated
// characters (forcing solutions to count occurrences, not just presence).
// Some generated cases will have no valid window at all, which is exactly
// the "" path we want exercised.
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const alphabet = 'ABC';
  const cases = [];

  function randomString(length) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += alphabet[randomInt(rng, 0, alphabet.length - 1)];
    }
    return str;
  }

  for (let i = 0; i < numCases; i++) {
    const sLength = randomInt(rng, 0, 15);
    const s = randomString(sLength);

    let t;
    if (sLength > 0 && rng() < 0.6) {
      // Bias t towards being derived from a real substring of s (possibly
      // with extra repeats mixed in) so many cases have a valid window.
      const start = randomInt(rng, 0, sLength - 1);
      const end = randomInt(rng, start, sLength - 1);
      t = s.slice(start, end + 1);
      if (rng() < 0.4 && t.length > 0) {
        // Occasionally duplicate a character in t to force multiplicity
        // requirements beyond mere presence.
        t += t[randomInt(rng, 0, t.length - 1)];
      }
    } else {
      const tLength = randomInt(rng, 0, 6);
      t = randomString(tLength);
    }

    cases.push([s, t]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  bruteForceMinWindow,
  isValidWindow,
  generateRandomCases,
};
