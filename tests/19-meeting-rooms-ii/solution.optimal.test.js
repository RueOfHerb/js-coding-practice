const { minMeetingRooms } = require('../../problems/19-meeting-rooms-ii/solution.optimal');
const { generateRandomCases, referenceMinMeetingRooms } = require('./testUtils');

test('classic example: three meetings, one pair overlaps', () => {
  expect(
    minMeetingRooms([
      [0, 30],
      [5, 10],
      [15, 20],
    ])
  ).toBe(2);
});

test('two non-overlapping meetings need one room', () => {
  expect(
    minMeetingRooms([
      [7, 10],
      [2, 4],
    ])
  ).toBe(1);
});

test('empty array needs zero rooms', () => {
  expect(minMeetingRooms([])).toBe(0);
});

test('single meeting needs one room', () => {
  expect(minMeetingRooms([[5, 10]])).toBe(1);
});

test('meetings that exactly touch need only one room', () => {
  expect(
    minMeetingRooms([
      [1, 5],
      [5, 10],
    ])
  ).toBe(1);
});

test('all meetings share the identical time range', () => {
  expect(
    minMeetingRooms([
      [1, 5],
      [1, 5],
      [1, 5],
    ])
  ).toBe(3);
});

test('meetings given out of chronological order', () => {
  expect(
    minMeetingRooms([
      [15, 20],
      [5, 10],
      [0, 30],
    ])
  ).toBe(2);
});

test('two meetings overlapping partially need two rooms', () => {
  expect(
    minMeetingRooms([
      [1, 10],
      [2, 7],
    ])
  ).toBe(2);
});

test('meetings far apart in time still need only one room', () => {
  expect(
    minMeetingRooms([
      [1, 2],
      [100, 200],
    ])
  ).toBe(1);
});

test('three meetings with a rotating overlap need two rooms', () => {
  expect(
    minMeetingRooms([
      [1, 5],
      [4, 8],
      [7, 11],
    ])
  ).toBe(2);
});

// Same seed as solution.test.js, so both implementations are checked
// against the exact same 100 randomly generated interval sets.
const randomCases = generateRandomCases(42, 100);

test.each(randomCases)('random case %#: intervals=%j', (intervals) => {
  expect(minMeetingRooms(intervals)).toBe(referenceMinMeetingRooms(intervals));
});
