const { canFinish } = require('./solution');

test('example 1 - possible', () => {
  expect(canFinish(2, [[1, 0]])).toBe(true);
});

test('example 2 - cycle, impossible', () => {
  expect(
    canFinish(2, [
      [1, 0],
      [0, 1],
    ])
  ).toBe(false);
});

test('no prerequisites', () => {
  expect(canFinish(3, [])).toBe(true);
});

test('longer chain with a cycle', () => {
  expect(
    canFinish(4, [
      [1, 0],
      [2, 1],
      [3, 2],
      [1, 3],
    ])
  ).toBe(false);
});
