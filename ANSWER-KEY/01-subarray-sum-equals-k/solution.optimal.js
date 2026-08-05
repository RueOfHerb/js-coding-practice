/**
 * Optimal approach: running prefix sum + hash map. A subarray (i, j] sums
 * to k exactly when prefixSum[j] - prefixSum[i] === k, so at each j we
 * look up how many earlier prefix sums equal (runningSum - k).
 * O(n) time, O(n) space.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  const prefixCount = new Map();
  prefixCount.set(0, 1); // empty prefix, needed for subarrays starting at index 0

  let runningSum = 0;
  let count = 0;

  for (const num of nums) {
    runningSum += num;
    const complement = runningSum - k;
    count += prefixCount.get(complement) || 0;
    prefixCount.set(runningSum, (prefixCount.get(runningSum) || 0) + 1);
  }

  return count;
}

module.exports = { subarraySum };
