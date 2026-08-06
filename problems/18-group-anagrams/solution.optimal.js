/**
 * Alternative approach: hash map keyed by a canonical signature of each
 * string. Instead of scanning previously-seen groups to find a match,
 * compute a key that is identical for all anagrams of one another (e.g.
 * the sorted characters, or a 26-length letter-count signature) and use it
 * to look up or create the matching bucket in O(1) average time. A single
 * pass over the input then builds every group directly.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // TODO: implement
}

module.exports = { groupAnagrams };
