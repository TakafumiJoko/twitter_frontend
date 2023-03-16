<script>
import Tweet from "./Tweet.vue"
export default {
  name: "TweetList",
  components: {
    Tweet,
  },
  data() {
    return {
      tweets: null,
      mode: null,
    }
  },
  props: ["newTweet", "user", "searchedTweets"],
  methods: {
    getTweets(backend){
      axios({
        method: "get",
        url: `http://127.0.0.1:3000${backend}`,
      })
      .then((res) => {
        this.tweets = res.data.tweets
        console.log(`GET ${backend} ${this.tweets}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
    tweetUpdated(res){
      this.tweets = this.tweets.map(({id, message, user_id}) => {
        if(id === res.data.tweet.id) {
            return res.data.tweet
          }
        return {id, message, user_id}
      })
    }
  },
  watch: {
    newTweet(newNewTweet, oldNweTweet) {
      this.tweets.push(newNewTweet)
    },
    user(newUser, oldUser) {
      this.getTweets(`/users/${newUser.id}/tweets`)
    },
    searchedTweets(newSearched) {
      this.mode = "Searched"
    },
  },
  created(){
    if(this.$route.name === "home" || this.$route.name === "user") {
      this.mode = "Personal"
    } else if (this.$route.name === "search") {
      this.mode = "BeforeSearch"
    }
  },
}
</script>

<template>
  <div v-if="mode === 'Personal'">
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" :mode="mode" @tweet-updated="tweetUpdated" @tweet-destroyed="(tweet) => { this.tweets = this.tweets.filter((t) => t?.id != tweet?.id) }" />
  </div>
  <div v-if="mode === 'Searched'">
    <Tweet v-for="tweet in searchedTweets" :key="tweet.id" :tweet="tweet" :mode="mode" />
  </div>
</template>