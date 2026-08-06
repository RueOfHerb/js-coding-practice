const {
  Codec,
  TreeNode,
} = require('../../problems/08-serialize-and-deserialize-binary-tree/solution');
const { treesEqual, generateRandomTrees } = require('./testUtils');

test('empty tree (null root)', () => {
  const codec = new Codec();
  const serialized = codec.serialize(null);
  expect(codec.deserialize(serialized)).toBeNull();
});

test('single node tree', () => {
  const codec = new Codec();
  const root = new TreeNode(7);
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('small balanced tree', () => {
  const codec = new Codec();
  const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('left-skewed tree', () => {
  const codec = new Codec();
  const root = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null), null);
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('right-skewed tree', () => {
  const codec = new Codec();
  const root = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))));
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('tree with negative values', () => {
  const codec = new Codec();
  const root = new TreeNode(-5, new TreeNode(-10), new TreeNode(3, new TreeNode(-1), null));
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('tree with duplicate values', () => {
  const codec = new Codec();
  const root = new TreeNode(5, new TreeNode(5, new TreeNode(5), null), new TreeNode(5));
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('tree with only a right child at the root', () => {
  const codec = new Codec();
  const root = new TreeNode(1, null, new TreeNode(2));
  const result = codec.deserialize(codec.serialize(root));
  expect(treesEqual(root, result)).toBe(true);
});

test('manually constructed tree reproduces exact shape and values', () => {
  const codec = new Codec();
  //        1
  //      /   \
  //     2     3
  //          / \
  //         4   5
  const root = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));

  const result = codec.deserialize(codec.serialize(root));

  expect(treesEqual(root, result)).toBe(true);
  expect(result.val).toBe(1);
  expect(result.left.val).toBe(2);
  expect(result.right.val).toBe(3);
  expect(result.right.left.val).toBe(4);
  expect(result.right.right.val).toBe(5);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random trees (including empty, single-node,
// skewed, and duplicate-value trees) and check that deserializing a
// serialized tree reproduces the exact same structure and values, using
// an independent structural comparison (treesEqual) rather than relying
// on the string output itself.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomTrees = generateRandomTrees(42, 60);

test.each(randomTrees.map((tree, i) => [i, tree]))('random tree case %s', (i, tree) => {
  const codec = new Codec();
  const result = codec.deserialize(codec.serialize(tree));
  expect(treesEqual(tree, result)).toBe(true);
});
