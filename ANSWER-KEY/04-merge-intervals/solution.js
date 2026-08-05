/**
 * Basic approach: sort by start, then sweep left to right, extending the
 * last merged interval whenever the next one overlaps (or touches) it.
 * O(n log n) time.
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length === 0) return [];

  const sorted = intervals.map((iv) => iv.slice()).sort((a, b) => a[0] - b[0]);
  const result = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

module.exports = { merge };
