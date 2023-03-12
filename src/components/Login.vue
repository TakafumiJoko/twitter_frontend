<script>
  import AuthForm from "./AuthForm.vue"
  import { login } from "../modules/session.js"

  export default {
    name: "Login",
    components: {
      AuthForm,
    },
    data() {
      return {
        user: {
          phone_number: "",
          email: "",
          password: "",
        },
      }
    },
    methods: {
      loginUser(user, backend, frontend){
        for(let property in this.user) {
          if(this.user[property] == ""){
            delete this.user[property]
          }
        }
        axios({
          method: "post",
          url: `http://127.0.0.1:3000${backend}`,
          data: user,
        })
        .then((res) => {
          const user = res.data.user
          console.log(`POST ${backend} ${user}`)
          login(user.id)
          location.href = frontend
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
  }
</script>

<template>
  <AuthForm :user="user" />
  <label for="password">パスワード</label>
  <input type="password" v-model="user.password" id="password">
  <button @click="loginUser(user, '/login', '/home')">ログインする</button>
</template>