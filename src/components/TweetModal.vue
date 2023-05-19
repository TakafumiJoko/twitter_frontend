<template to="body">
  <div class="modal" id="sample-modal" v-show="isVisible" @click="close"></div>
  <div class="modal-content" v-show="isVisible">
    <slot></slot>
    <div>このツイートに興味がない</div>
    <div @click="follow">{{ tweetUser.name }}さんをフォロー</div>
    <div @click="unfollow">{{ tweetUser.name }}さんのフォローを解除</div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      requireed: true,
      type: Boolean,
      default: false,
    },
    tweet: {}
  },
  data() {
    return {

    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  computed: {
    following(){
      return this.$store.getters.following
    },
    tweetUser(){
      return this.$store.getters.tweetUser
    }
  },
  methods: {
    follow(){
      this.$store.dispatch('follow', { api: `/${this.tweetUser.id}` })
    },
    unfollow(){
      this.$store.dispatch('unfollow', { api: `/${this.tweetUser.id}` })
    }
  }
}
</script>

<style scoped lang="sass">
  .modal 
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: rgba(0, 0, 0, .5)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
  
  .modal-content
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: rgba(0,0,0,.5)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    background-color: white
    width: 400px
    height: 600px
    border-radius: 20px
    padding: 20px
</style>