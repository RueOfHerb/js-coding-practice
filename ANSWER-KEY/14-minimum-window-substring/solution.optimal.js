/**
 * Alternative approach: sliding window with two pointers. Build a `need`
 * map of required character counts from t. Expand `right` through s,
 * decrementing counts in a `window` map and tracking `formed` (the number
 * of distinct characters in t whose required count is currently satisfied)
 * against `required` (need.size). Whenever formed === required, shrink from
 * `left` to find the smallest valid window before continuing to expand.
 * O(n + m) time, O(m) space.
 *
 * Edge case: an empty t trivially requires nothing, so we return "" in
 * that case (consistent with the basic approach).
 *
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  if (t.length === 0) return '';
  if (t.length > s.length) return '';

  const need = new Map();
  for (const ch of t) {
    need.set(ch, (need.get(ch) || 0) + 1);
  }
  const required = need.size;

  const window = new Map();
  let formed = 0;
  let left = 0;
  let bestStart = 0;
  let bestLength = Infinity;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) || 0) + 1);

    if (need.has(ch) && window.get(ch) === need.get(ch)) {
      formed++;
    }

    while (formed === required) {
      if (right - left + 1 < bestLength) {
        bestLength = right - left + 1;
        bestStart = left;
      }

      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        formed--;
      }
      left++;
    }
  }

  return bestLength === Infinity ? '' : s.slice(bestStart, bestStart + bestLength);
}

module.exports = { minWindow };
