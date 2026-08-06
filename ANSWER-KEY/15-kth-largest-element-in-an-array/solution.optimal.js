/**
 * Alternative approach: maintain a min-heap of size k as you scan nums.
 * Push each value onto the heap, and whenever the heap grows past size k,
 * pop the minimum off. Once every element has been processed, the heap
 * holds exactly the k largest values seen so far, and its root (the
 * smallest of those k) is the kth largest element overall.
 * O(n log k) time, O(k) space.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }

  return heap.peek();
}

/**
 * Minimal binary min-heap, implemented as an array. Used to track the k
 * largest elements seen so far, with the smallest of them at the root.
 */
class MinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }

    return top;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    const length = this.data.length;
    let done = false;

    while (!done) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.data[left] < this.data[smallest]) smallest = left;
      if (right < length && this.data[right] < this.data[smallest]) smallest = right;

      if (smallest === index) {
        done = true;
      } else {
        [this.data[smallest], this.data[index]] = [this.data[index], this.data[smallest]];
        index = smallest;
      }
    }
  }
}

module.exports = { findKthLargest };
