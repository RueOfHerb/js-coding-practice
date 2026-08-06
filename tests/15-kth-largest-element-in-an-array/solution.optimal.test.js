const {
  findKthLargest,
} = require('../../problems/15-kth-largest-element-in-an-array/solution.optimal');
const { generateRandomCases, referenceFindKthLargest } = require('./testUtils');

test('example 1', () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
});

test('example 2', () => {
  expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
});

test('k = 1 returns the maximum', () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 1)).toBe(6);
});

test('k === nums.length returns the minimum', () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 6)).toBe(1);
});

test('single-element array with k = 1', () => {
  expect(findKthLargest([7], 1)).toBe(7);
});

test('array with all duplicate values', () => {
  expect(findKthLargest([4, 4, 4, 4, 4], 3)).toBe(4);
});

test('array with negative numbers', () => {
  expect(findKthLargest([-1, -2, -3, -4, -5], 2)).toBe(-2);
});

test('array already sorted ascending', () => {
  expect(findKthLargest([1, 2, 3, 4, 5], 3)).toBe(3);
});

test('array already sorted descending', () => {
  expect(findKthLargest([5, 4, 3, 2, 1], 3)).toBe(3);
});

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 100 randomly generated (nums, k) cases.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: nums=%j k=%j', (nums, k) => {
  expect(findKthLargest(nums, k)).toBe(referenceFindKthLargest(nums, k));
});
