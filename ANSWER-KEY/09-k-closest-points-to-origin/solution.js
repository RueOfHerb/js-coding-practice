/**
 * Basic approach: compute the squared distance to the origin for every
 * point (skipping the sqrt since it's monotonic and unnecessary for
 * comparison), sort all points ascending by that distance, then take the
 * first k. O(n log n) time, O(n) space (for the sort).
 *
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
  const distSq = ([x, y]) => x * x + y * y;

  const sorted = [...points].sort((a, b) => distSq(a) - distSq(b));

  return sorted.slice(0, k);
}

module.exports = { kClosest };
