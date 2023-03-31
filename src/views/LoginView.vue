<script>
  import { login } from "../modules/session.js"

  export default {
    name: "LoginView",
    data() {
      return {
        user: {
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        },
        contact: 'phoneNumber',
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
  <VForm @submit.prevent="loginUser">
    <div v-if="contact == 'phoneNumber'">
      <VTextField label="電話番号" v-model="user.phoneNumber" />
      <span @click="contact='email'">代わりにメールアドレスを登録する</span>
    </div>
    <div v-if="contact == 'email'">
      <VTextField label="メールアドレス" v-model="user.email" />
      <span @click="contact='phoneNumber'">代わりに電話番号を登録する</span>
    </div>
    <VTextField
      label="パスワード"
      v-model="user.password"
      type="password">
    </VTextField>
    <VTextField
      label="パスワード確認"
      v-model="user.passwordConfirmation"
      type="password">
    </VTextField>
    <VBtn @click="loginUser">
      次へ
    </VBtn>
  </VForm>
</template>