// Shared test infrastructure for validating alternative solutions to this
// problem against each other. Not a test file itself (no `test(...)` calls),
// so Jest won't try to run it directly.

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

// Independent reference implementation (single-direction BFS, O(N) neighbor
// scan). Deliberately simple and obviously correct by inspection, even
// though it's not the approach we want as the final solution.
function referenceLadderLength(beginWord, endWord, wordList) {
  if (beginWord === endWord) return 1;

  const dictionary = new Set(wordList);
  if (!dictionary.has(endWord)) return 0;

  const visited = new Set([beginWord]);
  let frontier = [beginWord];
  let steps = 1;

  while (frontier.length > 0) {
    const next = [];

    for (const word of frontier) {
      for (const candidate of dictionary) {
        if (visited.has(candidate)) continue;
        if (isOneLetterApart(word, candidate)) {
          if (candidate === endWord) return steps + 1;
          visited.add(candidate);
          next.push(candidate);
        }
      }
    }

    frontier = next;
    steps++;
  }

  return 0;
}

function isOneLetterApart(wordA, wordB) {
  let differences = 0;

  for (let i = 0; i < wordA.length; i++) {
    if (wordA[i] !== wordB[i]) {
      differences++;
      if (differences > 1) return false;
    }
  }

  return differences === 1;
}

function randomWord(rng, letters, length) {
  let word = '';
  for (let i = 0; i < length; i++) {
    word += letters[randomInt(rng, 0, letters.length - 1)];
  }
  return word;
}

// Generates seeded (beginWord, endWord, wordList) triples of same-length
// lowercase words. A small alphabet keeps words densely connected (so many
// cases are solvable), while endWord is only sometimes drawn from the list
// (so a meaningful fraction of cases are unsolvable too).
function generateRandomCases(seed, numCases) {
  const rng = mulberry32(seed);
  const cases = [];

  for (let i = 0; i < numCases; i++) {
    const wordLength = randomInt(rng, 3, 5);
    const alphabetSize = randomInt(rng, 3, 6);
    const letters = 'abcdefghijklmnopqrstuvwxyz'.slice(0, alphabetSize);

    const listSize = randomInt(rng, 2, 12);
    const wordSet = new Set();
    while (wordSet.size < listSize) {
      wordSet.add(randomWord(rng, letters, wordLength));
    }
    const wordList = Array.from(wordSet);

    const beginWord = randomWord(rng, letters, wordLength);

    let endWord;
    if (wordList.length > 0 && rng() < 0.7) {
      // Bias toward endWord actually being in the list, so a meaningful
      // fraction of the generated cases are solvable.
      endWord = wordList[randomInt(rng, 0, wordList.length - 1)];
    } else {
      endWord = randomWord(rng, letters, wordLength);
    }

    // Occasionally seed the list with beginWord itself, to exercise the
    // "wordList contains beginWord" edge case.
    if (rng() < 0.3) {
      wordList.push(beginWord);
    }

    cases.push([beginWord, endWord, wordList]);
  }

  return cases;
}

module.exports = { mulberry32, randomInt, referenceLadderLength, generateRandomCases };
