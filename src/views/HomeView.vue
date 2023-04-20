<script>
import tweetForm from "../components/TweetForm.vue"
import tweetList from "../components/tweetList.vue"
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
    tweetForm,
    tweetList,
    SearchForm,
  },
  created(){
    this.$store.dispatch('getTweets', { mode: { user: 'currentUser', tweets: 'currentUser' } })
    this.$store.dispatch('getFollowings')
  },
}
</script>

<template>
  <tweetForm/>
  <tweetList />  
  <SearchForm></SearchForm>
</template>