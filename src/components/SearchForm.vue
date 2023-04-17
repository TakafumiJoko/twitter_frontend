<script>
  export default {
    name: "SearchForm",
    computed: {
      users(){
        return this.$store.getters.users
      },
      searchResultTweets(){
        return this.$store.getters.searchResultTweets
      },
      searchWord(){
        return this.$store.getters.searchWord
      },
    },
    methods: {
      getData() {
        this.$store.dispatch('searchUsers')
        // this.$store.dispatch('getData', { mode: { tweets: 'searchResult' } })
      },
      getUserTweets(user){
        this.$store.dispatch('getTweets', { userId: user.id, mode: 'user' })
        this.$router.push({ name: 'user', params: { id: user.id } })
      },
      getSearchResultTweets(){
        this.$store.dispatch('getTweets', { user: 'user', mode: { tweets: 'searchResult' } })
      },
    },
  }
</script>

<template>
  <VForm @submit.prevent="getData">
    <VTextField
      @change="$store.commit('setSearchWord', { searchWord: $event.target.value })"
    ></VTextField>
    <VBtn @click="getData">検索</VBtn>
  </VForm>
  <div v-for="user in users">
    <div @click="getUserTweets(user)">{{ user.nickname }}</div>
  </div>
  <div v-if="searchResultTweets">
    <div @click="getSearchResultTweets">{{ key + " " + searchResultTweets.length }}</div>
  </div>
</template>