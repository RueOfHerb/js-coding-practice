/**
 * Basic approach: store each user's tweets in an append-only, chronological
 * array (Map<userId, {tweetId, time}[]>), plus a follow graph
 * (Map<userId, Set<followeeId>>) and a global incrementing time counter.
 * getNewsFeed collects the tweet arrays for self + followees into one
 * combined array, sorts it by time descending, and returns the first 10
 * tweetIds.
 *
 * Complexity (n = tweets by a user, f = followees, t = total tweets across
 * self + followees):
 * - postTweet: O(1)
 * - follow / unfollow: O(1)
 * - getNewsFeed: O(t log t) time, O(t) space
 */
class Twitter {
  constructor() {
    this.tweetsByUser = new Map(); // userId -> [{ tweetId, time }]
    this.followeesByUser = new Map(); // userId -> Set<followeeId>
    this.time = 0;
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId, tweetId) {
    if (!this.tweetsByUser.has(userId)) {
      this.tweetsByUser.set(userId, []);
    }
    this.tweetsByUser.get(userId).push({ tweetId, time: this.time });
    this.time++;
  }

  /**
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId) {
    const relevantUsers = new Set([userId, ...(this.followeesByUser.get(userId) || [])]);

    const allTweets = [];
    relevantUsers.forEach((otherUserId) => {
      const tweets = this.tweetsByUser.get(otherUserId);
      if (tweets) allTweets.push(...tweets);
    });

    allTweets.sort((a, b) => b.time - a.time);

    return allTweets.slice(0, 10).map((tweet) => tweet.tweetId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId, followeeId) {
    if (!this.followeesByUser.has(followerId)) {
      this.followeesByUser.set(followerId, new Set());
    }
    this.followeesByUser.get(followerId).add(followeeId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId, followeeId) {
    const followees = this.followeesByUser.get(followerId);
    if (followees) followees.delete(followeeId);
  }
}

module.exports = { Twitter };
