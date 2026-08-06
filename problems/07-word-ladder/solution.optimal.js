/**
 * Alternative approach: bidirectional BFS. Instead of growing a single
 * search frontier from beginWord all the way out to endWord, grow two
 * frontiers at once -- one starting from beginWord, one starting from
 * endWord -- and always expand whichever frontier is currently smaller.
 * For each word in the frontier being expanded, generate every possible
 * one-letter variant (each position substituted with every other letter)
 * and check it against the *other* frontier and against the remaining
 * word set. The instant the two frontiers touch, you've found the
 * shortest path, typically after exploring far fewer words than a
 * one-directional search would.
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  // TODO: implement
}

module.exports = { ladderLength };
