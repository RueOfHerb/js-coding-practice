const { trap } = require('../../problems/11-trapping-rain-water/solution.optimal');
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

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 150 randomly generated elevation maps.
const randomCases = generateRandomCases(7, 150);

test.each(randomCases)('random case %#: height=%j', (height) => {
  expect(trap(height)).toBe(referenceTrap(height));
});
