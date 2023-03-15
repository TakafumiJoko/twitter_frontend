<script>
  export default {
    name: "SearchForm",
    data() {
      return {
        key: null,
        datum: {
          users: null,
        }, 
      }
    },
    methods: {
      getData() {
        axios({
          method: "get",
          url: `http://127.0.0.1:3000/${this.key}`
        }).then((res)=>{
          this.datum.users = res.data.users
        }).catch((err)=>{
          console.error(err)
        })
      },
    },
  }
</script>

<template>
  <input type="text" v-model="key">
  <button @click="getData">検索</button>
  <div v-for="user in datum.users">
    <div @click="$router.push({ name: 'user', params: { id: user.id }})">{{ user.nickname }}</div>
  </div>
</template>