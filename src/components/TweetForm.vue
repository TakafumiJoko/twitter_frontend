<script>
export default {
  name: "tweetForm",
 
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
    tweet(){
      this.$store.dispatch('tweet', { tweet: { message: this.message } })
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
      <VBtn @click="tweet">ツイートする</VBtn>
    </VForm>
  </div>
</template>