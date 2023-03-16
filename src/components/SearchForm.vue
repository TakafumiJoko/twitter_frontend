<script>
  export default {
    name: "SearchForm",
    data() {
      return {
        key: null,
        result: {
          users: null,
          tweets: null,
        }, 
      }
    },
    emits: ["tweetSearched", "test"],
    methods: {
      getData() {
        axios({
          method: "get",
          url: `http://127.0.0.1:3000/${this.key}`
        }).then((res)=>{
          this.result.users = res.data.users
          this.result.tweets = res.data.tweets
        }).catch((err)=>{
          console.error(err)
        })
      },
      searchTweet(result){
        this.$router.push({ name: 'search'})
        this.$emit("tweetSearched", result)
      },
    },
  }
</script>

<template>
  <button @click="$emit('test', { id: 1, message: 'テスト'})"></button>
  <input type="text" v-model="key">
  <button @click="getData">検索</button>
  <div v-for="user in result.users">
    <div @click="$router.push({ name: 'user', params: { id: user.id }})">{{ user.nickname }}</div>
  </div>
  <div v-if="result.tweets">
    <div @click="searchTweet(result.tweets)">{{ key + " " + result.tweets.length }}</div>
  </div>
</template>