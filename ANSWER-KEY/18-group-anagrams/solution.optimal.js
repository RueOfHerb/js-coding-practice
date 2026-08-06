/**
 * Optimal approach: hash map keyed by each string's sorted-character
 * signature. A single pass looks up (or creates) the bucket for a
 * string's key in O(1) average time and pushes the string onto it.
 * O(n * k log k) time, O(n * k) space, where n = number of strings and
 * k = max string length.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const groupsByKey = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');

    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, []);
    }
    groupsByKey.get(key).push(str);
  }

  return Array.from(groupsByKey.values());
}

module.exports = { groupAnagrams };
