/**
 * Alternative approach: merge-k-sorted-lists via a max-heap. Each user's own
 * tweets are already stored in chronological order, so a news feed is just
 * merging the (self + followees) tweet lists and taking the top 10 by time.
 * Seed a max-heap with the most recent tweet from each relevant user, then
 * repeatedly pop the max and, if that user has an earlier tweet, push it in
 * next. Stop once 10 tweets are collected or the heap runs dry. This avoids
 * sorting the full combined tweet history on every call.
 */
class Twitter {
  constructor() {
    // TODO: implement
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId, tweetId) {
    // TODO: implement
  }

  /**
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId) {
    // TODO: implement
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId, followeeId) {
    // TODO: implement
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId, followeeId) {
    // TODO: implement
  }
}

module.exports = { Twitter };
