const { groupAnagrams } = require('../../problems/18-group-anagrams/solution.optimal');
const { referenceGroupAnagrams, sameGrouping, generateRandomCases } = require('./testUtils');

test('classic LeetCode example', () => {
  const result = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
  expect(
    sameGrouping(result, [
      ['eat', 'tea', 'ate'],
      ['tan', 'nat'],
      ['bat'],
    ])
  ).toBe(true);
});

test('empty array', () => {
  expect(groupAnagrams([])).toEqual([]);
});

test('single string', () => {
  expect(sameGrouping(groupAnagrams(['abc']), [['abc']])).toBe(true);
});

test('no anagram overlaps: every string is its own group', () => {
  const result = groupAnagrams(['abc', 'def', 'ghi']);
  expect(sameGrouping(result, [['abc'], ['def'], ['ghi']])).toBe(true);
});

test('every string is an anagram of every other: one group', () => {
  const result = groupAnagrams(['abc', 'bca', 'cab', 'acb']);
  expect(sameGrouping(result, [['abc', 'bca', 'cab', 'acb']])).toBe(true);
});

test('duplicate identical strings end up in the same group with multiplicity preserved', () => {
  const result = groupAnagrams(['abc', 'abc', 'cab']);
  expect(sameGrouping(result, [['abc', 'abc', 'cab']])).toBe(true);
});

test('array containing the empty string', () => {
  const result = groupAnagrams(['', 'a', '']);
  expect(sameGrouping(result, [['', ''], ['a']])).toBe(true);
});

test('all empty strings group together', () => {
  const result = groupAnagrams(['', '', '']);
  expect(sameGrouping(result, [['', '', '']])).toBe(true);
});

test('mixed case-free single-character strings', () => {
  const result = groupAnagrams(['a', 'b', 'a', 'b', 'c']);
  expect(sameGrouping(result, [['a', 'a'], ['b', 'b'], ['c']])).toBe(true);
});

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 100 randomly generated strs arrays.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: strs=%j', (strs) => {
  expect(sameGrouping(groupAnagrams(strs), referenceGroupAnagrams(strs))).toBe(true);
});
