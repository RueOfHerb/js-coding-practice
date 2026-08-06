const { trap } = require('../../problems/11-trapping-rain-water/solution');
const { generateRandomCases, referenceTrap } = require('./testUtils');

test('classic LeetCode example', () => {
  expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
});

test('second classic example with multiple basins', () => {
  expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
});

test('empty array', () => {
  expect(trap([])).toBe(0);
});

test('single element', () => {
  expect(trap([5])).toBe(0);
});

test('two elements', () => {
  expect(trap([5, 3])).toBe(0);
});

test('strictly increasing array traps nothing', () => {
  expect(trap([1, 2, 3, 4, 5])).toBe(0);
});

test('strictly decreasing array traps nothing', () => {
  expect(trap([5, 4, 3, 2, 1])).toBe(0);
});

test('flat array of equal heights traps nothing', () => {
  expect(trap([5, 5, 5, 5])).toBe(0);
});

test('simple V-shape basin', () => {
  expect(trap([3, 0, 3])).toBe(3);
});

test('multiple separate basins', () => {
  expect(trap([3, 0, 3, 0, 3])).toBe(6);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random elevation maps (empty, single/pair,
// flat, monotonic, and generic bumpy terrain) and check trap against an
// independent reference implementation (precomputed leftMax/rightMax
// arrays — obviously correct by inspection, even though it's not the
// approach used in this file's actual solution). If the two ever
// disagree, the failing case name tells you exactly which array to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(7, 150);

test.each(randomCases)('random case %#: height=%j', (height) => {
  expect(trap(height)).toBe(referenceTrap(height));
});
