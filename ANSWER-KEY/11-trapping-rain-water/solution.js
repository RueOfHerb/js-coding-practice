/**
 * Basic approach: for each index, scan left to find the tallest bar at or
 * before it and scan right to find the tallest bar at or after it. The
 * water trapped above that index is bounded by the shorter of those two
 * maxes, minus the bar's own height (floored at 0). Sum over all indices.
 * O(n^2) time, O(1) space.
 *
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  let total = 0;

  for (let i = 0; i < height.length; i++) {
    let leftMax = 0;
    for (let l = 0; l <= i; l++) {
      leftMax = Math.max(leftMax, height[l]);
    }

    let rightMax = 0;
    for (let r = i; r < height.length; r++) {
      rightMax = Math.max(rightMax, height[r]);
    }

    total += Math.max(0, Math.min(leftMax, rightMax) - height[i]);
  }

  return total;
}

module.exports = { trap };
