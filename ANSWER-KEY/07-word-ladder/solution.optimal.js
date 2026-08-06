/**
 * Alternative approach: bidirectional BFS. Maintain two frontiers (each a
 * Set of words reachable in the same number of steps) -- one grown forward
 * from beginWord, one grown backward from endWord -- and always expand
 * whichever frontier is smaller. For every word in the frontier being
 * expanded, generate all L * 26 single-letter substitution patterns and
 * check each one against the opposite frontier (a hit means the two
 * searches have met) and against the pool of remaining dictionary words (a
 * hit there gets added to the next frontier and removed from the pool).
 * Stopping as soon as the frontiers meet keeps the explored search space
 * roughly the square root of a single-direction BFS's in the average
 * case. Worst-case time is O(N * L * 26) ~= O(N * L), space is O(N) for
 * the word set and frontiers.
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  if (beginWord === endWord) return 1;

  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  wordSet.delete(beginWord);
  wordSet.delete(endWord);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let frontStart = new Set([beginWord]);
  let frontEnd = new Set([endWord]);
  let length = 1;

  while (frontStart.size > 0 && frontEnd.size > 0) {
    if (frontStart.size > frontEnd.size) {
      [frontStart, frontEnd] = [frontEnd, frontStart];
    }

    const nextFront = new Set();

    for (const word of frontStart) {
      const chars = word.split('');

      for (let i = 0; i < chars.length; i++) {
        const original = chars[i];

        for (const letter of alphabet) {
          if (letter === original) continue;
          chars[i] = letter;
          const candidate = chars.join('');

          if (frontEnd.has(candidate)) {
            return length + 1;
          }

          if (wordSet.has(candidate)) {
            wordSet.delete(candidate);
            nextFront.add(candidate);
          }
        }

        chars[i] = original;
      }
    }

    frontStart = nextFront;
    length++;
  }

  return 0;
}

module.exports = { ladderLength };
