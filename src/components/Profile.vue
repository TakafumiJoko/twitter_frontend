<script>

  export default {
    name: "Profile",
    data() {
      return {
      }
    },
    methods: {
    },  
    props: ['user'],
  }
</script>

<template>
  <img src="a">
  <h2>{{ user.nickname }}</h2>
  <h3>{{ user.name }}</h3>
  <h3>{{ user.birthday }}</h3>
</template>