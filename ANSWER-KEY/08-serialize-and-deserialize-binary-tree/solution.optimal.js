class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Alternative approach: iterative level-order (BFS) traversal using a
 * queue instead of recursion. serialize walks the tree level by level,
 * recording each node's value (or "null" for a missing child) as it's
 * dequeued and pushing that node's children onto the queue. deserialize
 * rebuilds the tree the same way: it reads values off in the same order,
 * attaching each one as the next child of whichever node is currently at
 * the front of the queue. The queue is implemented with a plain array and
 * a read index (instead of Array.prototype.shift) to avoid the O(n) cost
 * of shifting an array on every dequeue. O(n) time and O(n) space (n =
 * number of nodes), same asymptotics as the preorder approach, but this
 * one never recurses, so it can't blow the call stack on very deep,
 * unbalanced trees.
 */
class Codec {
  /**
   * Encodes a tree to a single string.
   * @param {TreeNode|null} root
   * @return {string}
   */
  serialize(root) {
    if (root === null) return 'null';

    const values = [];
    const queue = [root];
    let head = 0;

    while (head < queue.length) {
      const node = queue[head];
      head++;

      if (node === null) {
        values.push('null');
        continue;
      }

      values.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    }

    return values.join(',');
  }

  /**
   * Decodes your encoded data to tree.
   * @param {string} data
   * @return {TreeNode|null}
   */
  deserialize(data) {
    const values = data.split(',');
    if (values[0] === 'null') return null;

    const root = new TreeNode(Number(values[0]));
    const queue = [root];
    let head = 0;
    let index = 1;

    while (head < queue.length) {
      const node = queue[head];
      head++;

      const leftValue = values[index];
      index++;
      if (leftValue !== 'null') {
        node.left = new TreeNode(Number(leftValue));
        queue.push(node.left);
      }

      const rightValue = values[index];
      index++;
      if (rightValue !== 'null') {
        node.right = new TreeNode(Number(rightValue));
        queue.push(node.right);
      }
    }

    return root;
  }
}

module.exports = { Codec, TreeNode };
