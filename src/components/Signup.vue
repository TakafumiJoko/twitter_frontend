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
        submitData: {
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
      createUser(submitData, backend, frontend){
        for(let property in submitData) {
          if(submitData[property] == ""){
            delete submitData[property]
          }
        }
        axios({
          method: "post",
          url: `http://127.0.0.1:3000${backend}`,
          data: submitData,
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
        if(this.submitData.password.length > 0 && this.submitData.password == newPasswordConfirmation){
          this.canCreateUser = false
        }
      }
    }
  }
</script>

<template>
  <label for="name">ニックネーム</label>
  <input type="text" v-model="submitData.nickname" id="name">
  <AuthForm :submitData="submitData" />
  <label for="birthday">生年月日</label>
  <input type="text" v-model="submitData.birthday" id="birthday">
  <label for="password">パスワード</label>
  <input type="password" v-model="submitData.password" id="password">
  <label for="password_congirmation">パスワード確認</label>
  <input type="password" v-model="passwordConfirmation" id="password_confirmation">
  <button @click="createUser(submitData, '/users', '/home')" :disabled="canCreateUser">アカウントを作成</button>
</template>