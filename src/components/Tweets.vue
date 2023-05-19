<template>
  <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" /> 
</template>

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
   
  },
  methods: {
  
  },
  props: ['tweets'],
}
</script>
