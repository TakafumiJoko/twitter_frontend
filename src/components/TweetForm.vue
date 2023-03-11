<script>
export default {
  name: "TweetForm",
  data() {
    return {
      submitData: {
        message: "",
      },
    }
  },
  emits: ["tweetCreated"],
  methods: {
    createTweet(submitData, backend){
      axios({
        method: "post",
        url: `http://127.0.0.1:3000${backend}`,
        data: submitData,
      })
      .then((res) => {
        this.$emit("tweetCreated", res.data.tweet)
        console.log(`POST ${backend}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<template>
  <textarea v-model="submitData.message" cols="20" rows="7" placeholder="投稿してください"></textarea>
  <button @click="createTweet(submitData, `/users/${$user.id}/tweets`)">ツイートする</button>
</template>