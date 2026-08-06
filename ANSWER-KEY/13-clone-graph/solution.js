class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Basic approach: BFS with a Map<originalNode, cloneNode> as both the
 * visited set and the memo of clones created so far. Clone the start
 * node and enqueue the original start node. While the queue isn't
 * empty, dequeue an original node and, for each of its neighbors,
 * clone it (if not already cloned) and enqueue the original neighbor,
 * then attach the neighbor's clone to the current node's clone.
 * O(V + E) time, O(V) space.
 *
 * @param {Node|null} node
 * @return {Node|null}
 */
function cloneGraph(node) {
  if (!node) return null;

  const cloned = new Map();
  cloned.set(node, new Node(node.val));

  const queue = [node];
  while (queue.length > 0) {
    const current = queue.shift();

    for (const neighbor of current.neighbors) {
      if (!cloned.has(neighbor)) {
        cloned.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }
      cloned.get(current).neighbors.push(cloned.get(neighbor));
    }
  }

  return cloned.get(node);
}

module.exports = { cloneGraph, Node };
