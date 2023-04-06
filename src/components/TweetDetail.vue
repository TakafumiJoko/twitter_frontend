<script>
// import { ssrContextKey } from 'vue'
// import TweetModal from './TweetModal.vue'
import TweetList from './TweetList.vue'

export default {
  name: "TweetDetail",
  components: { 
    TweetList,
    // TweetModal,
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
    // destroyTweet(){
    //   this.$store.dispatch('destroyTweet', { tweet: this.tweet })
    // },
    // showTweetModal(){
    //   this.isVisible = true
    // },
    // closeTweetModal(){
    //   this.isVisible = false
    // },
    createReply(){
      this.$store.dispatch('createReply', { tweet: { message: this.message } })
    },
  },
  created(){
    this.$store.commit('setUserId', { userId: this.$route.params.user_id })
    this.$store.commit('setTweetId', { tweetId: this.$route.params.id })
    this.$store.dispatch('getTweet')
  },
}
</script>

<template>
  <!-- <div v-if="tweet.user_id === currentUser.id" @click="$router.push({ name: 'TweetDetail', params: { user_id: currentUser.id, id: tweet.id } })">
    {{ tweet.message }}
    <button @click="destroyTweet">削除</button>
  </div>
  <div v-else @click="$router.push({ name: 'TweetDetailView', params: { user_id: tweetUser.id, id: tweet.id } })">
    {{ tweetUser.nickname }}
    <span @click="showTweetModal">・・・</span>
    {{ tweet.message }}
    <TweetModal :tweet="tweet" :isVisible="isVisible" @close="closeTweetModal" />
  </div> -->
  {{ tweet.message }}
  <input type="text" v-model="message">
  <button @click="createReply">返信</button>
  <TweetList />
</template>
