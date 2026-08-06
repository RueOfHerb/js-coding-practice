class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Given a reference to a node in a connected undirected graph, return a deep
 * copy (clone) of the graph. Each node in the graph contains a value (val)
 * and a list of its neighbors (neighbors). The cloned graph must be built
 * entirely out of new nodes -- none of the returned nodes may be the same
 * object as any node in the original graph -- but must be structurally
 * identical to the original.
 *
 * @param {Node|null} node
 * @return {Node|null}
 */
function cloneGraph(node) {
  // TODO: implement
}

module.exports = { cloneGraph, Node };
