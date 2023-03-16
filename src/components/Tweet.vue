<script>
export default {
  name: "Tweet",
  data() {
    return {
      message: this.tweet.message,
    }
  },
  props: ["tweet", "user", "mode"],
  emits: ["tweetUpdated", "tweetDestroyed"],
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
  <div v-if="mode === 'Personal'">
    <textarea v-model="message" cols="20" rows="7"></textarea>
    <button @click="updateTweet(tweet, `/users/${user?.id}/tweets/${tweet?.id}`)">更新</button>
    <!-- <span @click="showEditTweetModal">・・・</span> -->
    <button @click="destroyTweet(tweet, `/users/${user?.id}/tweets/${tweet?.id}`)">削除</button>
  </div>
  <div v-if="mode === 'Searched'">
    {{ tweet.message }}
  </div>
</template>
