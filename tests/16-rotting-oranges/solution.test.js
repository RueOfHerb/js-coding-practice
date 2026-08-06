const { orangesRotting } = require('../../problems/16-rotting-oranges/solution');
const { generateRandomCases, orangesRottingReference, cloneGrid } = require('./testUtils');

test('example 1: mixed grid rots in 4 minutes', () => {
  expect(
    orangesRotting([
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ])
  ).toBe(4);
});

test('example 2: isolated fresh orange can never rot', () => {
  expect(
    orangesRotting([
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ])
  ).toBe(-1);
});

test('example 3: no fresh oranges takes 0 minutes', () => {
  expect(orangesRotting([[0, 2]])).toBe(0);
});

test('grid with fresh oranges but no rotten ones is impossible', () => {
  expect(
    orangesRotting([
      [1, 1],
      [1, 1],
    ])
  ).toBe(-1);
});

test('grid with no oranges at all takes 0 minutes', () => {
  expect(
    orangesRotting([
      [0, 0],
      [0, 0],
    ])
  ).toBe(0);
});

test('single isolated fresh orange with no rotten neighbor is impossible', () => {
  expect(
    orangesRotting([
      [1, 0],
      [0, 0],
    ])
  ).toBe(-1);
});

test('all cells already rotten takes 0 minutes', () => {
  expect(
    orangesRotting([
      [2, 2],
      [2, 2],
    ])
  ).toBe(0);
});

test('1x1 grid of a fresh orange is impossible', () => {
  expect(orangesRotting([[1]])).toBe(-1);
});

test('1x1 grid of a rotten orange takes 0 minutes', () => {
  expect(orangesRotting([[2]])).toBe(0);
});

test('1x1 grid of an empty cell takes 0 minutes', () => {
  expect(orangesRotting([[0]])).toBe(0);
});

test('larger grid rots in stages from two rotten sources', () => {
  expect(
    orangesRotting([
      [2, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [0, 1, 1, 2, 1],
    ])
  ).toBe(orangesRottingReference([
    [2, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
    [0, 1, 1, 2, 1],
  ]));
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random grids and check orangesRotting against an
// independent, deliberately-simple minute-by-minute reference
// implementation (obviously correct by inspection, even though it's not the
// approach we want as the final solution). If the two ever
// disagree, the failing case name tells you exactly which grid to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky. Each side gets its own deep
// copy of the grid, since both implementations are allowed to mutate their
// input in place.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: grid=%j', (grid) => {
  expect(orangesRotting(cloneGrid(grid))).toBe(orangesRottingReference(cloneGrid(grid)));
});
