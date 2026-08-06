class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Alternative approach: DFS recursion with a Map<originalNode, cloneNode>
 * as both the visited set and the memo. clone(node) returns the existing
 * clone immediately if node is already in the map (this is what handles
 * cycles without infinite recursion); otherwise it creates the clone and
 * stores it in the map BEFORE recursing into node's neighbors, then
 * recursively clones each neighbor and pushes the result into the
 * clone's neighbors array. Same O(V + E) time, O(V) space as BFS, just
 * driven by the call stack instead of an explicit queue.
 *
 * @param {Node|null} node
 * @return {Node|null}
 */
function cloneGraph(node) {
  if (!node) return null;

  const cloned = new Map();

  function clone(original) {
    if (cloned.has(original)) return cloned.get(original);

    const copy = new Node(original.val);
    cloned.set(original, copy);

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(clone(neighbor));
    }

    return copy;
  }

  return clone(node);
}

module.exports = { cloneGraph, Node };
