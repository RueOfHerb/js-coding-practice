const { subarraySum } = require('../../problems/01-subarray-sum-equals-k/solution.optimal');
const { generateRandomCases, bruteForceSubarraySum } = require('./testUtils');

test('example 1', () => {
  expect(subarraySum([1, 1, 1], 2)).toBe(2);
});

test('example 2', () => {
  expect(subarraySum([1, 2, 3], 3)).toBe(2);
});

test('handles negative numbers', () => {
  expect(subarraySum([1, -1, 0], 0)).toBe(3);
});

test('empty array', () => {
  expect(subarraySum([], 0)).toBe(0);
});

test('single element equal to k', () => {
  expect(subarraySum([5], 5)).toBe(1);
});

test('single element not equal to k', () => {
  expect(subarraySum([5], 3)).toBe(0);
});

test('no matching subarrays', () => {
  expect(subarraySum([1, 2, 3], 100)).toBe(0);
});

test('whole array sums to k, no smaller subarray does', () => {
  expect(subarraySum([2, 4, 6], 12)).toBe(1);
});

test('all zeros with k = 0 counts every subarray', () => {
  expect(subarraySum([0, 0, 0], 0)).toBe(6);
});

test('k = 0 with a real cancellation later in the array', () => {
  expect(subarraySum([3, 4, -7, 1], 0)).toBe(1);
});

test('negative k', () => {
  expect(subarraySum([1, -2, 3, -4], -6)).toBe(0);
});

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 100 randomly generated (nums, k) cases.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: nums=%j k=%j', (nums, k) => {
  expect(subarraySum(nums, k)).toBe(bruteForceSubarraySum(nums, k));
});
