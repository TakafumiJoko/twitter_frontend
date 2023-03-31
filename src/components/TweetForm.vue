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
      console.log(this.message)
      this.$store.dispatch('createTweet')
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