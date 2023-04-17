<script>
import { logOut } from '../modules/session'

  export default {
    methods: {
      logout(){
        logOut()
        this.$store.reset()
        this.$router.push({name: 'beforeLogin'})
      },
    }
  }
</script>

<template>
  <button @click="logout">ログアウト</button>
</template>