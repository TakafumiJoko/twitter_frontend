<script>
  import AuthForm from "./AuthForm.vue"
  import { login } from "../modules/session.js"

  export default {
    name: "Signup",
    components: {
      AuthForm,
    },
    data() {
      return {
        user: {
          nickname: "",
          phone_number: "",
          email: "",
          birthday: "",
          password: "",
        },
        passwordConfirmation: "",
        canCreateUser: true,
      }
    },
    methods: {
      createUser(user, backend, frontend){
        for(let property in this.user) {
          if(this.user[property] == ""){
            delete this.user[property]
          }
        }
        axios({
          method: "post",
          url: `http://127.0.0.1:3000${backend}`,
          data: this.user,
        })
        .then((res) => {
          const user = res.data.user
          console.log(`POST ${backend} ${user}`)
          login(user.id)
          location.href = frontend + "/" + res.data.user.id
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
    watch: {
      passwordConfirmation(newPasswordConfirmation){
        if(this.user.password.length > 0 && this.user.password == newPasswordConfirmation){
          this.canCreateUser = false
        }
      }
    }
  }
</script>

<template>
  <label for="name">ニックネーム</label>
  <input type="text" v-model="user.nickname" id="name">
  <AuthForm :user="user" />
  <label for="birthday">生年月日</label>
  <input type="text" v-model="user.birthday" id="birthday">
  <label for="password">パスワード</label>
  <input type="password" v-model="user.password" id="password">
  <label for="password_congirmation">パスワード確認</label>
  <input type="password" v-model="passwordConfirmation" id="password_confirmation">
  <button @click="createUser(user, '/users', '/home')" :disabled="canCreateUser">アカウントを作成</button>
</template>