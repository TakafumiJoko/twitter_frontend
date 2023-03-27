<script>
export default {
  name: "TweetForm",
  data() {
    return {
    }
  },
  computed: {
    tweet(){
      return this.$store.getters.tweet
    },
  },
  methods: {
    createTweet(){
      this.$store.dispatch('createTweet')
    }
  },
}
</script>

<template>
  <div>
    <textarea :value="tweet.message" @change="$store.commit('setTweet', { message: $event.target.value })" cols="20" rows="7" placeholder="投稿してください"></textarea>
    <button @click="createTweet">ツイートする</button>
  </div>
</template>