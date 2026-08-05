/**
 * Alternative O(n) time / O(n) space solution using a running prefix sum
 * and a hash map of "how many times has this prefix sum occurred so far".
 * A subarray (i, j] sums to k exactly when prefixSum[j] - prefixSum[i] === k,
 * so at each j we look up how many earlier prefix sums equal
 * (runningSum - k).
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {}

module.exports = { subarraySum };
