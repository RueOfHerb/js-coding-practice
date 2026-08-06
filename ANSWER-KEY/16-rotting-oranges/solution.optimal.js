/**
 * Alternative approach: multi-source BFS. Seed the queue with the
 * coordinates of every rotten orange at once and count the fresh oranges up
 * front. Process the queue level by level, where each level is exactly one
 * minute: for every cell in the current level, rot its fresh neighbors,
 * decrement the fresh count, and enqueue them for the next level. Advance
 * the clock once per level that actually rotted something. O(rows * cols)
 * time, O(rows * cols) space for the queue.
 *
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;

  let queue = [];
  let freshCount = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      } else if (grid[r][c] === 1) {
        freshCount++;
      }
    }
  }

  let minutes = 0;

  while (queue.length > 0 && freshCount > 0) {
    const nextQueue = [];

    for (const [r, c] of queue) {
      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];
      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          freshCount--;
          nextQueue.push([nr, nc]);
        }
      }
    }

    if (nextQueue.length > 0) {
      minutes++;
    }
    queue = nextQueue;
  }

  return freshCount === 0 ? minutes : -1;
}

module.exports = { orangesRotting };
