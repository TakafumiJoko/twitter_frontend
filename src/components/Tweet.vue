<script>
import TweetModal from './TweetModal.vue'
import { baseURL } from '../api'

export default {
  components: { 
    TweetModal,
  },
  data() {
    return {
      isVisible: undefined,
      imageURLList: [],
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    tweetUser(){
      return this.$store.getters.tweetUser
    },
    baseURL(){
      return baseURL
    }
  },
  props: ["tweet"],
  methods: {
    destroytweet(){
      this.$store.dispatch('destroytweet', { tweet: this.tweet })
    },
    showtweetModal(){
      this.isVisible = true
    },
    closeTweetModal(){
      this.isVisible = false
    },
  },
}
</script>

<template>
  {{ tweet.message }}
  <ul v-if="tweet.images">
    <li v-for="image in tweet.images">
      <img :src="baseURL + image.url">
    </li>
  </ul>
  <!-- <div v-if="tweet.username === currentUser.id" @click="$router.push({ name: 'tweetDetail', params: { username: currentUser.id, id: tweet.id } })">
    {{ tweet.message }}
    <button @click="destroytweet">削除</button>
  </div>
  <div v-else @click="$router.push({ name: 'tweetDetail', params: { username: tweetUser.id, id: tweet.id } })">
    {{ tweetUser.nickname }}
    <span @click="showtweetModal">・・・</span>
    {{ tweet.message }}
    <TweetModal :tweet="tweet" :isVisible="isVisible" @close="closeTweetModal" />
  </div> -->
</template>