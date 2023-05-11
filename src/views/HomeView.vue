<script>
import TweetForm from "../components/TweetForm.vue"
import Tweets from "../components/Tweets.vue"
import SearchForm from "../components/SearchForm.vue"

export default {
  name: "HomeView",
  data(){
    return {
    }
  },
  methods: {
  },
  components: {
    TweetForm,
    Tweets,
    SearchForm,
  },
  created(){
    this.$store.dispatch('getTweets', { mode: { user: 'currentUser', tweets: 'currentUser' } })
    this.$store.dispatch('getFollowings')
  },
}
</script>

<template>
  <TweetForm/>
  <Tweets />  
  <SearchForm></SearchForm>
</template>