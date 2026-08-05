/**
 * Alternative approach: bucket sort, O(n) time instead of the
 * O(n log k) a heap gives you. Count frequencies with a hash map, then
 * create `nums.length + 1` buckets where bucket[f] holds every value
 * whose frequency is exactly f (frequency can never exceed nums.length).
 * Walk the buckets from the highest frequency down, collecting values
 * until there are k of them.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq.entries()) {
    buckets[count].push(num);
  }

  const result = [];
  for (let count = buckets.length - 1; count >= 0 && result.length < k; count--) {
    for (const num of buckets[count]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}

module.exports = { topKFrequent };
