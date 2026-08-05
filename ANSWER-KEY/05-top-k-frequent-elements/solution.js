/**
 * Basic approach: hash map to count frequencies, then a min-heap of size
 * k to track the k most frequent elements seen so far (popping the
 * smallest whenever the heap grows past k). O(n log k) time.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  // Min-heap of [num, count] pairs, ordered by count.
  const heap = [];

  function bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent][1] <= heap[i][1]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  function bubbleDown(i) {
    const n = heap.length;
    for (;;) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && heap[left][1] < heap[smallest][1]) smallest = left;
      if (right < n && heap[right][1] < heap[smallest][1]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }

  function push(item) {
    heap.push(item);
    bubbleUp(heap.length - 1);
  }

  function pop() {
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      bubbleDown(0);
    }
  }

  for (const entry of freq.entries()) {
    push(entry);
    if (heap.length > k) pop();
  }

  return heap.map(([num]) => num);
}

module.exports = { topKFrequent };
