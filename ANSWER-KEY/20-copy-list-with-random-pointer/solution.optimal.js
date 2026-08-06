class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Alternative approach: O(1) extra space weaving technique. Pass 1: weave a
 * clone directly after each original node (A -> B -> C becomes
 * A -> A' -> B -> B' -> C -> C'). Pass 2: with every clone sitting right
 * after its original, set each clone's random in O(1) via
 * original.random.next (that is exactly the clone of original.random).
 * Pass 3: unweave the interleaved list back into the original list (restore
 * its next pointers) and the cloned list (wire clone next pointers
 * together), taking care to terminate the clone list with null. O(n) time,
 * O(1) extra space (excluding the output list itself).
 *
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
  if (!head) return null;

  // Pass 1: interleave clones after their originals.
  let current = head;
  while (current) {
    const clone = new Node(current.val, current.next);
    current.next = clone;
    current = clone.next;
  }

  // Pass 2: wire up random pointers using the interleaving.
  current = head;
  while (current) {
    const clone = current.next;
    clone.random = current.random ? current.random.next : null;
    current = clone.next;
  }

  // Pass 3: unweave into the original list and the cloned list.
  current = head;
  const cloneHead = head.next;
  while (current) {
    const clone = current.next;
    current.next = clone.next;
    clone.next = clone.next ? clone.next.next : null;
    current = current.next;
  }

  return cloneHead;
}

module.exports = { copyRandomList, Node };
