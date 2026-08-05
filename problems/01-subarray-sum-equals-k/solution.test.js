const { subarraySum } = require('./solution');

test('example 1', () => {
  expect(subarraySum([1, 1, 1], 2)).toBe(2);
});

test('example 2', () => {
  expect(subarraySum([1, 2, 3], 3)).toBe(2);
});

test('handles negative numbers', () => {
  expect(subarraySum([1, -1, 0], 0)).toBe(3);
});

test('empty array', () => {
  expect(subarraySum([], 0)).toBe(0);
});
