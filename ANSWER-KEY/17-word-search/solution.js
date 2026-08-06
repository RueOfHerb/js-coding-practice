/**
 * Basic approach: DFS backtracking using a separate visited Set (of
 * "row,col" strings) to track which cells are part of the current path,
 * instead of mutating the board. For every cell matching word[0], recurse
 * into neighbors looking for word[1], word[2], etc., adding each cell to
 * the visited set before recursing and removing it when backtracking out.
 * O(rows * cols * 4^L) time worst case (L = word length), O(L) extra space
 * for the visited set / recursion stack.
 *
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  if (!board || board.length === 0 || board[0].length === 0) return false;
  const rows = board.length;
  const cols = board[0].length;
  const visited = new Set();

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;

    const key = `${r},${c}`;
    if (visited.has(key) || board[r][c] !== word[index]) return false;

    visited.add(key);

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    visited.delete(key);

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
