/**
 * Basic approach: sort meetings by start time. Maintain an array of the end
 * times of currently-in-use rooms. For each meeting, scan the rooms for one
 * whose end time is <= this meeting's start time (that room has freed up)
 * and reuse it; if none is free, allocate a new room. O(n^2) time (the scan
 * is O(n) per meeting), O(n) space.
 *
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const roomEndTimes = [];

  for (const [start, end] of sorted) {
    let reusedRoom = false;

    for (let i = 0; i < roomEndTimes.length; i++) {
      if (roomEndTimes[i] <= start) {
        roomEndTimes[i] = end;
        reusedRoom = true;
        break;
      }
    }

    if (!reusedRoom) {
      roomEndTimes.push(end);
    }
  }

  return roomEndTimes.length;
}

module.exports = { minMeetingRooms };
