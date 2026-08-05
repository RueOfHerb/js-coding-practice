const { topKFrequent } = require('../../problems/05-top-k-frequent-elements/solution');
const { validateTopKFrequent, generateRandomCases } = require('./testUtils');

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

test('negative numbers', () => {
  expect(sorted(topKFrequent([-1, -1, 2], 1))).toEqual([-1]);
});

test('large frequency skew', () => {
  expect(sorted(topKFrequent([7, 7, 7, 7, 1], 1))).toEqual([7]);
});

test('k = 1 with a unique most frequent element among many distinct values', () => {
  expect(sorted(topKFrequent([1, 2, 2, 3, 3, 3, 4], 1))).toEqual([3]);
});

test('every element ties on frequency (ambiguous answer, validated by invariant)', () => {
  const nums = [1, 2, 3, 4];
  const result = topKFrequent(nums, 2);
  expect(validateTopKFrequent(nums, 2, result)).toEqual([]);
});

// --- Randomized (property-based) testing ---
//
// Because ties at the k-th frequency boundary make the "correct" output
// non-unique, random cases are checked against a validator (see
// testUtils.js) rather than a single reference answer: it confirms the
// result has the right length, no duplicates, every element actually
// appears in nums, and no excluded element has strictly higher frequency
// than the least-frequent included one. A fixed seed keeps cases
// reproducible across runs.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: nums=%j k=%j', (nums, k) => {
  const result = topKFrequent(nums.slice(), k);
  expect(validateTopKFrequent(nums, k, result)).toEqual([]);
});
