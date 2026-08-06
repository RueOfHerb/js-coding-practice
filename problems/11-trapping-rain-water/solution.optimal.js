/**
 * Alternative approach: two pointers. Walk inward from both ends of the
 * array while tracking a running leftMax and rightMax. At each step,
 * advance whichever side currently has the smaller max, since that side's
 * trapped water at the current index is fully determined by its own
 * running max (the other side is guaranteed to be at least as tall
 * somewhere further along). Accumulate the difference between the running
 * max and the current bar as you go.
 *
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // TODO: implement
}

module.exports = { trap };
