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
      key(){
        return this.$store.getters.key
      },
    },
    methods: {
      getData() {
        this.$store.dispatch('getData', { mode: { tweets: 'searchResult' } })
      },
      getUserTweets(user){
        this.$store.dispatch('getTweets', { user: user, mode: 'user' })
      },
      getSearchResultTweets(){
        this.$store.dispatch('getTweets', { mode: { tweets: 'searchResult' } })
      },
    },
  }
</script>

<template>
  <VForm @submit.prevent="getData">
    <VTextField
      @change="$store.commit('setKey', { key: $event.target.value })"
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