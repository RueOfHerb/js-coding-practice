const { merge } = require('../../problems/04-merge-intervals/solution.optimal');
const { cloneIntervals, normalize, mergeReference, generateRandomCases } = require('./testUtils');

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

test('empty input', () => {
  expect(merge([])).toEqual([]);
});

test('single interval', () => {
  expect(merge([[1, 5]])).toEqual([[1, 5]]);
});

test('one interval fully contains another', () => {
  expect(
    merge([
      [1, 10],
      [2, 3],
    ])
  ).toEqual([[1, 10]]);
});

test('chain of overlaps merges into multiple groups', () => {
  expect(
    merge([
      [1, 4],
      [2, 5],
      [7, 9],
      [8, 10],
    ])
  ).toEqual([
    [1, 5],
    [7, 10],
  ]);
});

test('duplicate intervals collapse to one', () => {
  expect(
    merge([
      [1, 3],
      [1, 3],
    ])
  ).toEqual([[1, 3]]);
});

test('negative coordinates', () => {
  expect(
    merge([
      [-5, -1],
      [-2, 2],
    ])
  ).toEqual([[-5, 2]]);
});

// Same seed as solution.test.js, so both implementations face the exact
// same 80 randomly generated interval lists.
const randomCases = generateRandomCases(42, 80);

test.each(randomCases)('random case %#: %j', (intervals) => {
  const expected = normalize(mergeReference(cloneIntervals(intervals)));
  const actual = normalize(merge(cloneIntervals(intervals)));
  expect(actual).toEqual(expected);
});
