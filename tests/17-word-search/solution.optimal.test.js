const { exist } = require('../../problems/17-word-search/solution.optimal');
const { generateRandomCases, existReference, cloneBoard } = require('./testUtils');

test('example 1: word can be traced through the grid', () => {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  expect(exist(board, 'ABCCED')).toBe(true);
});

test('example 2: word can be traced through the grid', () => {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  expect(exist(board, 'SEE')).toBe(true);
});

test('example 3: word would require reusing the same cell twice', () => {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  expect(exist(board, 'ABCB')).toBe(false);
});

test('1x1 board matching the 1-letter word', () => {
  expect(exist([['A']], 'A')).toBe(true);
});

test('1x1 board not matching the 1-letter word', () => {
  expect(exist([['A']], 'B')).toBe(false);
});

test('word longer than the total number of cells', () => {
  const board = [
    ['A', 'B'],
    ['C', 'D'],
  ];
  expect(exist(board, 'ABCDE')).toBe(false);
});

test('single-row board only has horizontal neighbors', () => {
  const board = [['A', 'B', 'C']];
  expect(exist(board, 'ABC')).toBe(true);
});

test('word contains a letter that never appears on the board', () => {
  const board = [
    ['A', 'B'],
    ['C', 'D'],
  ];
  expect(exist(board, 'Z')).toBe(false);
});

test('search must dead-end and backtrack before finding the real path', () => {
  // Starting DFS from (0,0) matches "AA" but then dead-ends (no unused
  // neighbor spells the final "B"), forcing a full backtrack out of that
  // branch before the search finds the real path starting from (1,0).
  const board = [
    ['A', 'B'],
    ['A', 'A'],
  ];
  expect(exist(board, 'AAB')).toBe(true);
});

test('does not mutate the input board', () => {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  const original = cloneBoard(board);

  exist(board, 'ABCCED');

  expect(board).toEqual(original);
});

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 150 randomly generated (board, word) cases.
const randomCases = generateRandomCases(7, 150);

test.each(randomCases)('random case %#: board=%j word=%j', (board, word) => {
  expect(exist(cloneBoard(board), word)).toBe(existReference(cloneBoard(board), word));
});
