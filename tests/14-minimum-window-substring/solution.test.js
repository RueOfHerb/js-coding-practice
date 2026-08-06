const { minWindow } = require('../../problems/14-minimum-window-substring/solution');
const { generateRandomCases, bruteForceMinWindow, isValidWindow } = require('./testUtils');

// Edge-case choice: an empty t requires nothing, so we define minWindow(s, '')
// to return "" (rather than treating the empty string as trivially satisfying
// and returning some substring of s). Both ANSWER-KEY implementations agree
// with this choice.

test('classic example', () => {
  expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
});

test('no valid window returns empty string', () => {
  expect(minWindow('A', 'AA')).toBe('');
});

test('t longer than s returns empty string', () => {
  expect(minWindow('AB', 'ABCD')).toBe('');
});

test('s equals t', () => {
  expect(minWindow('ABC', 'ABC')).toBe('ABC');
});

test('t with repeated characters requires multiple occurrences', () => {
  const result = minWindow('AABCAAB', 'AA');
  expect(result.length).toBe(bruteForceMinWindow('AABCAAB', 'AA').length);
  expect(isValidWindow('AABCAAB', 'AA', result)).toBe(true);
});

test('single character s and t that match', () => {
  expect(minWindow('A', 'A')).toBe('A');
});

test('single character s and t that do not match', () => {
  expect(minWindow('A', 'B')).toBe('');
});

test('empty t returns empty string', () => {
  expect(minWindow('ABC', '')).toBe('');
});

test('empty s with non-empty t returns empty string', () => {
  expect(minWindow('', 'A')).toBe('');
});

test('window at the very end of s', () => {
  const result = minWindow('XYZAABC', 'ABC');
  expect(result.length).toBe(bruteForceMinWindow('XYZAABC', 'ABC').length);
  expect(isValidWindow('XYZAABC', 'ABC', result)).toBe(true);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random (s, t) pairs and check minWindow against
// an independent, deliberately-simple brute-force reference implementation
// (obviously correct by inspection, even though it's not the approach we
// want as the final solution). Because multiple substrings can
// tie for the minimal length, we compare on result length and on whether
// the returned substring is actually a valid window, rather than requiring
// exact string equality. If a case ever fails, the test name tells you
// exactly which (s, t) pair to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: s=%j t=%j', (s, t) => {
  const expected = bruteForceMinWindow(s, t);
  const actual = minWindow(s, t);

  expect(actual.length).toBe(expected.length);
  if (expected.length > 0) {
    expect(isValidWindow(s, t, actual)).toBe(true);
  } else {
    expect(actual).toBe('');
  }
});
