<script>
export default {
  name: "Tweet",
  data() {
    return {
    }
  },
  props: ["tweet"],
  emits: ["tweetUpdated", "tweetDestroyed"],
  mounted() {
  },
  methods: {
    updateTweet(tweet, backend){
      axios({
        method: "patch",
        url: `http://127.0.0.1:3000${backend}`,
        data: tweet,
      })
      .then((res) => {
        this.$emit("tweetUpdated", res)
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyTweet(tweet, backend){
      axios({
        method: "delete",
        url: `http://127.0.0.1:3000${backend}`,
      })
      .then(() => {
        this.$emit("tweetDestroyed", tweet)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<template>
  <textarea v-model="tweet.message" cols="20" rows="7"></textarea>
  <button @click="updateTweet(tweet, `/users/${$user.id}/tweets/${tweet.id}`)">更新</button>
  <!-- <span @click="showEditTweetModal">・・・</span> -->
  <button @click="destroyTweet(tweet, `/users/${$user.id}/tweets/${tweet.id}`)">削除</button>
</template>
