const { topKFrequent } = require('./solution');

function sorted(arr) {
  return [...arr].sort((a, b) => a - b);
}

test('example 1', () => {
  expect(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2))).toEqual([1, 2]);
});

test('single element', () => {
  expect(sorted(topKFrequent([1], 1))).toEqual([1]);
});

test('k equals number of distinct elements', () => {
  expect(sorted(topKFrequent([4, 4, 5, 5, 6], 3))).toEqual([4, 5, 6]);
});
