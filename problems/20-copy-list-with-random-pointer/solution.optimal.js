class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Alternative approach: O(1) extra space weaving technique. Instead of a
 * hash map, interleave each cloned node directly after its original node so
 * the clone is reachable from the original without any auxiliary storage.
 * Use that interleaving to wire up the random pointers, then make a final
 * pass to unweave the two lists back apart, restoring the original list and
 * producing the fully independent cloned list.
 *
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
  // TODO: implement
}

module.exports = { copyRandomList, Node };
