const { numIslands } = require('./solution');

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
