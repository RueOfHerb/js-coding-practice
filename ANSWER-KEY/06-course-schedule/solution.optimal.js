/**
 * Alternative approach: Kahn's algorithm (BFS topological sort). Track
 * each course's in-degree (number of unmet prerequisites). Start a queue
 * with every course that has in-degree 0. Repeatedly dequeue a course,
 * "complete" it, and decrement the in-degree of everything that depends
 * on it, enqueuing any course whose in-degree just hit 0. If every
 * course gets dequeued this way, there's no cycle; if some remain stuck
 * at in-degree > 0, a cycle blocks them.
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const adjacency = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adjacency[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let course = 0; course < numCourses; course++) {
    if (inDegree[course] === 0) queue.push(course);
  }

  let completedCount = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    completedCount++;
    for (const next of adjacency[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return completedCount === numCourses;
}

module.exports = { canFinish };
