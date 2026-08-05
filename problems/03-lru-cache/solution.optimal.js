/**
 * Alternative approach: rely on the fact that a JS Map iterates keys in
 * insertion order, and re-inserting an existing key moves it to the end
 * of that order. That gives you recency tracking "for free": on every
 * get/put, delete the key (if present) and re-set it so it becomes the
 * most-recently-inserted entry. The least-recently-used key is then
 * always the first one Map iterates.
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    // TODO: implement
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    // TODO: implement
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    // TODO: implement
  }
}

module.exports = { LRUCache };
