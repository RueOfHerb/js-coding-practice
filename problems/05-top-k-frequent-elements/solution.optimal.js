/**
 * Alternative approach: bucket sort, O(n) time instead of the
 * O(n log n) (or O(n log k)) a heap gives you. Count frequencies with a
 * hash map, then create `nums.length + 1` buckets where bucket[f] holds
 * every value whose frequency is exactly f (frequency can never exceed
 * nums.length). Walk the buckets from the highest frequency down,
 * collecting values until you have k of them.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // TODO: implement
}

module.exports = { topKFrequent };
