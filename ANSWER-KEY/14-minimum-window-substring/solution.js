/**
 * Basic approach: brute force. For every possible substring of s (all
 * start/end pairs), build a character-count map of that substring and
 * check it against t's required counts, keeping the shortest substring
 * that satisfies every requirement. O(n^2 * m) time (n = s.length,
 * m = t.length, from rebuilding/checking counts for each substring),
 * O(m) space for the count maps.
 *
 * Edge case: an empty t trivially requires nothing, so every substring
 * (including the empty one) satisfies it; we return "" in that case.
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

  let best = '';

  for (let start = 0; start < s.length; start++) {
    const counts = new Map();
    let satisfied = 0;
    const required = need.size;

    for (let end = start; end < s.length; end++) {
      const ch = s[end];
      const newCount = (counts.get(ch) || 0) + 1;
      counts.set(ch, newCount);

      if (need.has(ch) && newCount === need.get(ch)) {
        satisfied++;
      }

      if (satisfied === required) {
        const candidate = s.slice(start, end + 1);
        if (best === '' || candidate.length < best.length) {
          best = candidate;
        }
        break; // extending further from this start can't beat this window
      }
    }
  }

  return best;
}

module.exports = { minWindow };
