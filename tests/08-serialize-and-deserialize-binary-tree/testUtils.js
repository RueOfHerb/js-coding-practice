// Shared test infrastructure for validating alternative solutions to this
// problem against each other. Not a test file itself (no `test(...)` calls),
// so Jest won't try to run it directly.

const { TreeNode } = require('../../problems/08-serialize-and-deserialize-binary-tree/solution');

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

// Builds a random binary tree (independent of the Codec under test) by
// repeatedly attaching a new node to a random open child slot on an
// existing node. Values are drawn from a narrow range so duplicate values
// across nodes show up naturally, since binary trees don't require
// uniqueness.
function buildRandomTree(rng, numNodes, valueMin, valueMax) {
  if (numNodes <= 0) return null;

  const root = new TreeNode(randomInt(rng, valueMin, valueMax));
  // Nodes that still have at least one null child slot available.
  const openParents = [root];
  let created = 1;

  while (created < numNodes && openParents.length > 0) {
    const parentIndex = randomInt(rng, 0, openParents.length - 1);
    const parent = openParents[parentIndex];

    let side;
    if (parent.left === null && parent.right === null) {
      side = rng() < 0.5 ? 'left' : 'right';
    } else if (parent.left === null) {
      side = 'left';
    } else {
      side = 'right';
    }

    const node = new TreeNode(randomInt(rng, valueMin, valueMax));
    parent[side] = node;
    created++;

    if (parent.left !== null && parent.right !== null) {
      openParents.splice(parentIndex, 1);
    }

    openParents.push(node);
  }

  return root;
}

// Deep structural comparison, independent of serialize/deserialize, so it
// can be trusted as an oracle for round-trip tests.
function treesEqual(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  if (a.val !== b.val) return false;
  return treesEqual(a.left, b.left) && treesEqual(a.right, b.right);
}

// Generates a fixed set of edge-case trees (empty, single node, skewed)
// followed by (numCases - 3) random trees of varying size and shape,
// including trees with duplicate values.
function generateRandomTrees(seed, numCases) {
  const rng = mulberry32(seed);
  const trees = [];

  trees.push(null); // empty tree
  trees.push(new TreeNode(42)); // single node

  // Left-skewed (linked-list shaped) tree.
  let leftSkewed = null;
  for (let i = 0; i < 6; i++) {
    leftSkewed = new TreeNode(i, leftSkewed, null);
  }
  trees.push(leftSkewed);

  // Right-skewed (linked-list shaped) tree.
  let rightSkewedRoot = null;
  let cursor = null;
  for (let i = 0; i < 6; i++) {
    const node = new TreeNode(i);
    if (cursor === null) {
      rightSkewedRoot = node;
    } else {
      cursor.right = node;
    }
    cursor = node;
  }
  trees.push(rightSkewedRoot);

  for (let i = trees.length; i < numCases; i++) {
    const numNodes = randomInt(rng, 0, 30);
    // Narrow value range increases the chance of duplicate values landing
    // in the same tree.
    trees.push(buildRandomTree(rng, numNodes, -5, 5));
  }

  return trees;
}

module.exports = { mulberry32, randomInt, buildRandomTree, treesEqual, generateRandomTrees };
