class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Alternative approach: iterative level-order (BFS) traversal driven by a
 * queue instead of recursion. Walk the tree level by level, recording each
 * node's value (or a null marker for a missing child) as soon as it's
 * dequeued, then push its children onto the queue. Rebuilding works the
 * same way in reverse: read values off in the same order, attaching each
 * one as a child of the next node waiting in the queue. This sidesteps
 * recursion depth entirely, which matters for very deep, unbalanced trees
 * where a preorder recursive approach could overflow the call stack.
 */
class Codec {
  /**
   * Encodes a tree to a single string.
   * @param {TreeNode|null} root
   * @return {string}
   */
  serialize(root) {
    // TODO: implement
  }

  /**
   * Decodes your encoded data to tree.
   * @param {string} data
   * @return {TreeNode|null}
   */
  deserialize(data) {
    // TODO: implement
  }
}

module.exports = { Codec, TreeNode };
