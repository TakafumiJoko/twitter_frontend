<script>
import Tweet from './Tweet.vue'
export default {
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
  created(){
    console.log(this.tweets)
  }
}
</script>

<template>
  <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" /> 
</template>