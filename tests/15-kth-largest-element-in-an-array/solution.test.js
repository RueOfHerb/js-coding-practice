const { findKthLargest } = require('../../problems/15-kth-largest-element-in-an-array/solution');
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

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random arrays/k values and check findKthLargest
// against an independent, deliberately-simple reference implementation
// (sort ascending, index from the end — obviously correct by inspection,
// even though it's not the approach we want as the final solution). If
// the two ever disagree, the failing case name tells you
// exactly which (nums, k) pair to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: nums=%j k=%j', (nums, k) => {
  expect(findKthLargest(nums, k)).toBe(referenceFindKthLargest(nums, k));
});
