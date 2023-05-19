<template>
  <div class="container">
    <div class="left">
      <ul v-if="isLoggedIn">
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li><RouterLink :to="{ name: 'search' }">Search</RouterLink></li>
        <li><RouterLink :to="{ name: 'setting' }">Setting</RouterLink></li>
        <li><RouterLink :to="{ name: 'user', params: { username: currentUser.name } }">User</RouterLink></li>
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

<script>
import { RouterLink, RouterView } from 'vue-router'
import Account from './components/Account.vue'
import { getCurrentUser } from './api'
import { isLoggedIn } from './modules/cookie'

export default {
  name: "App",
  components: {
    Account,
  },
  data() {
    return {
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
  },
  methods: {
   
  },
  async created(){
    this.$store.commit('setIsLoggedIn', { isLoggedIn: isLoggedIn })
    if(this.isLoggedIn){
      const res = await getCurrentUser()
      console.log(res.data.user)
      this.$store.commit('setCurrentUser', { user: res.data.user })
    }
  },
}
</script>

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
