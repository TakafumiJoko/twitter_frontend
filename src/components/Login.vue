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
        cookieData: {
          id: 0,
        },
        formData: {
          phone_number: "",
          email: "",
        },
      }
    },
    methods: {
      loginUser(formData, backend, frontend){
        for(let property in formData) {
          if(formData[property] == ""){
            delete formData[property]
          }
        }
        const submitData = Object.assign(this.cookieData, formData)
        console.log(submitData)
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
  <AuthForm :formData="formData" />
  <button @click="loginUser(formData, '/login', '/home')">ログインする</button>
</template>