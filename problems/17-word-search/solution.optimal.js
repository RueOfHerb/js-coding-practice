/**
 * Alternative approach: DFS backtracking with in-place marking. Instead of a
 * separate visited structure, temporarily overwrite the current cell in the
 * board with a sentinel character while exploring its neighbors, then
 * restore the original character on the way back out. This trades a bit of
 * extra bookkeeping (careful restoration) for dropping the Set/matrix.
 *
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  // TODO: implement
}

module.exports = { exist };
