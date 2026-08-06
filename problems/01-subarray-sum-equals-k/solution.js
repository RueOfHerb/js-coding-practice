/**
 * Given an integer array nums and an integer k, return the total number of
 * contiguous subarrays whose sum equals k.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  var subarrays = 0;

  nums.forEach((num, i) => {
    //Look forward until sum equals k or end of array.
    var runningTotal = num;

    if (k == num) {
      subarrays += 1;
    }

    for (let j = i + 1; j < nums.length; j++) {
      runningTotal += nums[j];

      if (runningTotal == k) {
        subarrays++;
      }
    }
  });
  return subarrays;
}

module.exports = { subarraySum };
