/**
 * Optimal approach: two pointers closing in from both ends, tracking a
 * running leftMax and rightMax. At each step we advance whichever side has
 * the smaller max, because that side's trapped water is fully determined
 * by its own running max (the opposite side is guaranteed tall enough
 * somewhere further along to not be the limiting factor). O(n) time,
 * O(1) space.
 *
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      total += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      total += rightMax - height[right];
      right--;
    }
  }

  return total;
}

module.exports = { trap };
