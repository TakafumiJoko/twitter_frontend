<script>
export default {
  name: "TweetForm",
 
  data() {
    return {
      message: '',
    }
  },
  computed: {
    tweet(){
      return this.$store.getters.tweet
    },
  },
  methods: {
    createTweet(){
      this.$store.dispatch('createTweet', { tweet: { message: this.message } })
    }
  },
}
</script>

<template>
  <div>
    <VForm>
      <VTextarea
        v-model="message"
      ></VTextarea>
      <VBtn @click="createTweet">ツイートする</VBtn>
    </VForm>
  </div>
</template>