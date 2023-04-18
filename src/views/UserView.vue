<script>
import Profile from "../components/Profile.vue"
import ProfileForm from "../components/ProfileForm.vue"
import SearchForm from "../components/SearchForm.vue"
import tweetList from "../components/tweetList.vue"

export default {
  name: "UserView",
  components: {
    Profile,
    ProfileForm,
    SearchForm,
    tweetList,
  },
  data() {
    return {
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    userId(){
      return this.$store.getters.userId
    }, 
  },
  methods: {
 
  },
  created(){
    this.$store.commit('setUserId', { userId: this.$route.params.id })
    console.log(this.userId)
    this.$store.dispatch('getUser').then(this.$store.dispatch('getTweets', { userId: this.userId,  mode: { tweets: 'user' } }))
  },
}
</script>

<template>
  <Profile/>
  <tweetList/>  
  <ProfileForm v-if="userId==currentUser.id"/>
  <SearchForm></SearchForm>
</template>