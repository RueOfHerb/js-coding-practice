const { kClosest } = require('../../problems/09-k-closest-points-to-origin/solution');
const { isValidKClosestSelection, generateRandomCases } = require('./testUtils');

test('example 1', () => {
  const points = [
    [1, 3],
    [-2, 2],
  ];
  const result = kClosest(points, 1);
  expect(isValidKClosestSelection(points, 1, result)).toBe(true);
});

test('example 2', () => {
  const points = [
    [3, 3],
    [5, -1],
    [-2, 4],
  ];
  const result = kClosest(points, 2);
  expect(isValidKClosestSelection(points, 2, result)).toBe(true);
});

test('k equal to points.length returns every point', () => {
  const points = [
    [1, 1],
    [2, 2],
    [-3, -3],
  ];
  const result = kClosest(points, 3);
  expect(isValidKClosestSelection(points, 3, result)).toBe(true);
  expect(result).toHaveLength(3);
});

test('k = 1 returns the single closest point', () => {
  const points = [
    [0, 5],
    [0, 1],
    [3, 4],
  ];
  const result = kClosest(points, 1);
  expect(isValidKClosestSelection(points, 1, result)).toBe(true);
});

test('all points equidistant from the origin', () => {
  const points = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const result = kClosest(points, 2);
  expect(isValidKClosestSelection(points, 2, result)).toBe(true);
});

test('duplicate points', () => {
  const points = [
    [2, 2],
    [2, 2],
    [1, 1],
  ];
  const result = kClosest(points, 2);
  expect(isValidKClosestSelection(points, 2, result)).toBe(true);
});

test('negative coordinates', () => {
  const points = [
    [-5, -5],
    [-1, -1],
    [4, 4],
    [-2, 0],
  ];
  const result = kClosest(points, 3);
  expect(isValidKClosestSelection(points, 3, result)).toBe(true);
});

test('single point', () => {
  const points = [[7, -2]];
  const result = kClosest(points, 1);
  expect(isValidKClosestSelection(points, 1, result)).toBe(true);
});

test('origin itself is always closest', () => {
  const points = [
    [0, 0],
    [1, 1],
    [-1, -1],
  ];
  const result = kClosest(points, 1);
  expect(isValidKClosestSelection(points, 1, result)).toBe(true);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random point sets/k values and check that
// kClosest's output satisfies the "valid k-closest selection" property
// against an independent oracle (isValidKClosestSelection, built in
// testUtils.js). We can't compare against one fixed expected array
// because ties in distance make more than one k-subset correct - the
// oracle instead checks that the right points are included and no
// closer point was left out.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: points=%j k=%j', (points, k) => {
  const result = kClosest(points, k);
  expect(isValidKClosestSelection(points, k, result)).toBe(true);
});
