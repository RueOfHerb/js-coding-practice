/**
 * Basic approach: hash map (key -> node) + doubly linked list ordered by
 * recency. The list's head side is most-recently-used, tail side is
 * least-recently-used, so both get and put run in O(1).
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // Dummy head/tail sentinels so add/remove never need null checks.
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._addToFront(node);
    return node.value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._remove(node);
      this._addToFront(node);
      return;
    }

    if (this.map.size >= this.capacity) {
      const leastRecentlyUsed = this.tail.prev;
      this._remove(leastRecentlyUsed);
      this.map.delete(leastRecentlyUsed.key);
    }

    const node = new Node(key, value);
    this.map.set(key, node);
    this._addToFront(node);
  }
}

module.exports = { LRUCache };
