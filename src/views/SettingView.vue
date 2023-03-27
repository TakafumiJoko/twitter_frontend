<script>

export default {
  name: "SettingView",
  data(){
    return {
    }
  },
  computed: {
    searchResultTweets(){
      return this.$store.getters.searchResultTweets
    }
  },
  created(){
    console.log(this.searchResultTweets)
  }
}
</script>

<template>
      <nav>
        <RouterLink :to="{ name: 'settingAccount' }">アカウント</RouterLink>
      </nav>
</template>

<style scoped>

</style>
