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
  methods: {
    createTweet(submitData, backend, frontend){
      const bodyParams = new URLSearchParams(submitData)
      axios({
        method: "post",
        url: `http://127.0.0.1:3000${backend}`,
        data: bodyParams,
      })
      .then((res) => {
        const tweet = res.data.tweet
        console.log(`POST ${backend} ${tweet.user_id}`)
        location.href = frontend + "/" + res.data.tweet.user_id
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
  <button @click="createTweet(submitData, `/users/${user.id}/tweets`, '/home')">ツイートする</button>
</template>