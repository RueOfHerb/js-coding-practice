/**
 * Alternative approach: Union-Find (Disjoint Set Union). Give each land
 * cell an index (r * cols + c). Union each land cell with its land
 * neighbors to the right and below (checking both directions covers
 * every adjacency exactly once). The answer is the number of distinct
 * roots among land cells once every union has been processed.
 *
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const index = (r, c) => r * cols + c;

  const parent = Array.from({ length: rows * cols }, (_, i) => i);
  const rank = new Array(rows * cols).fill(0);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) return;
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1') continue;
      if (r + 1 < rows && grid[r + 1][c] === '1') union(index(r, c), index(r + 1, c));
      if (c + 1 < cols && grid[r][c + 1] === '1') union(index(r, c), index(r, c + 1));
    }
  }

  const roots = new Set();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') roots.add(find(index(r, c)));
    }
  }

  return roots.size;
}

module.exports = { numIslands };
