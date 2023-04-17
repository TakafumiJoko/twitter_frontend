import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'
import { cookieUserId } from '../modules/session'


var store = createStore(Vuex.Store, {
  state() {
    return {
      server: 'http://127.0.0.1:3000',
      cookieUserId: undefined,
      currentUser: undefined,
      passwordConfirmation: undefined,
      user: {},
      userId: 0,
      users: {},
      tweet: {},
      tweetId: 0,
      tweets: {
        currentUser: [],
        user: [],
        searchResult: [],
        followings: [],
        reply: [], 
      },
      followings: [],
      followers: [],
      searchResultTweets: undefined,
      mode: {
        tweets: '',
        page: 'introduction',
      },
      searchWord: undefined,
      // category: undefined,
      password: undefined,
      destroyUserDisabled: true,
    }
  },
  getters: {
    cookieUserId(state){
      return state.cookieUserId
    },
    isLoggedIn(state){
      return state.cookieUserId ? true : false 
    },
    mode(state){
      return state.mode
    },
    server(state){
      return state.server
    },
    userId(state){
      return state.userId
    },
    tweetId(state){
      return state.tweetId
    },
    user(state){
      return state.user
    },
    user(state){
      return state.user
    },
    currentUser(state){
      return state.currentUser
    },
    passwordConfirmation(state){
      return state.passwordConfirmation
    },
    signupDisabled(state){
      return !(state.user.password != null && state.user.password == state.passwordConfirmation)
    },
    contact(state){
      return state.contact
    },
    users(state){
      return state.users
    },
    tweets(state){
      return state.tweets[state.mode.tweets]
    },
    tweet(state){
      return state.tweet
      // return state.tweets[state.mode.tweets].find((t)=>{ return t.id === state.tweetId })
    },
    following(state){
      return state.followings.find((f)=>{ return f.id === state.tweet.user_id })
    },
    tweetUser(state){
      return state.users.find((u)=>{ return u.id === state.tweet.user_id })
    },
    searchResultTweets(state){
      return state.searchResultTweets
    },
    searchWord(state){
      return state.searchWord
    },
    // category(state){
    //   return state.category
    // },
    api(state) {
      return {
        users: {
          index: '/users',
          create: '/users',
          show: {
            currentUser: `/users/${state.cookieUserId}`,
            user: `/users/${state.userId}`,
          },
          update: `/users/${state.cookieUserId}`,
          destroy: `/users/${state.cookieUserId}`,
          search: '/users'
        },
        sessions: {
          login: '/login',
          logout: '/logout'
        },
        tweets: {
          index: {
            currentUser: `/users/${state.cookieUserId}/tweets`,
            user: `/users/${state.userId}/tweets`,
          },
          create: `/users/${state.cookieUserId}/tweets`,
          show: {
            currentUser: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
            user: `/users/${state.userId}/tweets/${state.tweetId}`,
          },
          update: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
          destroy: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
          reply: `/users/${state.cookieUserId}/tweets/${state.tweetId}/replies`,
          replies: `/users/${state.userId}/tweets/${state.tweetId}/replies`,
          search: '/tweets'
        },
        search: {
          data: '/searches/data',
        },
        relationships: {
          follow: `/users/${state.cookieUserId}/follow`,
          unfollow: `/users/${state.cookieUserId}/unfollow`,
          followings: `/users/${state.cookieUserId}/followings`,
          followers: `/users/${state.cookieUserId}/followers`,
        },
        hashTags: {
          create: `/tweets/${state.tweet.id}/hash_tags`
        },
        // categories: {
        //   index: `/categories`,
        // },
        // trends: {
        //   index: `/categories/${state.category.id}/trends`,
        // },
      }
    },
    pageMode(state){
      return state.mode.page
    },
    password(state){
      return state.password
    },
    destroyUserDisabled(state){
      return state.destroyUserDisabled
    },
  },
  mutations: {
    setCookieUserId(state, payload){
      state.cookieUserId = payload.userId
    },
    setCurrentUser(state, payload){
      state.currentUser = payload.user
    },
    setUsers(state, payload){
      state.users = payload.setUser
    },
    setNickname(state, payload){
      state.user.nickname = payload.value
    },
    setBirthday(state, payload){
      state.user.birthday = payload.value
    },
    setPassword(state, payload){
      state.user.password = payload.value
    },
    setPasswordConfirmation(state, payload){
      state.passwordConfirmation = payload.value
    },
    setPhoneNumber(state, payload){
      state.user.phoneNumber = payload.value 
    },
    setEmail(state, payload){
      state.user.email = payload.value 
    },
    updateNickname(state, payload){
      state.currentUser.nickname = payload.value
    },
    updateIntroduction(state, payload){
      state.currentUser.introduction = payload.value
    },
    updateResidence(state, payload){
      state.currentUser.residence = payload.value
    },
    updateWebsite(state, payload){
      state.currentUser.website = payload.value
    },
    updateBirthday(state, payload){
      state.currentUser.birthday = payload.value
    },
    setUser(state, payload){
      state.user = payload.user
    },
    setUserId(state, payload){
      state.userId = payload.userId
    },
    setUsers(state,payload){
      state.users = payload.users
    },
    clearuser(state){
      state.user = {}
    },
    clearCurrentUser(state){
      state.currentUser = {}
    },
    setSearchResultUser(state){
      state.searchResultUser = payload.user
    },
    setTweet(state,payload){
      state.tweet = payload.tweet
    },
    setTweetId(state, payload){
      state.tweetId = payload.tweetId
    },
    clearTweet(state){
      state.tweet = {}
    },
    setTweetsMode(state, payload){
      state.mode.tweets = payload.mode.tweets
    },
    setTweets(state, payload){
      state.tweets[state.mode.tweets] = payload.tweets
    },
    setSearchResultTweets(state, payload){
      state.searchResultTweets = payload.tweets
    },
    setSearchWord(state, payload){
      state.searchWord = payload.searchWord
    },
    // setCategory(state, payload){
    //   state.category = payload.category
    // },
    setPageMode(state, payload){
      state.mode.page = payload.mode.page
    },
    setDestroyUserDisabled(state, payload){
      state.destroyUserDisabled = payload.value
    },
    setFollowingsTweets(state, payload){
      state.followingsTweets[payload.followingId] = payload.tweets
    },
    setFollowings(state, payload){
      state.followings = payload.followings
    },
    setFollowersTweets(state, payload){
      state.followersTweets[payload.followerId] = payload.tweets
    },
    setFollowers(state, payload){
      state.followers = payload.followers
    },
  },
  actions: {
    getCurrentUser(context, payload){
      axios.get(context.getters.server + context.getters.api.users.show.currentUser)
      .then((res) => {
        context.commit('setCurrentUser', { user: res.data.user })
        console.log(`GET ${context.getters.api.users.show.currentUser} ${res.data.user.nickname}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getUsers(context, payload){
      axios.get(context.getters.server + context.getters.api.users.index)
      .then((res) => {
        console.log(`GET ${context.getters.api.users.index} ${res.data.users[0].nickname}`)
        context.commit('setUsers', { users: res.data.user })
      })
      .catch(error => {
        console.log(error)
      })
    },
    async searchUsers(context, payload){
      const res = await axios.get(context.getters.server + context.getters.api.users.search, { params: { q: { nickname_cont: context.getters.searchWord } }})
      console.log(`GET ${location.pathname} ${res.data.users[0].nickname}`)
      context.commit('setUsers', { users: res.data.users })
    },  
    getUser(context, payload){
      console.log(context.state.tweets.user)
      axios.get(context.getters.server + context.getters.api.users.show.user)
      .then((res) => {
        console.log(`GET ${context.getters.api.users.show.user} ${res.data.user.nickname}`)
        context.commit('setUser', { user: res.data.user })
      })
      .catch(error => {
        console.log(error)
      })
    },
    follow(context, payload){
      axios.post(context.getters.server + context.getters.api.relationships.follow + payload.api)
      .then((res) => {
        console.log(`POST ${context.getters.api.relationships.follow + payload.api} ${res.data.followed_id}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    unfollow(context, payload){
      axios.delete(context.getters.server + context.getters.api.relationships.unfollow + payload.api)
      .then((res) => {
        console.log(`DELETE ${context.getters.api.relationships.unfollow + payload.api} ${res.data.followed_id}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getFollowings(context, payload){
      await axios.get(context.getters.server + context.getters.api.relationships.followings)
        .then((res) => {
          console.log(`GET ${context.getters.api.users.followings} ${res.data.followings[0].nickname}`)
          context.commit('setFollowings', { followings: res.data.followings })
          this.dispatch('getFollowingsTweets')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getFollowingsTweets(context, payload){
      await Promise.all(context.state.followings.map((following)=>{
        return new Promise((resolve, reject) => {
          axios.get(context.getters.server + `/users/${following.id}/tweets`)
            .then((res) => {
              console.log(`GET /users/${following.id}/tweets ${res.data.tweets[0]?.message}`)
              context.commit('setTweetsMode', { mode: { tweets:  'followings' } })
              context.commit('setTweets', { tweets: res.data.tweets })
              resolve()
            })
            .catch(error => {
              console.log(error)
              reject()
            })
          })
        })
      )
    },
    updateUser(context, payload){
      axios.patch(context.getters.server + context.getters.api.users.update, context.getters.user)
      .then((res) => {
        console.log(`PATCH ${context.getters.api.users.update} ${res.data.user.nickname}`)
        context.commit('setCurrentUser', { user: res.data.user })
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyUser(context, payload){
      axios.delete(context.getters.server + context.getters.api.users.destroy)
      .then((res) => {
        console.log(`DELETE ${context.getters.api.users.destroy} ${res.data.user.nickname}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async createTweet(context, payload){
      await axios.post(context.getters.server + context.getters.api.tweets.create, payload)
      .then((res) => {
        console.log(`POST ${context.getters.api.tweets.create} ${res.data.tweet.message}`)
        context.commit('setTweet', { tweet: res.data.tweet })
        if(/\s#.+/.test(res.data.tweet.message)) this.dispatch('createHashTags', { tweet: res.data.tweet })
      })
      .catch(error => {
        console.log(error)
      })
    },
    async createHashTags(context, payload){
      var hash_tags = payload.tweet.message.match(/(^|\s)#\w+/g)
      hash_tags = hash_tags.map(
        (h)=>{
          if(/\s/.test(h)){
            return h.split(/\s/)[1]
          }else{
            return h
          }
        }
      )
      await Promise.all(hash_tags.map((h)=>{
        return new Promise((resolve, reject)=>{
          axios.post(context.getters.server + context.getters.api.hashTags.create, { hash_tag: { value: h } })
            .then((res)=>{
              console.log(`POST ${context.getters.api.hashTags.create} ${res.data.hash_tag.value}`)
              resolve()
            })
            .catch(err=>{
              console.log(err)
              reject()
            })
        })
      }))
    },
    getTweet(context, payload){
      axios.get(context.getters.server + context.getters.api.tweets.show.user)
      .then((res) => {
        console.log('GET ' + context.getters.api.tweets.show.user + ' ' + res.data.tweet.message)
        context.commit('setTweet', { tweet: res.data.tweet })
        this.dispatch('getReplies', { mode: { tweets: 'reply' } })
      })
      .catch(error => {
        console.log(error)
      })
    },
    async createReply(context, payload){
      await axios.post(context.getters.server + context.getters.api.tweets.reply, payload)
      .then((res) => {
        console.log(`POST ${context.getters.api.tweets.reply} Reply:${res.data.reply_id} Replied:${res.data.replied_id}`)
        // context.commit('clearTweet')
        this.dispatch('getReplies', { mode: { tweets: 'reply' } })
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getReplies(context, payload){
      await axios.get(context.getters.server + context.getters.api.tweets.replies)
      .then((res) => {
        console.log('GET ' + context.getters.api.tweets.replies + ' ' + res.data.tweets[0].message)
        context.commit('setTweetsMode', { mode: payload.mode })
        context.commit('setTweets', { tweets: res.data.tweets })
      })
      .catch(error => {
        console.log(error)
      })
    },
    getTweets(context, payload){
      context.commit('setUserId', { userId: payload.userId })
      axios.get(context.getters.server + context.getters.api.tweets.index[payload.mode])
      .then((res) => {
        console.log(res)
        console.log('GET ' + context.getters.api.tweets.index[payload.mode] + ' ' + res.data.tweets[0].message)
        context.commit('setTweetsMode', { mode: payload.mode })
        context.commit('setTweets', { tweets: res.data.tweets })
        console.log(context.getters.tweets)
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyTweet(context, payload){
      context.commit('setTweet', { tweet: payload.tweet })
      axios.delete(context.getters.server + context.getters.api.tweets.destroy)
      .then((res) => {
        context.commit('clearTweet')
        console.log(`DELETE ${context.getters.api.tweets.destroy} ${res.data.tweet.message}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    async getData(context, payload){
      const res = await axios.get(context.getters.server + context.getters.api.search.data, context.getters.searchWord)
      // console.log(`GET ${this.getters.api.searches.data} ${res.data.users} ${res.data.tweets}`)
      // .then((res)=>{
      //   context.commit('setUsers', { users: res.data.users})
      //   context.commit('setSearchResultTweets', { tweets: res.data.tweets })
      // }).catch((err)=>{
      //   console.error(err)
      // })
    },
    judgePassword(context, payload){
      context.commit('setPasswordConfirmation', { value: payload.value })
      if(context.getters.passwordConfirmation == context.getters.currentUser.password ){
        context.commit('setDestroyUserDisabled', { value: false })
      }
    },
  },
})

export default store