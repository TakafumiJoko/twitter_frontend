<script>

export default {
  name: "SettingView",
  data(){
    return {
    }
  },
  computed: {
    searchResulttweets(){
      return this.$store.getters.searchResulttweets
    }
  },
  created(){
    console.log(this.searchResulttweets)
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
