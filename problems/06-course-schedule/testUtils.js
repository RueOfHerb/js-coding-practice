// Shared test infrastructure: an independent reference implementation plus
// a seeded random-graph generator, so both solution.js and
// solution.optimal.js can be checked against the same cases without
// duplicating this logic.

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

function clonePrerequisites(prerequisites) {
  return prerequisites.map((p) => p.slice());
}

// Reference implementation: DFS cycle detection with a 3-color marking
// (0 = unvisited, 1 = in progress, 2 = done), written independently of
// whatever solution.js / solution.optimal.js do.
function canFinishReference(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[a].push(b);
  }
  const state = new Array(numCourses).fill(0);

  function hasCycle(node) {
    if (state[node] === 1) return true;
    if (state[node] === 2) return false;
    state[node] = 1;
    for (const next of adj[node]) {
      if (hasCycle(next)) return true;
    }
    state[node] = 2;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0 && hasCycle(i)) return false;
  }
  return true;
}

// Mixes three strategies so random cases cover guaranteed-acyclic graphs,
// guaranteed-cyclic graphs, and genuinely random edge sets (which may or
// may not contain a cycle -- the reference above decides).
function generateRandomGraph(rng, maxCourses) {
  const numCourses = randomInt(rng, 1, maxCourses);
  const prerequisites = [];
  const strategy = rng();

  if (strategy < 0.4) {
    // Guaranteed acyclic: every edge [a, b] has a > b, so following
    // prerequisites always decreases the course index -- no cycle possible.
    const numEdges = randomInt(rng, 0, numCourses * 2);
    for (let i = 0; i < numEdges; i++) {
      if (numCourses < 2) break;
      const a = randomInt(rng, 1, numCourses - 1);
      const b = randomInt(rng, 0, a - 1);
      prerequisites.push([a, b]);
    }
  } else if (strategy < 0.7) {
    // Fully random edges; may or may not contain a cycle.
    const numEdges = randomInt(rng, 0, numCourses * 2);
    for (let i = 0; i < numEdges; i++) {
      prerequisites.push([randomInt(rng, 0, numCourses - 1), randomInt(rng, 0, numCourses - 1)]);
    }
  } else {
    // Guaranteed cycle among a random subset of courses, plus some noise.
    if (numCourses >= 2) {
      const cycleLength = randomInt(rng, 2, numCourses);
      const indices = Array.from({ length: numCourses }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = randomInt(rng, 0, i);
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const cycleNodes = indices.slice(0, cycleLength);
      for (let i = 0; i < cycleLength; i++) {
        prerequisites.push([cycleNodes[i], cycleNodes[(i + 1) % cycleLength]]);
      }
    }
    const extraEdges = randomInt(rng, 0, numCourses);
    for (let i = 0; i < extraEdges; i++) {
      prerequisites.push([randomInt(rng, 0, numCourses - 1), randomInt(rng, 0, numCourses - 1)]);
    }
  }

  return { numCourses, prerequisites };
}

function generateRandomCases(seed, numCases, maxCourses = 12) {
  const rng = mulberry32(seed);
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    const { numCourses, prerequisites } = generateRandomGraph(rng, maxCourses);
    cases.push([numCourses, prerequisites]);
  }
  return cases;
}

module.exports = {
  mulberry32,
  randomInt,
  clonePrerequisites,
  canFinishReference,
  generateRandomCases,
};
