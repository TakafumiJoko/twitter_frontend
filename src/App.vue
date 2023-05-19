<script>
import { RouterLink, RouterView } from 'vue-router'
import Account from './components/Account.vue'
import { username, getCurrentUser } from './api'

export default {
  name: "App",
  components: {
    Account,
  },
  data() {
    return {
      username: username,
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {   
    
  },
  async created(){
    if(this.username !== undefined){
      this.cookie = username
    }
    if(!this.currentUser){
      const res = await getCurrentUser()
      console.log(res.data.user)
      this.$store.commit('setCurrentUser', { user: res.data.user })
    }
    // this.$store.dispatch('getUsers')
  },
}
</script>

<template>
  <div class="container">
    <div class="left">
      <ul v-if="isLoggedIn">
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li><RouterLink :to="{ name: 'search' }">Search</RouterLink></li>
        <li><RouterLink :to="{ name: 'setting' }">Setting</RouterLink></li>
        <li><RouterLink :to="{ name: 'user', params: { username: username } }">User</RouterLink></li>
        <li><Account></Account></li>
      </ul>
    </div>
    <main class="center">
      <RouterView></RouterView>
    </main>
    <div class="right">
      <div v-if="isLoggedIn">

      </div>
      <div v-else>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.left {
  width: 15%;
}
.center {
  width: 60%;
}
.right {
  width: 25%;
}
</style>
