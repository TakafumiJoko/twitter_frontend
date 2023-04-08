<script>
import TweetForm from "../components/TweetForm.vue"
import TweetList from "../components/TweetList.vue"
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
    TweetList,
    SearchForm,
  },
  // created(){
  //   this.$store.dispatch('getTweets', { mode: { user: 'currentUser', tweets: 'currentUser' } })
  //   this.$store.dispatch('getFollowings')
  // },
}
</script>

<template>
  <!-- <TweetForm/>
  <TweetList />  
  <SearchForm></SearchForm> -->
</template>