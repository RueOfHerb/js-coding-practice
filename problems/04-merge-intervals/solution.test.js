const { merge } = require('./solution');

test('example 1', () => {
  expect(
    merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ])
  ).toEqual([
    [1, 6],
    [8, 10],
    [15, 18],
  ]);
});

test('touching intervals merge', () => {
  expect(
    merge([
      [1, 4],
      [4, 5],
    ])
  ).toEqual([[1, 5]]);
});

test('no overlap', () => {
  expect(
    merge([
      [1, 2],
      [3, 4],
    ])
  ).toEqual([
    [1, 2],
    [3, 4],
  ]);
});

test('unsorted input', () => {
  expect(
    merge([
      [5, 6],
      [1, 2],
      [3, 4],
    ])
  ).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});
