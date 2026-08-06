class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Basic approach: preorder DFS. serialize walks root, then left, then
 * right, appending each value to an array ("#" for a null child), then
 * joins the array into a comma-separated string. deserialize splits the
 * string back into tokens and consumes them left-to-right with a shared
 * index while recursively rebuilding the tree in that same preorder
 * (root, then left, then right). O(n) time and O(n) space for both
 * directions (n = number of nodes).
 */
class Codec {
  /**
   * Encodes a tree to a single string.
   * @param {TreeNode|null} root
   * @return {string}
   */
  serialize(root) {
    const values = [];

    const dfs = (node) => {
      if (node === null) {
        values.push('#');
        return;
      }
      values.push(String(node.val));
      dfs(node.left);
      dfs(node.right);
    };

    dfs(root);
    return values.join(',');
  }

  /**
   * Decodes your encoded data to tree.
   * @param {string} data
   * @return {TreeNode|null}
   */
  deserialize(data) {
    const values = data.split(',');
    let index = 0;

    const build = () => {
      const value = values[index];
      index++;

      if (value === '#') {
        return null;
      }

      const node = new TreeNode(Number(value));
      node.left = build();
      node.right = build();
      return node;
    };

    return build();
  }
}

module.exports = { Codec, TreeNode };
