<script>
  import ContactInput from "../components/ContactInput.vue"
  import { login } from "../modules/session.js"

  export default {
    name: "LoginModalView",
    components: {
      ContactInput,
    },
    data() {
      return {
        user: {},
      }
    },
    computed: {
      server(){
        return this.$store.getters.server
      },
      api(){
        return this.$store.getters.api
      },
    },
    methods: {
      loginUser(){
        axios.post(this.server + this.api.users.login, this.user)
        .then((res) => {
          console.log(`POST ${context.getters.api.users.login} ${res.data.user.nickname}`)
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
    created(){
      this.$store.reset()
    },
  }
</script>

<template>
  <ContactInput :user="user"></ContactInput>
  <label for="password">パスワード</label>
  <input type="password" v-model="user.password" id="password">
  <button @click="loginUser">ログインする</button> 
</template>