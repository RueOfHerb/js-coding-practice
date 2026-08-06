class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Basic approach: two passes with a Map<originalNode, cloneNode>. First
 * pass walks the original list via next, creating a clone for each node
 * (val copied, next/random left null for now) and recording the
 * original -> clone mapping. Second pass walks the original list again and
 * wires up each clone's next and random pointers by looking up the
 * corresponding originals in the map. O(n) time, O(n) space.
 *
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();

  let current = head;
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }

  current = head;
  while (current) {
    const clone = map.get(current);
    clone.next = current.next ? map.get(current.next) : null;
    clone.random = current.random ? map.get(current.random) : null;
    current = current.next;
  }

  return map.get(head);
}

module.exports = { copyRandomList, Node };
