const { numIslands } = require('./solution.optimal');
const { cloneGrid, numIslandsReference, generateRandomCases } = require('./testUtils');

test('example 1', () => {
  const grid = [
    ['1', '1', '0', '0'],
    ['1', '1', '0', '0'],
    ['0', '0', '1', '0'],
    ['0', '0', '0', '1'],
  ];
  expect(numIslands(grid)).toBe(3);
});

test('all water', () => {
  const grid = [
    ['0', '0'],
    ['0', '0'],
  ];
  expect(numIslands(grid)).toBe(0);
});

test('all land is one island', () => {
  const grid = [
    ['1', '1'],
    ['1', '1'],
  ];
  expect(numIslands(grid)).toBe(1);
});

test('single cell land', () => {
  expect(numIslands([['1']])).toBe(1);
});

test('single cell water', () => {
  expect(numIslands([['0']])).toBe(0);
});

test('diagonal land cells are not connected', () => {
  const grid = [
    ['1', '0'],
    ['0', '1'],
  ];
  expect(numIslands(grid)).toBe(2);
});

test('single row with multiple separate islands', () => {
  expect(numIslands([['1', '0', '1', '0', '1']])).toBe(3);
});

test('single column with multiple separate islands', () => {
  const grid = [['1'], ['0'], ['1'], ['1'], ['0']];
  expect(numIslands(grid)).toBe(2);
});

test('non-square grid with an irregular island shape', () => {
  const grid = [
    ['1', '1', '0', '0', '0'],
    ['0', '1', '0', '1', '1'],
    ['0', '0', '0', '1', '0'],
  ];
  expect(numIslands(grid)).toBe(2);
});

// Same seed as solution.test.js, so both implementations face the exact
// same 60 randomly generated grids.
const randomCases = generateRandomCases(42, 60);

test.each(randomCases)('random case %#: %j', (grid) => {
  const expected = numIslandsReference(cloneGrid(grid));
  const actual = numIslands(cloneGrid(grid));
  expect(actual).toBe(expected);
});
