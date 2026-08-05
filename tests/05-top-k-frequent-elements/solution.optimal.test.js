const { topKFrequent } = require('../../problems/05-top-k-frequent-elements/solution.optimal');
const { validateTopKFrequent, generateRandomCases } = require('./testUtils');

function sorted(arr) {
  return [...arr].sort((a, b) => a - b);
}

test('example 1', () => {
  expect(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2))).toEqual([1, 2]);
});

test('single element', () => {
  expect(sorted(topKFrequent([1], 1))).toEqual([1]);
});

test('k equals number of distinct elements', () => {
  expect(sorted(topKFrequent([4, 4, 5, 5, 6], 3))).toEqual([4, 5, 6]);
});

test('negative numbers', () => {
  expect(sorted(topKFrequent([-1, -1, 2], 1))).toEqual([-1]);
});

test('large frequency skew', () => {
  expect(sorted(topKFrequent([7, 7, 7, 7, 1], 1))).toEqual([7]);
});

test('k = 1 with a unique most frequent element among many distinct values', () => {
  expect(sorted(topKFrequent([1, 2, 2, 3, 3, 3, 4], 1))).toEqual([3]);
});

test('every element ties on frequency (ambiguous answer, validated by invariant)', () => {
  const nums = [1, 2, 3, 4];
  const result = topKFrequent(nums, 2);
  expect(validateTopKFrequent(nums, 2, result)).toEqual([]);
});

// Same seed as solution.test.js, so both implementations face the exact
// same 100 randomly generated (nums, k) cases.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: nums=%j k=%j', (nums, k) => {
  const result = topKFrequent(nums.slice(), k);
  expect(validateTopKFrequent(nums, k, result)).toEqual([]);
});
