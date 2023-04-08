<script>
import { RouterLink, RouterView } from 'vue-router'
import Account from './components/Account.vue'
import { cookieUserId } from './modules/session'

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
    cookieUserId(){
      return this.$store.getters.cookieUserId
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
  },
  created(){
    this.$store.commit('setCookieUserId', { userId: cookieUserId() })
    if(this.isLoggedIn) this.$store.dispatch('getCurrentUser')
    this.$store.dispatch('getUsers')
  },
}
</script>

<template>
  <header>
    <nav v-if="!isLoggedIn">
      <RouterLink :to="{ name: 'beforeLogin' }">ログイン前</RouterLink>
    </nav>
    <nav v-else>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'search' }">Search</RouterLink>
      <RouterLink :to="{ name: 'user', params: { id: cookieUserId } }">User</RouterLink>
      <RouterLink :to="{ name: 'setting' }">Setting</RouterLink>
      <Account />
    </nav>
    <nav>
      <RouterLink :to="{ name: 'adminTrend' }">トレンド管理</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>

</style>
