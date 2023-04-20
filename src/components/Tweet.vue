<script>
import { ssrContextKey } from 'vue'
import tweetModal from './tweetModal.vue'

export default {
  name: "tweet",
  components: { 
    tweetModal,
  },
  data() {
    return {
      isVisible: undefined
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    tweetUser(){
      return this.$store.getters.tweetUser
    },
  },
  props: ["tweet"],
  methods: {
    destroytweet(){
      this.$store.dispatch('destroytweet', { tweet: this.tweet })
    },
    showtweetModal(){
      this.isVisible = true
    },
    closetweetModal(){
      this.isVisible = false
    },
  },
  created(){
    this.$store.commit('setTweet', { tweet: this.tweet })
  },
}
</script>

<template>
  <div v-if="tweet.user_id === currentUser.id" @click="$router.push({ name: 'tweetDetail', params: { user_id: currentUser.id, id: tweet.id } })">
    <!-- <span @click="showEdittweetModal">・・・</span> -->
    {{ tweet.message }}
    <button @click="destroytweet">削除</button>
  </div>
  <div v-else @click="$router.push({ name: 'tweetDetail', params: { user_id: tweetUser.id, id: tweet.id } })">
    {{ tweetUser.nickname }}
    <span @click="showtweetModal">・・・</span>
    {{ tweet.message }}
    <tweetModal :tweet="tweet" :isVisible="isVisible" @close="closetweetModal" />
  </div>
</template>
