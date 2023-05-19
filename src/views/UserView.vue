<script>
import Profile from "../components/Profile.vue"
import ProfileForm from "../components/ProfileForm.vue"
import SearchForm from "../components/SearchForm.vue"
import Tweets from "../components/Tweets.vue"
import { getUser, getTweets } from '../api'
import store from "../store"

export default {
  name: "UserView",
  components: {
    Profile,
    ProfileForm,
    SearchForm,
    Tweets,
  },
  data() {
    return {
     
    }
  },
  computed: {
    tweets(){
      return this.$store.getters.tweets
    }
  },
  methods: {
    async getUser(){
      const res = await getUser(this.$route.params.username)
      console.log(`getUser:${res ? res.data.user.nickname : 'nothing'}`)
      this.$store.commit('setUser', { user: res.data.user })
    },
    async getTweets(){
      const res = await getTweets(this.$route.params.username)
      console.log(`getTweets:${res ? res.data.tweets[0].message : 'nothing'}`)
      this.$store.commit('setTweets', { tweets: res.data.tweets })
    }
  },
  created(){
    this.getUser()
    this.getTweets()
  },
}
</script>

<template>
  <Profile/>
  <Tweets/>  
  <ProfileForm v-if="userId==currentUser.id"/>
  <SearchForm></SearchForm>
  <!-- <Profile/> -->
  <Tweets v-if="tweets" />  
  <!-- <ProfileForm v-if="username==currentUser.id"/> -->
  <!-- <ProfileForm></ProfileForm> -->
  <!-- <SearchForm></SearchForm> -->
</template>