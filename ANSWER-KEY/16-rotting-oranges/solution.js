/**
 * Basic approach: simulate minute-by-minute. On each pass, scan the entire
 * grid to find fresh oranges adjacent to a rotten orange, collect them
 * without mutating mid-scan (so rot doesn't cascade within the same
 * minute), then flip them all to rotten and advance the clock. Repeat until
 * a full scan produces no newly-rotten oranges. O((rows * cols)^2) time in
 * the worst case (up to rows * cols scans, each O(rows * cols)), O(rows *
 * cols) space for the per-minute list of newly-rotten cells.
 *
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;

  const isAdjacentToRotten = (r, c) => {
    const neighbors = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];
    return neighbors.some(
      ([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 2
    );
  };

  let minutes = 0;
  let toRot = [];

  do {
    toRot = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1 && isAdjacentToRotten(r, c)) {
          toRot.push([r, c]);
        }
      }
    }

    if (toRot.length > 0) {
      for (const [r, c] of toRot) {
        grid[r][c] = 2;
      }
      minutes++;
    }
  } while (toRot.length > 0);

  const hasFresh = grid.some((row) => row.some((cell) => cell === 1));
  return hasFresh ? -1 : minutes;
}

module.exports = { orangesRotting };
