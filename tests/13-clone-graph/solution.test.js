const { cloneGraph, Node } = require('../../problems/13-clone-graph/solution');
const {
  buildGraphFromAdjacencyList,
  graphToAdjacencyList,
  collectNodesBFS,
  generateRandomCases,
} = require('./testUtils');

test('null input returns null', () => {
  expect(cloneGraph(null)).toBeNull();
});

test('single node with no neighbors', () => {
  const original = buildGraphFromAdjacencyList([[]]);
  const clone = cloneGraph(original);

  expect(clone).not.toBe(original);
  expect(clone.val).toBe(1);
  expect(clone.neighbors).toEqual([]);
});

test('classic LeetCode 4-node square-cycle example', () => {
  const adjList = [
    [2, 4],
    [1, 3],
    [2, 4],
    [1, 3],
  ];
  const original = buildGraphFromAdjacencyList(adjList);
  const clone = cloneGraph(original);

  expect(graphToAdjacencyList(clone)).toEqual(adjList);
});

test('two-node graph connected to each other', () => {
  const adjList = [[2], [1]];
  const original = buildGraphFromAdjacencyList(adjList);
  const clone = cloneGraph(original);

  expect(graphToAdjacencyList(clone)).toEqual(adjList);
});

test('three-node triangle cycle preserves structure', () => {
  const adjList = [
    [2, 3],
    [1, 3],
    [1, 2],
  ];
  const original = buildGraphFromAdjacencyList(adjList);
  const clone = cloneGraph(original);

  expect(graphToAdjacencyList(clone)).toEqual(adjList);
});

test('clone root is a genuinely different object than the original root', () => {
  const original = buildGraphFromAdjacencyList([
    [2, 4],
    [1, 3],
    [2, 4],
    [1, 3],
  ]);
  const clone = cloneGraph(original);

  expect(clone).not.toBe(original);
  expect(clone.val).toBe(original.val);
});

test('every clone node is a distinct object from every original node', () => {
  const original = buildGraphFromAdjacencyList([
    [2, 4],
    [1, 3],
    [2, 4],
    [1, 3],
  ]);
  const clone = cloneGraph(original);

  const originalNodes = collectNodesBFS(original);
  const cloneNodes = collectNodesBFS(clone);

  expect(cloneNodes.length).toBe(originalNodes.length);
  cloneNodes.forEach((cloneNode, i) => {
    expect(cloneNode).not.toBe(originalNodes[i]);
    expect(cloneNode.val).toBe(originalNodes[i].val);
  });
});

test('mutating the clone neighbors array does not affect the original', () => {
  const original = buildGraphFromAdjacencyList([[2], [1]]);
  const clone = cloneGraph(original);

  clone.neighbors.push(new Node(99));

  expect(original.neighbors.length).toBe(1);
  expect(graphToAdjacencyList(original)).toEqual([[2], [1]]);
});

test('preserves node values on a larger acyclic star-shaped graph', () => {
  const adjList = [
    [2, 3, 4, 5],
    [1],
    [1],
    [1],
    [1],
  ];
  const original = buildGraphFromAdjacencyList(adjList);
  const clone = cloneGraph(original);

  expect(graphToAdjacencyList(clone)).toEqual(adjList);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random connected graphs (varying size, some
// containing cycles) and check that cloneGraph produces a structurally
// identical graph (via the independent graphToAdjacencyList traversal)
// while never reusing any original node object. A fixed seed keeps the
// generated cases identical on every run, so failures are reproducible
// instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: adjList=%j', (adjList) => {
  const original = buildGraphFromAdjacencyList(adjList);
  const clone = cloneGraph(original);

  expect(graphToAdjacencyList(clone)).toEqual(graphToAdjacencyList(original));

  const originalNodes = collectNodesBFS(original);
  const cloneNodes = collectNodesBFS(clone);
  expect(cloneNodes.length).toBe(originalNodes.length);
  cloneNodes.forEach((cloneNode, i) => {
    expect(cloneNode).not.toBe(originalNodes[i]);
  });
});
