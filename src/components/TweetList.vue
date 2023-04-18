<script>
import tweet from "./tweet.vue"
export default {
  name: "tweets",
  components: {
    tweet,
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
  <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" /> 
</template>