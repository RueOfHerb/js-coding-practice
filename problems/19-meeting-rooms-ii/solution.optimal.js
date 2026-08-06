/**
 * Alternative approach: min-heap of room end times. Sort meetings by start
 * time, then for each meeting check whether the room that frees up soonest
 * (the heap's minimum) has already ended by the time this meeting starts;
 * reuse it if so, otherwise allocate a new room. Keeping the soonest-to-free
 * room at the top of a heap avoids scanning every room for each meeting.
 *
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  // TODO: implement
}

module.exports = { minMeetingRooms };
