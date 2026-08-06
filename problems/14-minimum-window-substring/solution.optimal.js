/**
 * Alternative approach: sliding window with two pointers. Build a map of
 * required character counts from t, then expand a right pointer through s
 * while tracking how many distinct required characters are currently
 * satisfied. Once the window satisfies every requirement, shrink it from
 * the left as far as possible while it stays valid, recording the smallest
 * window seen along the way.
 *
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  // TODO: implement
}

module.exports = { minWindow };
