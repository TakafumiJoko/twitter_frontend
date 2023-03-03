<script>
import Signup from "../components/Signup.vue"
import Login from "../components/Login.vue"

export default {
  name: "BeforeLoginView",
  components: {
    Signup,
    Login,
  },
}
</script>

<template>
  <Signup />
  <br>
  <Login />
</template>
