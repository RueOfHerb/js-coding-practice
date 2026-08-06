/**
 * Alternative approach: quickselect. Partition the points array in place
 * around a pivot's squared distance (Lomuto partition scheme), so that
 * after partitioning every point to the left of the pivot's final index is
 * at least as close as the pivot and every point to the right is at least
 * as far. Only recurse into whichever side still contains index k - 1;
 * once the pivot lands exactly at index k - 1, the first k positions hold
 * the k closest points (not necessarily sorted among themselves).
 * O(n) average time, O(1) extra space (sort is done in place).
 *
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
  const distSq = ([x, y]) => x * x + y * y;

  function partition(left, right, pivotIndex) {
    const pivotDist = distSq(points[pivotIndex]);
    [points[pivotIndex], points[right]] = [points[right], points[pivotIndex]];

    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (distSq(points[i]) < pivotDist) {
        [points[storeIndex], points[i]] = [points[i], points[storeIndex]];
        storeIndex++;
      }
    }

    [points[right], points[storeIndex]] = [points[storeIndex], points[right]];
    return storeIndex;
  }

  function quickSelect(left, right, kSmallest) {
    if (left === right) return;

    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const finalIndex = partition(left, right, pivotIndex);

    if (finalIndex === kSmallest) {
      return;
    } else if (finalIndex < kSmallest) {
      quickSelect(finalIndex + 1, right, kSmallest);
    } else {
      quickSelect(left, finalIndex - 1, kSmallest);
    }
  }

  if (k >= points.length) return points.slice();

  quickSelect(0, points.length - 1, k - 1);

  return points.slice(0, k);
}

module.exports = { kClosest };
