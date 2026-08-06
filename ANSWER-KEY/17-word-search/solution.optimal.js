/**
 * Alternative approach: DFS backtracking with in-place marking instead of a
 * separate visited structure. While visiting a cell, temporarily overwrite
 * it with a sentinel character ('#', guaranteed not to appear in valid
 * input letters) so it can't be reused later in the same path, then restore
 * the original character when backtracking out of that cell (including on
 * early-return success paths, so the board is always fully restored before
 * exist() returns). O(rows * cols * 4^L) time worst case (L = word length),
 * O(L) extra space for the recursion stack only.
 *
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  if (!board || board.length === 0 || board[0].length === 0) return false;
  const rows = board.length;
  const cols = board[0].length;
  const SENTINEL = '#';

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[index]) return false;

    const original = board[r][c];
    board[r][c] = SENTINEL;

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    board[r][c] = original;

    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

module.exports = { exist };
