import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'
import { cookieUserId } from '../modules/session'


var store = createStore(Vuex.Store, {
  state() {
    return {
      server: 'http://127.0.0.1:3000',
      cookieUserId: cookieUserId(),
      currentUser: {},
      passwordConfirmation: undefined,
      user: {},
      userId: undefined,
      users: undefined,
      tweet: {},
      tweets: {
        currentUser: undefined,
        user: undefined,
        searchResult: undefined,
      },
      searchResultTweets: undefined,
      mode: {
        tweets: undefined,
        page: 'introduction',
      },
      key: undefined,
      // category: undefined,
      password: undefined,
      destroyUserDisabled: true,
      errorMessage: {
        user: {
          nickname: '長さは8文字以上'
        },
        tweets: {},
      },
    }
  },
  getters: {
    server(state){
      return state.server
    },
    isLoggedIn(state){
      return state.cookieUserId ? true : false
    },
    userId(state){
      return state.userId
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
    cookieUserId(state){
      return state.cookieUserId
    },
    passwordConfirmation(state){
      return state.passwordConfirmation
    },
    createUserDisabled(state){
      return !(state.user.password != null && state.user.password == state.passwordConfirmation)
    },
    contact(state){
      return state.contact
    },
    users(state){
      return state.users
    },
    tweet(state){
      return state.tweet
    },
    tweets(state){
      return state.tweets[`${state.mode.tweets}`]
    },
    searchResultTweets(state){
      return state.searchResultTweets
    },
    key(state){
      return state.key
    },
    // category(state){
    //   return state.category
    // },
    api(state) {
      return {
        users: {
          login: '/login',
          index: '/users',
          create: '/users',
          show: {
            currentUser: `/users/${state.cookieUserId}`,
            user: `/users/${state.userId}`,
          },
          update: `/users/${state.cookieUserId}`,
          destroy: `/users/${state.cookieUserId}`,
        },
        tweets: {
          index: {
            currentUser: `/users/${state.cookieUserId}/tweets`,
            user: `/users/${state.userId}/tweets`,
          },
          create: `/users/${state.cookieUserId}/tweets`,
          show: {
            currentUser: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
            user: `/users/${state.userId}/tweets/${state.tweet.id}`,
          },
          update: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
          destroy: `/users/${state.cookieUserId}/tweets/${state.tweet.id}`,
        },
        application: {
          search: `/${state.key}`,
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
    setCurrentUser(state, payload){
      state.currentUser = payload.user
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
      state.tweet = payload
    },
    clearTweet(state){
      state.tweet = {}
    },
    setTweetsMode(state, payload){
      state.mode.tweets = payload.mode.tweets
    },
    setTweets(state, payload){
      state.tweets[`${state.mode.tweets}`] = payload.tweets
    },
    setSearchResultTweets(state, payload){
      state.searchResultTweets = payload.tweets
    },
    setKey(state, payload){
      state.key = payload.key
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
    getUser(context, payload){
      axios.get(context.getters.server + context.getters.api.users.show.user)
      .then((res) => {
        console.log(`GET ${context.getters.api.users.show.user} ${res.data.user.nickname}`)
        context.commit('setUser', { user: res.data.user })
      })
      .catch(error => {
        console.log(error)
      })
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
    createTweet(context, payload){
      axios.post(context.getters.server + context.getters.api.tweets.create, context.getters.tweet)
      .then((res) => {
        console.log(`POST ${context.getters.api.tweets.create} ${res.data.tweet.message}`)
        context.commit('clearTweet')
      })
      .catch(error => {
        console.log(error)
      })
    },
    getTweets(context, payload){
      axios.get(context.getters.server + context.getters.api.tweets.index[`${payload.mode.user}`])
      .then((res) => {
        console.log('GET ' + context.getters.api.tweets.index[`${payload.mode.user}`] + ' ' + res.data.tweets.first?.message)
        context.commit('setTweetsMode', { mode: payload.mode })
        context.commit('setTweets', { list: res.data.tweets })
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyTweet(context, payload){
      context.commit('setTweet', payload.tweet)
      axios.delete(context.getters.server + context.getters.api.tweets.destroy)
      .then((res) => {
        context.commit('clearTweet')
        console.log(`DELETE ${context.getters.api.tweets.destroy} ${res.data.tweet.message}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getData(context, payload){
      axios.get(context.getters.server + context.getters.api.application.search)
      .then((res)=>{
        context.commit('setUsers', { users: res.data.users})
        context.commit('setSearchResultTweets', { tweets: res.data.tweets })
      }).catch((err)=>{
        console.error(err)
      })
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