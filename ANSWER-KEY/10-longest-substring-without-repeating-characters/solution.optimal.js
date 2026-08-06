/**
 * Alternative approach: sliding window using a Map from character to its
 * most recent index. Expand the right pointer through the string; whenever
 * the current character was seen before and its last index is inside the
 * current window, jump the left pointer to just after that previous
 * occurrence. Update the map and the max length at each step.
 * O(n) time, O(min(n, charset)) space.
 *
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const lastIndex = new Map();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (lastIndex.has(char) && lastIndex.get(char) >= left) {
      left = lastIndex.get(char) + 1;
    }

    lastIndex.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

module.exports = { lengthOfLongestSubstring };
