<script>
  import { setCookie, getCookie } from "../modules/cookie.js"

  export default {
    name: "LoginView",
    data() {
      return {
        user: {
          phoneNumber: '',
          email: '',
          password: '',
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
      login(){
        axios.post(this.server + this.api.cookies.login, this.cookie)
        .then((res) => {
          console.log(`SUCCESS POST ${this.api.cookies.login} ${res.data.user.nickname}`)
          this.$store.commit('setCurrentUser', { user: res.data.user })
          setCookie(res.data.user)
          this.$store.commit('setCookieUserId', { username: username })
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
    created(){
    },
  }
</script>

<template>
  <VForm @submit.prevent="login">
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
    <VBtn @click="login">
      ログイン
    </VBtn>
  </VForm>
</template>