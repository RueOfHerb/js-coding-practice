// Shared test infrastructure: an independent reference Twitter plus a
// seeded random-operation-sequence generator, so both solution.js and
// solution.optimal.js can be checked against the same sequences without
// duplicating this logic.

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

// Deliberately simple, obviously-correct-by-inspection reference: every
// tweet ever posted is stored globally as { userId, tweetId, time }, with a
// monotonically increasing counter as time. getNewsFeed just filters all
// tweets down to self + followees, sorts by time descending, and takes the
// first 10. Independent of the hash-map-plus-sort or heap-merge techniques
// the actual solutions are meant to use.
class ReferenceTwitter {
  constructor() {
    this.allTweets = []; // [{ userId, tweetId, time }]
    this.followeesByUser = new Map(); // userId -> Set<followeeId>
    this.time = 0;
  }

  postTweet(userId, tweetId) {
    this.allTweets.push({ userId, tweetId, time: this.time });
    this.time++;
  }

  getNewsFeed(userId) {
    const followees = this.followeesByUser.get(userId) || new Set();
    const relevant = this.allTweets.filter(
      (tweet) => tweet.userId === userId || followees.has(tweet.userId)
    );
    relevant.sort((a, b) => b.time - a.time);
    return relevant.slice(0, 10).map((tweet) => tweet.tweetId);
  }

  follow(followerId, followeeId) {
    if (!this.followeesByUser.has(followerId)) {
      this.followeesByUser.set(followerId, new Set());
    }
    this.followeesByUser.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    const followees = this.followeesByUser.get(followerId);
    if (followees) followees.delete(followeeId);
  }
}

// Generates sequences of randomly mixed postTweet/follow/unfollow/getNewsFeed
// operations over a small universe of user ids, so eviction-order-style bugs
// (feed ordering, follow-graph edge cases) get exercised the way random
// get/put sequences exercise the LRU cache reference.
function generateRandomOperationSequences(seed, numSequences, opsPerSequence = 40) {
  const rng = mulberry32(seed);
  const sequences = [];
  const opTypes = ['postTweet', 'follow', 'unfollow', 'getNewsFeed'];

  for (let s = 0; s < numSequences; s++) {
    const userUniverse = randomInt(rng, 3, 6);
    const ops = [];
    let nextTweetId = 0;

    for (let i = 0; i < opsPerSequence; i++) {
      const type = opTypes[randomInt(rng, 0, opTypes.length - 1)];
      const userId = randomInt(rng, 0, userUniverse - 1);

      if (type === 'postTweet') {
        ops.push({ type, userId, tweetId: nextTweetId });
        nextTweetId++;
      } else if (type === 'follow' || type === 'unfollow') {
        const followeeId = randomInt(rng, 0, userUniverse - 1);
        ops.push({ type, followerId: userId, followeeId });
      } else {
        ops.push({ type, userId });
      }
    }

    sequences.push({ userUniverse, ops });
  }

  return sequences;
}

module.exports = {
  mulberry32,
  randomInt,
  ReferenceTwitter,
  generateRandomOperationSequences,
};
