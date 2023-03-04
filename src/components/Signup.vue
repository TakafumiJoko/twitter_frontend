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
        },
      }
    },
    methods: {
      createUser(submitData, backend, frontend){
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
  <label for="name">ニックネーム</label>
  <input type="text" v-model="submitData.nickname" id="name">
  <AuthForm :submitData="submitData" />
  <label for="birthday">生年月日</label>
  <input type="text" v-model="submitData.birthday" id="birthday">
  <button @click="createUser(submitData, '/signup', '/home')">アカウントを作成</button>
</template>