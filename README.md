# Coding Practice

A set of 20 JavaScript coding problems for general programming practice. Each problem
gives you two chances to solve it — a straightforward approach and a more optimal one — with a
full test suite to check your work and an answer key to fall back on when you're stuck.

## How it's organized

```
problems/<NN-problem-name>/
  solution.js            # Problem statement (JSDoc) + a TODO stub for the straightforward approach
  solution.optimal.js    # Same problem, JSDoc hints at a better technique + a TODO stub

tests/<NN-problem-name>/
  solution.test.js           # Tests solution.js
  solution.optimal.test.js   # Tests solution.optimal.js
  testUtils.js                # Shared test helpers (seeded RNG, an independent reference
                               # implementation, random test-case generators)

ANSWER-KEY/<NN-problem-name>/
  solution.js             # Fully worked basic/brute-force solution, with complexity notes
  solution.optimal.js     # Fully worked optimal solution, with complexity notes
```

Every problem's tests import from `problems/`, never from `ANSWER-KEY/` — so the tests stay red
until you actually implement the stub.

## How to use it

1. Install dependencies once: `npm install`
2. Pick a problem, e.g. `problems/01-subarray-sum-equals-k/`. Read the JSDoc comment at the top
   of `solution.js` — that's the problem statement.
3. Implement the function/class body in place of `// TODO: implement`.
4. Run just that problem's tests while you iterate:
   ```
   npx jest tests/01-subarray-sum-equals-k
   ```
5. Once `solution.js` passes, open `solution.optimal.js`. Its JSDoc names the more efficient
   technique it's looking for (e.g. "sliding window" or "min-heap") without spelling out the
   code — implement that version too.
6. Stuck, or want to compare notes after finishing? The fully worked versions are in
   `ANSWER-KEY/<same-problem>/`, each with a comment explaining the approach and its time/space
   complexity.

Each test file runs a handful of hand-picked example/edge cases plus a block of seeded,
randomized property-based tests that check your solution against an independent reference
implementation (see that problem's `testUtils.js`) — so passing isn't just about matching a few
memorized examples.

## Scripts

| Command | What it does |
| --- | --- |
| `npm test` | Run the full test suite once |
| `npm run test:watch` | Re-run tests on file changes |
| `npm run lint` | ESLint over `problems/` and `tests/` |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier over `problems/` and `tests/` |

Run a single problem's tests with `npx jest tests/<problem-folder>`.

## Problems

| # | Problem | Basic approach | Optimal approach |
| --- | --- | --- | --- |
| 01 | [Subarray Sum Equals K](problems/01-subarray-sum-equals-k) | Brute force, O(n²) | Prefix sum + hash map, O(n) |
| 02 | [Number of Islands](problems/02-number-of-islands) | DFS/BFS flood fill | Union-Find (DSU) |
| 03 | [LRU Cache](problems/03-lru-cache) | Hash map + doubly linked list | Insertion-ordered `Map` |
| 04 | [Merge Intervals](problems/04-merge-intervals) | Sort + sweep | Sweep line over boundary events |
| 05 | [Top K Frequent Elements](problems/05-top-k-frequent-elements) | Sort by frequency | Bucket sort, O(n) |
| 06 | [Course Schedule](problems/06-course-schedule) | DFS cycle detection | Kahn's algorithm (BFS topo sort) |
| 07 | [Word Ladder](problems/07-word-ladder) | Single-direction BFS | Bidirectional BFS |
| 08 | [Serialize/Deserialize Binary Tree](problems/08-serialize-and-deserialize-binary-tree) | Preorder DFS | Iterative level-order (BFS) |
| 09 | [K Closest Points to Origin](problems/09-k-closest-points-to-origin) | Sort by distance | Quickselect, O(n) average |
| 10 | [Longest Substring Without Repeating Characters](problems/10-longest-substring-without-repeating-characters) | Brute force, O(n²) | Sliding window + map |
| 11 | [Trapping Rain Water](problems/11-trapping-rain-water) | Per-index left/right scan | Two pointers, O(1) space |
| 12 | [Design Twitter](problems/12-design-twitter) | Collect + sort feed | Max-heap merge of sorted lists |
| 13 | [Clone Graph](problems/13-clone-graph) | BFS + memo map | DFS + memo map |
| 14 | [Minimum Window Substring](problems/14-minimum-window-substring) | Brute force substrings | Sliding window, O(n) |
| 15 | [Kth Largest Element in an Array](problems/15-kth-largest-element-in-an-array) | Sort descending | Min-heap of size k |
| 16 | [Rotting Oranges](problems/16-rotting-oranges) | Minute-by-minute full scan | Multi-source BFS |
| 17 | [Word Search](problems/17-word-search) | Backtracking + visited set | Backtracking, in-place marking |
| 18 | [Group Anagrams](problems/18-group-anagrams) | Linear scan per group | Hash map keyed by sorted chars |
| 19 | [Meeting Rooms II](problems/19-meeting-rooms-ii) | Scan for a free room | Min-heap of room end times |
| 20 | [Copy List with Random Pointer](problems/20-copy-list-with-random-pointer) | Hash map, two passes | In-place weaving, O(1) space |

## Adding a new problem

Follow the existing structure: a `problems/<NN-slug>/` pair of TODO stubs (JSDoc problem
statement on `solution.js`, a JSDoc hint on `solution.optimal.js`), a matching `ANSWER-KEY/`
pair with full implementations and complexity notes, and a `tests/<NN-slug>/` folder with
`solution.test.js`, `solution.optimal.test.js`, and a `testUtils.js` exporting a seeded RNG
(`mulberry32`), an independent reference implementation, and a random test-case generator.
