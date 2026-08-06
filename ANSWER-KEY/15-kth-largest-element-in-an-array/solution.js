/**
 * Basic approach: sort a copy of nums in descending order and read off the
 * element at index k - 1. O(n log n) time, O(n) space (for the copy).
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}

module.exports = { findKthLargest };
