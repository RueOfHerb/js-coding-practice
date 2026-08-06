const {
  lengthOfLongestSubstring,
} = require('../../problems/10-longest-substring-without-repeating-characters/solution');
const { generateRandomCases, bruteForceLengthOfLongestSubstring } = require('./testUtils');

test('classic example 1', () => {
  expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
});

test('classic example 2', () => {
  expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
});

test('classic example 3', () => {
  expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
});

test('empty string', () => {
  expect(lengthOfLongestSubstring('')).toBe(0);
});

test('single character', () => {
  expect(lengthOfLongestSubstring('a')).toBe(1);
});

test('all unique characters', () => {
  expect(lengthOfLongestSubstring('abcdef')).toBe(6);
});

test('all identical characters', () => {
  expect(lengthOfLongestSubstring('aaaaaa')).toBe(1);
});

test('string with spaces and punctuation', () => {
  expect(lengthOfLongestSubstring('a b!c b')).toBe(5); // "a b!c" (indices 0-4)
});

test('longest window is at the very end of the string', () => {
  expect(lengthOfLongestSubstring('aabcde')).toBe(5); // "abcde" runs to the last character
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random strings (mixing tiny repeat-heavy
// alphabets, larger varied alphabets, and empty strings) and check
// lengthOfLongestSubstring against an independent, deliberately-simple
// O(n^2) reference implementation (obviously correct by inspection, even
// though it's not the approach we want as the final solution).
// If the two ever disagree, the failing case name tells you exactly which
// string to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: s=%j', (s) => {
  expect(lengthOfLongestSubstring(s)).toBe(bruteForceLengthOfLongestSubstring(s));
});
