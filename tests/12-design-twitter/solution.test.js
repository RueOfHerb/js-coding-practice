const { Twitter } = require('../../problems/12-design-twitter/solution');
const { ReferenceTwitter, generateRandomOperationSequences } = require('./testUtils');

test('classic example sequence: post, feed, follow, feed, unfollow, feed', () => {
  const twitter = new Twitter();
  twitter.postTweet(1, 5);
  expect(twitter.getNewsFeed(1)).toEqual([5]);

  twitter.follow(1, 2);
  twitter.postTweet(2, 6);
  expect(twitter.getNewsFeed(1)).toEqual([6, 5]);

  twitter.unfollow(1, 2);
  expect(twitter.getNewsFeed(1)).toEqual([5]);
});

test('a user who never tweets has an empty feed', () => {
  const twitter = new Twitter();
  expect(twitter.getNewsFeed(1)).toEqual([]);
});

test('a user with no followees only sees their own tweets', () => {
  const twitter = new Twitter();
  twitter.postTweet(1, 10);
  twitter.postTweet(1, 11);
  twitter.postTweet(2, 99); // another user's tweet should not appear
  expect(twitter.getNewsFeed(1)).toEqual([11, 10]);
});

test('unfollowing removes a followee tweets from the feed on the next call', () => {
  const twitter = new Twitter();
  twitter.postTweet(2, 1);
  twitter.follow(1, 2);
  expect(twitter.getNewsFeed(1)).toEqual([1]);

  twitter.unfollow(1, 2);
  expect(twitter.getNewsFeed(1)).toEqual([]);
});

test('feed caps at the 10 most recent tweets even if more exist', () => {
  const twitter = new Twitter();
  for (let tweetId = 0; tweetId < 15; tweetId++) {
    twitter.postTweet(1, tweetId);
  }
  const feed = twitter.getNewsFeed(1);
  expect(feed).toHaveLength(10);
  expect(feed).toEqual([14, 13, 12, 11, 10, 9, 8, 7, 6, 5]);
});

test('self-tweets are always included even without following self', () => {
  const twitter = new Twitter();
  twitter.postTweet(1, 1);
  expect(twitter.getNewsFeed(1)).toEqual([1]);
});

test('following the same user twice is idempotent', () => {
  const twitter = new Twitter();
  twitter.postTweet(2, 100);
  twitter.follow(1, 2);
  twitter.follow(1, 2);
  expect(twitter.getNewsFeed(1)).toEqual([100]);
});

test('unfollowing a user that was never followed is a no-op', () => {
  const twitter = new Twitter();
  twitter.postTweet(2, 100);
  expect(() => twitter.unfollow(1, 2)).not.toThrow();
  expect(twitter.getNewsFeed(1)).toEqual([]);
});

test('feed interleaves tweets from self and multiple followees by recency', () => {
  const twitter = new Twitter();
  twitter.postTweet(1, 1); // time 0
  twitter.postTweet(2, 2); // time 1
  twitter.postTweet(3, 3); // time 2
  twitter.follow(1, 2);
  twitter.follow(1, 3);
  expect(twitter.getNewsFeed(1)).toEqual([3, 2, 1]);
});

// --- Randomized (property-based) testing ---
//
// Runs many random sequences of postTweet/follow/unfollow/getNewsFeed
// operations against both the solution under test and an independent,
// deliberately simple reference Twitter implementation, asserting every
// getNewsFeed() call returns the same array from both. This exercises feed
// ordering, follow/unfollow bookkeeping, and the 10-tweet cap far more
// thoroughly than a handful of hand-written scenarios could. A fixed seed
// keeps sequences reproducible across runs.

const randomSequences = generateRandomOperationSequences(42, 30, 40);

test.each(randomSequences)('random operation sequence %#: userUniverse=$userUniverse', ({ ops }) => {
  const userTwitter = new Twitter();
  const refTwitter = new ReferenceTwitter();

  ops.forEach((op) => {
    if (op.type === 'postTweet') {
      userTwitter.postTweet(op.userId, op.tweetId);
      refTwitter.postTweet(op.userId, op.tweetId);
    } else if (op.type === 'follow') {
      userTwitter.follow(op.followerId, op.followeeId);
      refTwitter.follow(op.followerId, op.followeeId);
    } else if (op.type === 'unfollow') {
      userTwitter.unfollow(op.followerId, op.followeeId);
      refTwitter.unfollow(op.followerId, op.followeeId);
    } else {
      expect(userTwitter.getNewsFeed(op.userId)).toEqual(refTwitter.getNewsFeed(op.userId));
    }
  });
});
