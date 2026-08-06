/**
 * Alternative approach: merge-k-sorted-lists via a max-heap. Each user's own
 * tweets are already stored in chronological order (an append-only array),
 * so a news feed is just merging the (self + followees) tweet lists and
 * taking the top 10 by time. Seed a max-heap with the most recent tweet
 * from each relevant user (keyed by time descending), then repeatedly pop
 * the max, record its tweetId, and if that user has an earlier tweet push
 * it onto the heap next. Stop once 10 tweetIds are collected or the heap
 * runs dry.
 *
 * Complexity (k = 10, f = number of relevant users = self + followees):
 * - postTweet: O(1)
 * - follow / unfollow: O(1)
 * - getNewsFeed: O(f + k log f) time (O(f) to seed the heap, O(log f) per
 *   pop/push, up to k pops), O(f) space
 */

// Small private max-heap keyed by a comparator, used to merge each user's
// most-recent-tweet-first stream during getNewsFeed.
class MaxHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this._bubbleUp(this.items.length - 1);
  }

  pop() {
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.items[parent].time >= this.items[index].time) break;
      [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    const n = this.items.length;
    for (;;) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let largest = index;

      if (left < n && this.items[left].time > this.items[largest].time) largest = left;
      if (right < n && this.items[right].time > this.items[largest].time) largest = right;
      if (largest === index) break;

      [this.items[largest], this.items[index]] = [this.items[index], this.items[largest]];
      index = largest;
    }
  }
}

class Twitter {
  constructor() {
    this.tweetsByUser = new Map(); // userId -> [{ tweetId, time }], chronological order
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

    const heap = new MaxHeap();
    relevantUsers.forEach((otherUserId) => {
      const tweets = this.tweetsByUser.get(otherUserId);
      if (tweets && tweets.length > 0) {
        const lastIndex = tweets.length - 1;
        heap.push({
          tweetId: tweets[lastIndex].tweetId,
          time: tweets[lastIndex].time,
          tweets,
          index: lastIndex,
        });
      }
    });

    const feed = [];
    while (feed.length < 10 && heap.size > 0) {
      const { tweetId, tweets, index } = heap.pop();
      feed.push(tweetId);

      if (index > 0) {
        const prevIndex = index - 1;
        heap.push({
          tweetId: tweets[prevIndex].tweetId,
          time: tweets[prevIndex].time,
          tweets,
          index: prevIndex,
        });
      }
    }

    return feed;
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
