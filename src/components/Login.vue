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
        submitData: {
          id: 0, 
          phone_number: "",
          email: "",
          password: "",
        },
      }
    },
    methods: {
      loginUser(submitData, backend, frontend){
        for(let property in submitData) {
          if(submitData[property] == ""){
            delete submitData[property]
          }
        }
        const bodyParams = new URLSearchParams(submitData)
        axios({
          method: "post",
          url: `http://127.0.0.1:3000${backend}`,
          data: bodyParams,
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
  }
</script>

<template>
  <AuthForm :submitData="submitData" />
  <label for="password">パスワード</label>
  <input type="password" v-model="submitData.password" id="password">
  <button @click="loginUser(submitData, '/login', '/home')">ログインする</button>
</template>