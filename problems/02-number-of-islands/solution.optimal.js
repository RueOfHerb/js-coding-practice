/**
 * Alternative approach: Union-Find (Disjoint Set Union).
 * Give each land cell an index (r * cols + c). Union each land cell with
 * its land neighbors to the right and below (checking both directions
 * covers every adjacency exactly once). The answer is the number of
 * distinct roots among land cells once every union has been processed.
 *
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // TODO: implement
}

module.exports = { numIslands };
