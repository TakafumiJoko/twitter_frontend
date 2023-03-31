<script>
  import ContactInput from "../components/ContactInput.vue"
  import { login } from "../modules/session.js"

  export default {
    name: "LoginView",
    data() {
      return {
        password: '',
        passwordConfirmation: '',
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
        axios.post(this.server + this.api.users.login)
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
  <VForm @submit.prevent="loginUser">
    <VTextField
      label="パスワード"
      v-model="password"
      type="password">
    </VTextField>
    <VTextField
      label="パスワード確認"
      v-model="passwordConfirmation"
      type="password">
    </VTextField>
    <VBtn @click="loginUser">
      次へ
    </VBtn>
  </VForm>
</template>