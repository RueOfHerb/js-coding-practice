/**
 * Basic approach: brute force. For every starting index, extend forward
 * one character at a time, tracking the characters seen so far in a Set
 * and stopping the moment a repeat is found. Track the max length seen
 * across all starting indices. O(n^2) time, O(min(n, charset)) space.
 *
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let maxLength = 0;

  for (let start = 0; start < s.length; start++) {
    const seen = new Set();

    for (let end = start; end < s.length; end++) {
      if (seen.has(s[end])) break;
      seen.add(s[end]);
    }

    maxLength = Math.max(maxLength, seen.size);
  }

  return maxLength;
}

module.exports = { lengthOfLongestSubstring };
