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
    }
  },
  props: ["newTweet"],
  mounted() {
    const user_id = $cookies.get("user_id")
    if(user_id != null){
      this.getTweets(`/users/${user_id}/tweets`)
    }
  },
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
    }
  },
}
</script>

<template>
  <div v-for="tweet in tweets" :key="tweet.id">
    <Tweet :tweet="tweet" @tweet-updated="tweetUpdated" @tweet-destroyed="(tweet) => { this.tweets = this.tweets.filter((t) => t.id != tweet.id) }" />
  </div>
</template>