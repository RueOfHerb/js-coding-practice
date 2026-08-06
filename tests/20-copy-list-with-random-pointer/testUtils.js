// Shared test infrastructure for validating alternative solutions to this
// problem against each other. Not a test file itself (no `test(...)` calls),
// so Jest won't try to run it directly.

const { Node } = require('../../problems/20-copy-list-with-random-pointer/solution');

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

// Builds a linked list of Nodes from a plain-object spec, mirroring how
// LeetCode presents this problem's examples, e.g.
// [{val: 7, random: null}, {val: 13, random: 0}, {val: 11, random: 4}, ...]
// where `random` is an index into the same array (or null). Returns the
// head of the list (or null for an empty spec).
function buildList(spec) {
  if (spec.length === 0) return null;

  const nodes = spec.map((entry) => new Node(entry.val));

  spec.forEach((entry, i) => {
    nodes[i].next = i + 1 < nodes.length ? nodes[i + 1] : null;
    nodes[i].random = entry.random === null ? null : nodes[entry.random];
  });

  return nodes[0];
}

// Walks a list built by buildList (via `next`) and reconstructs the same
// plain-object-array representation, mapping each node's `random` pointer
// back to an index via a Map<Node, index> built in a first pass. Useful for
// structural comparison independent of object identity.
function listToSpec(head) {
  const indexByNode = new Map();

  let current = head;
  let i = 0;
  while (current) {
    indexByNode.set(current, i);
    current = current.next;
    i++;
  }

  const spec = [];
  current = head;
  while (current) {
    spec.push({
      val: current.val,
      random: current.random === null ? null : indexByNode.get(current.random),
    });
    current = current.next;
  }

  return spec;
}

// Generates seeded, reproducible list specs of varying length (including 0
// and 1), with random `random` pointers (null, self-references, and
// forward/backward references) and possibly-duplicate vals.
function generateRandomListSpecs(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const length = randomInt(rng, 0, 12);
    const spec = [];

    for (let j = 0; j < length; j++) {
      const val = randomInt(rng, 0, 9); // small range so duplicate vals are common
      let random = null;
      if (rng() < 0.8) {
        random = randomInt(rng, 0, length - 1);
      }
      spec.push({ val, random });
    }

    cases.push([spec]);
  }

  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  buildList,
  listToSpec,
  generateRandomListSpecs,
};
