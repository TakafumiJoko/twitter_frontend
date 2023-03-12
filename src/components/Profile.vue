<script>
import { VueElement } from 'vue'
import TweetList from "../components/TweetList.vue"

  export default {
    name: "Profile",
    components: {
      TweetList,
    },
    data() {
      return {
        newTweet: null
      }
    },
    methods: {
    },
  }
</script>

<template>
  <h2>{{ $user.nickname }}</h2>
  <h3>{{ $user.name }}</h3>
  <h3>{{ $user.birthday }}</h3>
  <TweetList :new-tweet="newTweet" />  
</template>