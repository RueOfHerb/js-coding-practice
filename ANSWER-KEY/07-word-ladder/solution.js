/**
 * Basic approach: level-order BFS where, at each step, a word's neighbors
 * are found by scanning every remaining candidate word in the dictionary
 * and checking whether it differs from the current word by exactly one
 * letter. Each discovered neighbor is removed from the candidate pool so
 * it's never revisited. O(N^2 * L) time (N = wordList size, L = word
 * length, since each of up to N words can require an O(N * L) scan to find
 * its neighbors), O(N) space for the candidate set and BFS queue.
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  if (beginWord === endWord) return 1;

  const remaining = new Set(wordList);
  if (!remaining.has(endWord)) return 0;
  remaining.delete(beginWord);

  let currentLevel = [beginWord];
  let length = 1;

  while (currentLevel.length > 0) {
    const nextLevel = [];

    for (const word of currentLevel) {
      for (const candidate of Array.from(remaining)) {
        if (differsByOneLetter(word, candidate)) {
          if (candidate === endWord) return length + 1;
          nextLevel.push(candidate);
          remaining.delete(candidate);
        }
      }
    }

    currentLevel = nextLevel;
    length++;
  }

  return 0;
}

function differsByOneLetter(wordA, wordB) {
  let differences = 0;

  for (let i = 0; i < wordA.length; i++) {
    if (wordA[i] !== wordB[i]) {
      differences++;
      if (differences > 1) return false;
    }
  }

  return differences === 1;
}

module.exports = { ladderLength };
