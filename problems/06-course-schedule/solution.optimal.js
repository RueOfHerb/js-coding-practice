/**
 * Alternative approach: Kahn's algorithm (BFS topological sort) instead
 * of DFS cycle detection. Track each course's in-degree (number of
 * unmet prerequisites). Start a queue with every course that has
 * in-degree 0. Repeatedly dequeue a course, "complete" it, and decrement
 * the in-degree of everything that depends on it, enqueuing any course
 * whose in-degree just hit 0. If you can dequeue every course this way,
 * there's no cycle; if some remain stuck at in-degree > 0, a cycle
 * blocks them.
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  // TODO: implement
}

module.exports = { canFinish };
