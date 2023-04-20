import { cookieUserId } from '../modules/session'

const baseURL = 'http://127.0.0.1:3000'

const path = {
  // users: {
  //   index: '/users',
  //   create: '/users',
  //   show: {
  //     currentUser: `/users/${cookieUserId()}`,
  //     user: `/users/${userId}`,
  //   },
  //   update: `/users/${cookieUserId()}`,
  //   destroy: `/users/${cookieUserId()}`,
  //   search: '/users'
  // },
  // sessions: {
  //   login: '/login',
  //   logout: '/logout'
  // },
  tweets: {
    // index: {
    //   currentUser: `/users/${cookieUserId()}/tweets`,
    //   user: `/users/${userId}/tweets`,
    // },
    create: `/users/${cookieUserId()}/tweets`,
    // show: {
    //   currentUser: `/users/${cookieUserId()}/tweets/${tweet.id}`,
    //   user: `/users/${userId}/tweets/${tweetId}`,
    // },
    // update: `/users/${cookieUserId()}/tweets/${tweet.id}`,
    // destroy: `/users/${cookieUserId()}/tweets/${tweet.id}`,
    // reply: `/users/${cookieUserId()}/tweets/${tweetId}/replies`,
    // replies: `/users/${userId}/tweets/${tweetId}/replies`,
    // search: '/tweets'
  },
  // search: {
  //   data: '/searches/data',
  // },
  // relationships: {
  //   follow: `/users/${cookieUserId()}/follow`,
  //   unfollow: `/users/${cookieUserId()}/unfollow`,
  //   followings: `/users/${cookieUserId()}/followings`,
  //   followers: `/users/${cookieUserId()}/followers`,
  // },
  // hashTags: {
  //   index: `/categories/${category.id}/hash_tags`,
  // },
  // categories: {
  //   main: '/main',
  //   index: '/categories',
  // },
}

const postTweet = function(payload){
  return axios.post(baseURL + path.tweets.create, payload)
}

export { postTweet }