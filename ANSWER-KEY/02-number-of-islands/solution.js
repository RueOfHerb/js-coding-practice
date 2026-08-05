/**
 * Basic approach: DFS flood fill. For every unvisited land cell, count a
 * new island and recursively sink every land cell connected to it
 * (marking visited cells as water so they're never counted again).
 * O(rows * cols) time and space (call stack).
 *
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function sink(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        sink(r, c);
      }
    }
  }

  return count;
}

module.exports = { numIslands };
