<script>
// import { ssrContextKey } from 'vue'
// import TweetModal from './TweetModal.vue'
import Tweets from './Tweets.vue'

export default {
  name: "tweetDetail",
  components: { 
    Tweets,
    // tweetModal,
  },
  data() {
    return {
      // isVisible: undefined
      message: '',
    }
  },
  computed: {
    // currentUser(){
    //   return this.$store.getters.currentUser
    // },
    // tweetUser(){
    //   return this.$store.getters.tweetUser
    // },
    tweet(){
      return this.$store.getters.tweet
    },
  },
  methods: {
    // destroytweet(){
    //   this.$store.dispatch('destroytweet', { tweet: this.tweet })
    // },
    // showtweetModal(){
    //   this.isVisible = true
    // },
    // closetweetModal(){
    //   this.isVisible = false
    // },
    createReply(){
      this.$store.dispatch('createReply', { tweet: { message: this.message } })
    },
  },
  created(){
    this.$store.commit('setUserId', { username: this.$route.params.username })
    this.$store.commit('setTweetId', { tweetId: this.$route.params.id })
    this.$store.dispatch('getTweet')
  },
}
</script>

<template>
  <!-- <div v-if="tweet.username === currentUser.id" @click="$router.push({ name: 'tweetDetail', params: { username: currentUser.id, id: tweet.id } })">
    {{ tweet.message }}
    <button @click="destroytweet">削除</button>
  </div>
  <div v-else @click="$router.push({ name: 'tweetDetailView', params: { username: tweetUser.id, id: tweet.id } })">
    {{ tweetUser.nickname }}
    <span @click="showtweetModal">・・・</span>
    {{ tweet.message }}
    <tweetModal :tweet="tweet" :isVisible="isVisible" @close="closetweetModal" />
  </div> -->
  {{ tweet.message }}
  <input type="text" v-model="message">
  <button @click="createReply">返信</button>
  <Tweets />
</template>
