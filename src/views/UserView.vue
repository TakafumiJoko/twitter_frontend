<script>
import Profile from "../components/Profile.vue"
import ProfileForm from "../components/ProfileForm.vue"
import SearchForm from "../components/SearchForm.vue"
import Tweets from "../components/Tweets.vue"

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
  <Tweets/>  
  <ProfileForm v-if="userId==currentUser.id"/>
  <SearchForm></SearchForm>
</template>