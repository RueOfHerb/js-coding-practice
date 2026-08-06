class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Serialization is the process of converting a data structure or object
 * into a sequence of bits so that it can be stored in a file or memory
 * buffer, or transmitted across a network connection link to be
 * reconstructed later in the same or another computer environment.
 *
 * Design an algorithm to serialize and deserialize a binary tree. There is
 * no restriction on how your serialization/deserialization algorithm
 * should work. You just need to ensure that a binary tree can be
 * serialized to a string and this string can be deserialized to the
 * original tree structure (same node values, same left/right shape).
 *
 * Example:
 *   Input: root = [1,2,3,null,null,4,5]
 *   Output: [1,2,3,null,null,4,5]
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
