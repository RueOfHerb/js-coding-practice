// Shared test infrastructure: helpers for building/inspecting Node graphs
// from plain adjacency lists, plus a seeded random connected-graph
// generator, so both solution.js and solution.optimal.js can be checked
// against the same cases without duplicating this logic.

const { Node } = require('../../problems/13-clone-graph/solution');

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

// Builds a graph of Node instances from a plain adjacency list like
// [[2,4],[1,3],[2,4],[1,3]] (1-indexed, values equal to their index --
// same format LeetCode uses for this problem). Returns the node for
// index 1, or null for an empty adjacency list.
function buildGraphFromAdjacencyList(adjList) {
  if (adjList.length === 0) return null;

  const nodes = adjList.map((_, i) => new Node(i + 1));
  adjList.forEach((neighborVals, i) => {
    nodes[i].neighbors = neighborVals.map((val) => nodes[val - 1]);
  });

  return nodes[0];
}

// Traverses a graph of Node instances (BFS with a visited Set, written
// independently of any solution under test) and reconstructs a canonical
// adjacency-list representation (neighbor lists sorted ascending) suitable
// for structural comparison between an original graph and a clone of it.
function graphToAdjacencyList(node) {
  if (!node) return [];

  const visited = new Map(); // val -> Node
  visited.set(node.val, node);
  const queue = [node];

  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor.val)) {
        visited.set(neighbor.val, neighbor);
        queue.push(neighbor);
      }
    }
  }

  const maxVal = Math.max(...visited.keys());
  const adjList = [];
  for (let val = 1; val <= maxVal; val++) {
    const current = visited.get(val);
    const neighborVals = current.neighbors.map((neighbor) => neighbor.val);
    adjList.push(neighborVals.sort((a, b) => a - b));
  }

  return adjList;
}

// Collects every node reachable from `node` in BFS order (visited by
// object identity). Used to walk an original graph and its clone in
// lockstep to confirm the clone never reuses an original node reference.
function collectNodesBFS(node) {
  if (!node) return [];

  const visited = new Set([node]);
  const order = [node];
  const queue = [node];

  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        order.push(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}

function shuffle(array, rng) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generates a random *connected* undirected graph as a 1-indexed adjacency
// list. A random spanning tree (via a random permutation) guarantees
// connectivity; extra random edges are layered on top so the result
// sometimes contains a cycle, matching how LeetCode's clone-graph inputs
// are structured (every edge appears in both directions).
function generateRandomGraph(rng, maxNodes) {
  const n = randomInt(rng, 1, maxNodes);

  if (n === 1) {
    return [[]];
  }

  const order = shuffle(
    Array.from({ length: n }, (_, i) => i + 1),
    rng
  );

  const edgeKeys = new Set();
  const addEdge = (a, b) => {
    if (a === b) return;
    edgeKeys.add(a < b ? `${a}-${b}` : `${b}-${a}`);
  };

  for (let i = 1; i < order.length; i++) {
    const parent = order[randomInt(rng, 0, i - 1)];
    addEdge(order[i], parent);
  }

  // Layer extra edges on top of the spanning tree about 60% of the time,
  // which introduces cycles.
  if (n >= 3 && rng() < 0.6) {
    const extraEdges = randomInt(rng, 1, n);
    for (let i = 0; i < extraEdges; i++) {
      addEdge(randomInt(rng, 1, n), randomInt(rng, 1, n));
    }
  }

  const neighborSets = Array.from({ length: n }, () => new Set());
  for (const key of edgeKeys) {
    const [a, b] = key.split('-').map(Number);
    neighborSets[a - 1].add(b);
    neighborSets[b - 1].add(a);
  }

  return neighborSets.map((set) => [...set].sort((x, y) => x - y));
}

// Mixes deterministic edge cases (a lone node with no neighbors, and the
// classic 4-node square cycle) with randomly generated connected graphs of
// varying size, some of which contain cycles.
function generateRandomCases(seed, numCases, maxNodes = 10) {
  const rng = mulberry32(seed);
  // Each case is wrapped in its own array (a 1-tuple) so test.each passes
  // the whole adjacency list as a single argument instead of spreading its
  // rows out as separate parameters.
  const cases = [
    [[[]]], // single node, no neighbors
    [
      [
        [2, 4],
        [1, 3],
        [2, 4],
        [1, 3],
      ],
    ], // classic 4-node square cycle
  ];

  for (let i = 0; i < numCases; i++) {
    cases.push([generateRandomGraph(rng, maxNodes)]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  buildGraphFromAdjacencyList,
  graphToAdjacencyList,
  collectNodesBFS,
  generateRandomCases,
};
