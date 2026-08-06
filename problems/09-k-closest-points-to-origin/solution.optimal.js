/**
 * Alternative approach: quickselect. Rather than fully sorting every point
 * by distance, partition the points array around a pivot's squared
 * distance (like the partition step of quicksort) so everything closer
 * than the pivot ends up to its left and everything farther ends up to
 * its right. Only recurse into the side of the partition that still
 * contains the k-th smallest distance, discarding the other side
 * entirely, until the first k positions hold exactly the k closest points.
 *
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
  // TODO: implement
}

module.exports = { kClosest };
