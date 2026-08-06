const {
  lengthOfLongestSubstring,
} = require('../../problems/10-longest-substring-without-repeating-characters/solution.optimal');
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

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 100 randomly generated strings.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: s=%j', (s) => {
  expect(lengthOfLongestSubstring(s)).toBe(bruteForceLengthOfLongestSubstring(s));
});
