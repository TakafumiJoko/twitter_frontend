<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: "App",
  data() {
    return {
    }
  },
  computed: {
    cookieUserId(){
      return this.$store.getters.cookieUserId
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
  },
  mounted(){
    this.$store.dispatch('getUsers')
    if(this.isLoggedIn) this.$store.dispatch('getCurrentUser')
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
    </nav>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>

</style>
