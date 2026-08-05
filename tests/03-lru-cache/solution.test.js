const { LRUCache } = require('../../problems/03-lru-cache/solution');
const { ReferenceLRUCache, generateRandomOperationSequences } = require('./testUtils');

test('example from prompt', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  expect(cache.get(1)).toBe(1);
  cache.put(3, 3); // evicts key 2
  expect(cache.get(2)).toBe(-1);
  cache.put(4, 4); // evicts key 1
  expect(cache.get(1)).toBe(-1);
  expect(cache.get(3)).toBe(3);
  expect(cache.get(4)).toBe(4);
});

test('put updates existing key and refreshes recency', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  cache.put(1, 10); // key 1 is now most recently used
  cache.put(3, 3); // evicts key 2
  expect(cache.get(2)).toBe(-1);
  expect(cache.get(1)).toBe(10);
  expect(cache.get(3)).toBe(3);
});

test('get on an empty cache returns -1', () => {
  const cache = new LRUCache(2);
  expect(cache.get(1)).toBe(-1);
});

test('capacity of 1 evicts on every new key', () => {
  const cache = new LRUCache(1);
  cache.put(1, 1);
  cache.put(2, 2);
  expect(cache.get(1)).toBe(-1);
  expect(cache.get(2)).toBe(2);
});

test('get refreshes recency and protects a key from eviction', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  cache.get(1); // 1 is now most recently used, 2 is least recently used
  cache.put(3, 3); // should evict 2, not 1
  expect(cache.get(2)).toBe(-1);
  expect(cache.get(1)).toBe(1);
  expect(cache.get(3)).toBe(3);
});

test('putting an existing key does not change capacity usage', () => {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(1, 2);
  cache.put(1, 3);
  cache.put(2, 2);
  expect(cache.get(1)).toBe(3);
  expect(cache.get(2)).toBe(2);
});

// --- Randomized (property-based) testing ---
//
// Runs many random sequences of get/put operations against both the
// solution under test and an independent, deliberately simple reference
// LRU cache, asserting every get() call returns the same value from
// both. This exercises eviction order and recency-refresh behavior far
// more thoroughly than a handful of hand-written scenarios could. A fixed
// seed keeps sequences reproducible across runs.

const randomSequences = generateRandomOperationSequences(42, 30, 40);

test.each(randomSequences)(
  'random operation sequence %#: capacity=$capacity',
  ({ capacity, ops }) => {
    const userCache = new LRUCache(capacity);
    const refCache = new ReferenceLRUCache(capacity);

    ops.forEach((op) => {
      if (op.type === 'get') {
        expect(userCache.get(op.key)).toBe(refCache.get(op.key));
      } else {
        userCache.put(op.key, op.value);
        refCache.put(op.key, op.value);
      }
    });
  }
);
