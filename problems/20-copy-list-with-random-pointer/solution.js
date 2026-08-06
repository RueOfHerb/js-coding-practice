class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * A linked list of n nodes is given, where each node contains an additional
 * random pointer, which could point to any node in the list, or null.
 *
 * Construct a deep copy of the list. The deep copy should consist of exactly
 * n brand new nodes, where each new node has its value set to the value of
 * its corresponding original node. Both the next and random pointer of the
 * new nodes should point to new nodes in the copied list such that the
 * pointers in the original list and copied list represent the same list
 * state. None of the pointers in the new list should point to nodes in the
 * original list.
 *
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
  // TODO: implement
}

module.exports = { copyRandomList, Node };
