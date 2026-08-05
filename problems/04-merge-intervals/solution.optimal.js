/**
 * Alternative approach: sweep line over boundary events instead of
 * sorting the intervals themselves. Each interval [start, end] becomes a
 * +1 event at `start` and a -1 event at `end`. Sort all events by
 * position (processing -1 before +1 on ties so a touching interval like
 * [1,4] and [4,5] still merges), sweep left to right tracking the number
 * of currently-open intervals, and start/close a merged interval
 * whenever that count transitions to/from zero.
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  // TODO: implement
}

module.exports = { merge };
