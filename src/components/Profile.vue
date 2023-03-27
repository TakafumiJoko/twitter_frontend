<script>

  export default {
    name: "Profile",
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
  }
</script>

<template>
  <h2>{{ currentUser.nickname }}</h2>
  <h3>{{ currentUser.name }}</h3>
  <h3>{{ currentUser.birthday }}</h3>
</template>