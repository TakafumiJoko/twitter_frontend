<script>
import Tweet from "./Tweet.vue"
export default {
  name: "Tweets",
  components: {
    Tweet,
  },
  data() {
    return {
    }
  },
  computed: {
    tweets() {
      return this.$store.getters.tweets
    },
  },
  methods: {
  
  },
}
</script>

<template>
  <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" /> 
</template>