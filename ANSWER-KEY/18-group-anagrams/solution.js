/**
 * Basic approach: for each string, compute its sorted-character key, then
 * scan the groups collected so far for one whose representative key
 * matches; append to it if found, otherwise start a new group. No hash
 * map lookups are used, so finding the right group is a linear scan.
 * O(n^2 * k log k) time, O(n * k) space, where n = number of strings and
 * k = max string length.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const groups = []; // each entry: { key, members }

  for (const str of strs) {
    const key = str.split('').sort().join('');

    let matched = false;
    for (const group of groups) {
      if (group.key === key) {
        group.members.push(str);
        matched = true;
        break;
      }
    }

    if (!matched) {
      groups.push({ key, members: [str] });
    }
  }

  return groups.map((group) => group.members);
}

module.exports = { groupAnagrams };
