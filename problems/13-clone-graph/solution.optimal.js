class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Alternative approach: DFS recursion instead of BFS. Keep a
 * Map<originalNode, cloneNode> as both a visited set and a memo. A
 * recursive helper clones the current node (if not already cloned),
 * stores it in the map before recursing into its neighbors -- this is
 * what keeps a cycle in the graph from causing infinite recursion -- and
 * then recursively clones each neighbor, attaching the results to the
 * current clone's neighbors array.
 *
 * @param {Node|null} node
 * @return {Node|null}
 */
function cloneGraph(node) {
  // TODO: implement
}

module.exports = { cloneGraph, Node };
