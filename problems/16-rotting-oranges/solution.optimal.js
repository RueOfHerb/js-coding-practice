/**
 * Alternative approach: multi-source BFS. Instead of rescanning the whole
 * grid every minute, seed a queue with every rotten orange's coordinates at
 * once and count the fresh oranges up front. Process the queue level by
 * level, where each level corresponds to exactly one minute elapsing, and
 * rot the fresh neighbors of the current level before enqueuing them for the
 * next one. Stop as soon as the fresh count hits zero or the queue drains.
 *
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  // TODO: implement
}

module.exports = { orangesRotting };
