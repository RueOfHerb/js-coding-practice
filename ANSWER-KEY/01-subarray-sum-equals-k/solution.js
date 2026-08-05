/**
 * Basic approach: brute force. For every starting index, extend a running
 * sum forward one element at a time and check it against k. O(n^2) time,
 * O(1) space.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  let count = 0;

  for (let start = 0; start < nums.length; start++) {
    let sum = 0;
    for (let end = start; end < nums.length; end++) {
      sum += nums[end];
      if (sum === k) count++;
    }
  }

  return count;
}

module.exports = { subarraySum };
