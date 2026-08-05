/**
 * Basic approach: DFS cycle detection with a 3-color marking
 * (0 = unvisited, 1 = in progress, 2 = done). If DFS ever revisits a node
 * that's still "in progress" (on the current recursion path), that's a
 * back edge, i.e. a cycle.
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const adjacency = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    adjacency[course].push(prereq);
  }

  const UNVISITED = 0;
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Array(numCourses).fill(UNVISITED);

  function hasCycle(course) {
    if (state[course] === IN_PROGRESS) return true;
    if (state[course] === DONE) return false;

    state[course] = IN_PROGRESS;
    for (const prereq of adjacency[course]) {
      if (hasCycle(prereq)) return true;
    }
    state[course] = DONE;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (state[course] === UNVISITED && hasCycle(course)) return false;
  }

  return true;
}

module.exports = { canFinish };
