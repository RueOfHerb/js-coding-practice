const { ladderLength } = require('../../problems/07-word-ladder/solution');
const { generateRandomCases, referenceLadderLength } = require('./testUtils');

test('classic example transforms hit to cog in 5 steps', () => {
  expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toBe(5);
});

test('returns 0 when endWord is not in wordList', () => {
  expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])).toBe(0);
});

test('beginWord equal to endWord returns 1', () => {
  expect(ladderLength('hit', 'hit', ['hot', 'dot', 'hit'])).toBe(1);
});

test('single-letter word transformation', () => {
  expect(ladderLength('a', 'b', ['a', 'b'])).toBe(2);
});

test('no possible path returns 0', () => {
  expect(ladderLength('hit', 'zzz', ['hot', 'dot', 'dog', 'lot', 'log', 'zzz'])).toBe(0);
});

test('wordList containing beginWord itself is fine', () => {
  expect(ladderLength('hit', 'cog', ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toBe(5);
});

test('empty wordList returns 0', () => {
  expect(ladderLength('hit', 'cog', [])).toBe(0);
});

test('direct one-letter transformation', () => {
  expect(ladderLength('hot', 'dot', ['hot', 'dot'])).toBe(2);
});

test('endWord present but unreachable from beginWord', () => {
  expect(ladderLength('hit', 'cog', ['cog'])).toBe(0);
});

test('multiple equally short paths still returns the shortest length', () => {
  expect(ladderLength('cat', 'cot', ['cat', 'bat', 'cot'])).toBe(2);
});

// --- Randomized (property-based) testing ---
//
// The hand-picked cases above only cover the edge cases we thought of.
// Below, we generate many random (beginWord, endWord, wordList) triples and
// check ladderLength against an independent, deliberately-simple reference
// implementation (obviously correct by inspection, even though it's not the
// approach we want as the final solution). If the two ever disagree,
// the failing case name tells you exactly which triple to debug.
//
// A fixed seed keeps the generated cases identical on every run, so
// failures are reproducible instead of flaky.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)(
  'random case %#: beginWord=%j endWord=%j wordList=%j',
  (beginWord, endWord, wordList) => {
    expect(ladderLength(beginWord, endWord, wordList)).toBe(
      referenceLadderLength(beginWord, endWord, wordList)
    );
  }
);
