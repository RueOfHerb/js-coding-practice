/**
 * Alternative approach: sweep line over boundary events instead of
 * sorting the intervals themselves. Each interval [start, end] becomes a
 * "start" event and an "end" event. Events are sorted by position, with
 * starts processed before ends on ties (so a touching interval like
 * [1,4] and [4,5] still merges: the second interval's start is seen
 * before the first interval's end). Sweeping left to right, a merged
 * interval opens when the active count goes from 0 to 1, and closes
 * when it drops back to 0.
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length === 0) return [];

  const START = 0;
  const END = 1;
  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, START]);
    events.push([end, END]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const result = [];
  let active = 0;
  let mergedStart = null;

  for (const [position, type] of events) {
    if (type === START) {
      if (active === 0) mergedStart = position;
      active++;
    } else {
      active--;
      if (active === 0) {
        result.push([mergedStart, position]);
      }
    }
  }

  return result;
}

module.exports = { merge };
