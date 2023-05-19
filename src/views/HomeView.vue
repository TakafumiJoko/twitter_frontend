<script>
import TweetForm from "../components/TweetForm.vue"
import Tweets from "../components/Tweets.vue"
import SearchForm from "../components/SearchForm.vue"
import { getTweets } from "../api"

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
  computed: {
    
  },
  props: ['tweets'],
  async created(){
    const res = await getTweets()
    console.log(res.data.tweets[0]?.id)
    this.tweets = res.data.tweets
    // this.$store.dispatch('getFollowings')
  },
}
</script>

<template>
  <TweetForm/>
  <Tweets :tweets="tweets"/>  
  <SearchForm></SearchForm>
</template>