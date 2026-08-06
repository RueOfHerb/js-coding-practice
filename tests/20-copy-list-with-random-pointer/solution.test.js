const { copyRandomList } = require('../../problems/20-copy-list-with-random-pointer/solution');
const { buildList, listToSpec, generateRandomListSpecs } = require('./testUtils');

test('null head returns null', () => {
  expect(copyRandomList(null)).toBeNull();
});

test('single node with random pointing to itself', () => {
  const spec = [{ val: 5, random: 0 }];
  const head = buildList(spec);

  const clone = copyRandomList(head);

  expect(listToSpec(clone)).toEqual(spec);
  expect(clone).not.toBe(head);
  expect(clone.random).toBe(clone);
  expect(clone.random).not.toBe(head);
});

test('single node with random === null', () => {
  const spec = [{ val: 9, random: null }];
  const head = buildList(spec);

  const clone = copyRandomList(head);

  expect(listToSpec(clone)).toEqual(spec);
  expect(clone).not.toBe(head);
  expect(clone.random).toBeNull();
});

// The classic LeetCode example for this problem.
const classicSpec = [
  { val: 7, random: null },
  { val: 13, random: 0 },
  { val: 11, random: 4 },
  { val: 10, random: 2 },
  { val: 1, random: 0 },
];

test('classic example: clone matches original structurally', () => {
  const head = buildList(classicSpec);

  const clone = copyRandomList(head);

  expect(listToSpec(clone)).toEqual(classicSpec);
});

test('classic example: clone is fully independent of the original', () => {
  const head = buildList(classicSpec);

  const clone = copyRandomList(head);

  let originalNode = head;
  let cloneNode = clone;
  while (originalNode) {
    expect(cloneNode).not.toBe(originalNode);
    if (originalNode.random !== null) {
      expect(cloneNode.random).not.toBe(originalNode.random);
    } else {
      expect(cloneNode.random).toBeNull();
    }
    originalNode = originalNode.next;
    cloneNode = cloneNode.next;
  }
});

test('mutating the clone val does not affect the original', () => {
  const head = buildList(classicSpec);
  const clone = copyRandomList(head);

  clone.val = 999;

  expect(head.val).toBe(classicSpec[0].val);
});

test('mutating the clone next does not affect the original', () => {
  const head = buildList(classicSpec);
  const originalSecond = head.next;
  const clone = copyRandomList(head);

  clone.next = null;

  expect(head.next).toBe(originalSecond);
});

test('mutating the clone random does not affect the original', () => {
  const head = buildList(classicSpec);
  const originalThird = head.next.next;
  const originalThirdRandom = originalThird.random;
  const clone = copyRandomList(head);

  clone.next.next.random = null;

  expect(originalThird.random).toBe(originalThirdRandom);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random list specs (varying length, null/self/
// forward/backward random pointers, duplicate vals) and check that
// copyRandomList produces a structurally identical list (via listToSpec)
// made entirely of new nodes. If the two ever disagree, the failing case
// name tells you exactly which spec to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomSpecs = generateRandomListSpecs(42, 100);

test.each(randomSpecs)('random case %#: spec=%j', (spec) => {
  const head = buildList(spec);
  const clone = copyRandomList(head);

  expect(listToSpec(clone)).toEqual(spec);

  const originalNodes = new Set();
  let originalNode = head;
  while (originalNode) {
    originalNodes.add(originalNode);
    originalNode = originalNode.next;
  }

  let cloneNode = clone;
  while (cloneNode) {
    expect(originalNodes.has(cloneNode)).toBe(false);
    cloneNode = cloneNode.next;
  }
});
