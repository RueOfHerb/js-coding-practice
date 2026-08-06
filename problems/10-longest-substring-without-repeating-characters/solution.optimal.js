/**
 * Alternative approach: sliding window with a hash map from character to its
 * most recent index. Expand a right pointer through the string one
 * character at a time; whenever the current character was already seen
 * inside the current window, jump the left pointer to just past its
 * previous occurrence instead of shrinking the window one step at a time.
 * Track the max window size seen along the way.
 *
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // TODO: implement
}

module.exports = { lengthOfLongestSubstring };
