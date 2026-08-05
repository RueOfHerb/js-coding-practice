const { canFinish } = require('../../problems/06-course-schedule/solution');
const { clonePrerequisites, canFinishReference, generateRandomCases } = require('./testUtils');

test('example 1 - possible', () => {
  expect(canFinish(2, [[1, 0]])).toBe(true);
});

test('example 2 - cycle, impossible', () => {
  expect(
    canFinish(2, [
      [1, 0],
      [0, 1],
    ])
  ).toBe(false);
});

test('no prerequisites', () => {
  expect(canFinish(3, [])).toBe(true);
});

test('longer chain with a cycle', () => {
  expect(
    canFinish(4, [
      [1, 0],
      [2, 1],
      [3, 2],
      [1, 3],
    ])
  ).toBe(false);
});

test('single course, no prerequisites', () => {
  expect(canFinish(1, [])).toBe(true);
});

test('self-loop is an immediate cycle', () => {
  expect(canFinish(1, [[0, 0]])).toBe(false);
});

test('duplicate edges do not break the algorithm', () => {
  expect(
    canFinish(2, [
      [1, 0],
      [1, 0],
    ])
  ).toBe(true);
});

test('longer acyclic chain', () => {
  expect(
    canFinish(5, [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
    ])
  ).toBe(true);
});

test('disconnected components, one of which has a cycle', () => {
  expect(
    canFinish(5, [
      [1, 0],
      [3, 2],
      [2, 3],
    ])
  ).toBe(false);
});

// --- Randomized (property-based) testing ---
//
// Generates many random course graphs (a mix of guaranteed-acyclic,
// guaranteed-cyclic, and fully random edge sets) and checks canFinish
// against an independently written DFS cycle-detection reference.
// Prerequisite lists are cloned before each call in case a solution
// mutates its input. A fixed seed keeps cases reproducible across runs.

const randomCases = generateRandomCases(42, 100);

test.each(randomCases)(
  'random case %#: numCourses=%s prerequisites=%j',
  (numCourses, prerequisites) => {
    const expected = canFinishReference(numCourses, clonePrerequisites(prerequisites));
    const actual = canFinish(numCourses, clonePrerequisites(prerequisites));
    expect(actual).toBe(expected);
  }
);
