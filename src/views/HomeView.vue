<script>
import TweetForm from "../components/TweetForm.vue"
import TweetList from "../components/TweetList.vue"
export default {
  name: "HomeView",
  data(){
    return {
      newTweet: null,
    }
  },
  methods: {
    
  },
  components: {
    TweetForm,
    TweetList,
  },
}
</script>

<template>
  <TweetForm @tweet-created="(param) => { this.newTweet = param }" />
  <TweetList :new-tweet="newTweet" />  
</template>