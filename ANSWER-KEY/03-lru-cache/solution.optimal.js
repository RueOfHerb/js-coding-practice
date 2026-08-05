/**
 * Alternative approach: rely on the fact that a JS Map iterates keys in
 * insertion order, and re-inserting an existing key moves it to the end
 * of that order. On every get/put, delete the key (if present) and
 * re-set it so it becomes the most-recently-inserted entry. The
 * least-recently-used key is then always the first one Map iterates.
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const leastRecentlyUsedKey = this.map.keys().next().value;
      this.map.delete(leastRecentlyUsedKey);
    }
    this.map.set(key, value);
  }
}

module.exports = { LRUCache };
