const { merge } = require('../../problems/04-merge-intervals/solution');
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

// --- Randomized (property-based) testing ---
//
// Generates many random interval lists and checks merge() against an
// independently written sort + linear-scan reference. Results are
// normalized (sorted by [start, end]) before comparing, since an
// implementation isn't required to emit merged intervals in any
// particular order, only to produce the same set. Intervals are cloned
// before each call in case a solution mutates its input in place. A
// fixed seed keeps the cases reproducible across runs.

const randomCases = generateRandomCases(42, 80);

test.each(randomCases)('random case %#: %j', (intervals) => {
  const expected = normalize(mergeReference(cloneIntervals(intervals)));
  const actual = normalize(merge(cloneIntervals(intervals)));
  expect(actual).toEqual(expected);
});
