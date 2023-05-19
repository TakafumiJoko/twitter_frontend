<template>
  <VForm @submit.prevent="getData">
    <VTextField
      @change="$store.commit('setSearchWord', { searchWord: $event.target.value })"
    ></VTextField>
    <VBtn @click="getData">検索</VBtn>
  </VForm>
  <div v-for="user in users">
    <div @click="getUsertweets(user)">{{ user.nickname }}</div>
  </div>
  <div v-if="searchResulttweets">
    <div @click="getSearchResulttweets">{{ key + " " + searchResulttweets.length }}</div>
  </div>
</template>

<script>
  export default {
    name: "SearchForm",
    computed: {
      users(){
        return this.$store.getters.users
      },
      searchResulttweets(){
        return this.$store.getters.searchResulttweets
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
      getUsertweets(user){
        this.$emit('setUser', user)
        this.$store.dispatch('getTweets', { username: user.id, mode: 'user' })
        this.$router.push({ name: 'user', params: { id: user.id } })
      },
      getSearchResulttweets(){
        this.$store.dispatch('getTweets', { user: 'user', mode: { tweets: 'searchResult' } })
      },
    },
    emits: ['set-user'],
  }
</script>
