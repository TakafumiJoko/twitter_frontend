<script>
export default {
  name: "Tweet",
  data() {
    return {
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    }
  },
  props: ["tweet"],
  methods: {
    destroyTweet(){
      this.$store.dispatch('destroyTweet', { tweet: this.tweet })
    },
  },
}
</script>

<template>
  <div v-if="tweet.user_id === currentUser.id">
    <!-- <span @click="showEditTweetModal">・・・</span> -->
    {{ tweet.message }}
    <button @click="destroyTweet">削除</button>
  </div>
  <div v-else>
    {{ tweet.message }}
  </div>
</template>
