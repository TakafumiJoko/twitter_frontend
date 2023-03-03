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
        formData: {
          nickname: "",
          phone_number: "",
          email: "",
          birthday: "",
        },
      }
    },
    methods: {
      createUser(formData, backend, frontend){
        for(let property in formData) {
          if(formData[property] == ""){
            delete formData[property]
          }
        }
        const bodyParams = new URLSearchParams(formData)
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
  <label for="name">ニックネーム</label>
  <input type="text" v-model="formData.nickname" id="name">
  <AuthForm :formData="formData" />
  <label for="birthday">生年月日</label>
  <input type="text" v-model="formData.birthday" id="birthday">
  <button @click="createUser(formData, '/signup', '/home')">アカウントを作成</button>
</template>