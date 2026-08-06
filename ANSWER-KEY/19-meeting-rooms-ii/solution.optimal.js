/**
 * Alternative approach: min-heap of room end times. Sort meetings by start
 * time and use a min-heap keyed on end time to track currently-occupied
 * rooms. For each meeting, if the room that frees up soonest (the heap's
 * minimum) has already ended by this meeting's start time, pop it (that
 * room is reused); either way, push this meeting's end time onto the heap.
 * The final heap size is the answer. O(n log n) time, O(n) space.
 *
 * @param {number[][]} intervals
 * @return {number}
 */

// Small private min-heap keyed on plain numbers (room end times), scoped to
// this file so the problem has no external dependency.
class MinHeap {
  constructor() {
    this.data = [];
  }

  get size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    let i = this.data.length - 1;

    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[parent] <= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      const n = this.data.length;
      let moved = true;

      while (moved) {
        moved = false;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;

        if (left < n && this.data[left] < this.data[smallest]) smallest = left;
        if (right < n && this.data[right] < this.data[smallest]) smallest = right;

        if (smallest !== i) {
          [this.data[smallest], this.data[i]] = [this.data[i], this.data[smallest]];
          i = smallest;
          moved = true;
        }
      }
    }

    return top;
  }
}

function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const roomEndTimes = new MinHeap();

  for (const [start, end] of sorted) {
    if (roomEndTimes.size > 0 && roomEndTimes.peek() <= start) {
      roomEndTimes.pop();
    }
    roomEndTimes.push(end);
  }

  return roomEndTimes.size;
}

module.exports = { minMeetingRooms };
