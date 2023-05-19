import { getCookie } from '../modules/cookie'

console.log('api')
console.log(getCookie())

const baseURL = 'http://127.0.0.1:3000'
const username = getCookie()

let path = {
  users: {
    // index: '/users',
    create: '/users',
    show: {
      currentUser: `/users/${username}`,
      // user: `/users/${username}`,
    },
    update: `/users/${username}`,
    // destroy: `/users/${username}`,
    // search: '/users'
  },
  // cookies: {
  //   login: '/login',
  //   logout: '/logout'
  // },
  tweets: {
    index: `/users/${username}/tweets`,
    create: `/users/${username}/tweets`,
    // show: {
    //   currentUser: `/users/${username}/tweets/${tweet.id}`,
    //   user: `/users/${username}/tweets/${tweetId}`,
    // },
    // update: `/users/${username}/tweets/${tweet.id}`,
    // destroy: `/users/${username}/tweets/${tweet.id}`,
    // reply: `/users/${username}/tweets/${tweetId}/replies`,
    // replies: `/users/${username}/tweets/${tweetId}/replies`,
    // search: '/tweets'
  },
  // search: {
  //   data: '/searches/data',
  // },
  // relationships: {
  //   follow: `/users/${username}/follow`,
  //   unfollow: `/users/${username}/unfollow`,
  //   followings: `/users/${username}/followings`,
  //   followers: `/users/${username}/followers`,
  // },
  // hashTags: {
  //   index: `/categories/${category.id}/hash_tags`,
  // },
  // categories: {
  //   main: '/main',
  //   index: '/categories',
  // },
}

const signup = function(payload){
  return axios.post(baseURL + path.users.create, payload)
}

const getCurrentUser = function(){
  return axios.get(baseURL + path.users.show.currentUser)
}

const getUser = function(username){
  return axios.get(baseURL + `/users/${username}`)
}

const updateProfile = function(payload){
  return axios.patch(baseURL + path.users.update, payload, { headers: { 'Content-Type': 'multipart/form-data' }})
}

const postTweet = function(payload){
  return axios.post(baseURL + path.tweets.create, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const getTweets = function(name = username){
  return axios.get(baseURL + `/users/${name}/tweets`)
}

export { baseURL, username, signup, getCurrentUser, getUser, updateProfile, postTweet, getTweets }