/**
 * Alternative approach: maintain a min-heap of size k as you scan nums.
 * Push each value onto the heap, and whenever the heap grows past size k,
 * pop the minimum off. Once every element has been processed, the heap
 * holds exactly the k largest values seen so far, and its root (the
 * smallest of those k) is the kth largest element overall.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // TODO: implement
}

module.exports = { findKthLargest };
