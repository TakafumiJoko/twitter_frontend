<script>
import { removeCookie } from '../modules/cookie'

  export default {
    methods: {
      logout(){
        removeCookie()
        this.$store.reset()
        this.$router.push({name: 'beforeLogin'})
      },
    }
  }
</script>

<template>
  <button @click="logout">ログアウト</button>
</template>