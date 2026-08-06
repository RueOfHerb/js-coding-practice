/**
 * Design a simplified version of Twitter where users can post tweets,
 * follow/unfollow another user, and see the 10 most recent tweet ids in
 * their news feed.
 *
 * Implement the Twitter class:
 * - Twitter() Initializes your twitter object.
 * - void postTweet(int userId, int tweetId) Composes a new tweet with ID
 *   tweetId by the user userId. Each call to this function will be made
 *   with a unique tweetId.
 * - List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent
 *   tweet ids in the user's news feed. Each item in the news feed must be
 *   posted by users who the user is following or by the user themself.
 *   Tweets must be ordered from most recent to least recent.
 * - void follow(int followerId, int followeeId) The user with ID
 *   followerId started following the user with ID followeeId.
 * - void unfollow(int followerId, int followeeId) The user with ID
 *   followerId started unfollowing the user with ID followeeId.
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
