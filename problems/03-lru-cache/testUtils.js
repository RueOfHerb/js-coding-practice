// Shared test infrastructure: an independent reference LRU cache plus a
// seeded random-operation-sequence generator, so both solution.js and
// solution.optimal.js can be checked against the same sequences without
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

// Deliberately simple, O(n)-per-operation reference: a plain array of
// [key, value] pairs kept in recency order (most-recently-used at the
// end). Correct by inspection, independent of the hash-map + linked-list
// or Map-insertion-order techniques the actual solutions are meant to use.
class ReferenceLRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.entries = [];
  }

  get(key) {
    const idx = this.entries.findIndex(([k]) => k === key);
    if (idx === -1) return -1;
    const [, value] = this.entries[idx];
    this.entries.splice(idx, 1);
    this.entries.push([key, value]);
    return value;
  }

  put(key, value) {
    const idx = this.entries.findIndex(([k]) => k === key);
    if (idx !== -1) {
      this.entries.splice(idx, 1);
    } else if (this.entries.length >= this.capacity) {
      this.entries.shift(); // evict least-recently-used
    }
    this.entries.push([key, value]);
  }
}

function generateRandomOperationSequences(seed, numSequences, opsPerSequence = 40) {
  const rng = mulberry32(seed);
  const sequences = [];
  for (let s = 0; s < numSequences; s++) {
    const capacity = randomInt(rng, 1, 5);
    // Key universe bigger than capacity so eviction actually gets exercised.
    const keyUniverse = capacity + randomInt(rng, 1, 3);
    const ops = [];
    for (let i = 0; i < opsPerSequence; i++) {
      const key = randomInt(rng, 0, keyUniverse - 1);
      if (rng() < 0.5) {
        ops.push({ type: 'get', key });
      } else {
        ops.push({ type: 'put', key, value: randomInt(rng, 0, 1000) });
      }
    }
    sequences.push({ capacity, ops });
  }
  return sequences;
}

module.exports = { mulberry32, randomInt, ReferenceLRUCache, generateRandomOperationSequences };
