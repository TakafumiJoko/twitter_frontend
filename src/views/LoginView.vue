<script>
  import { logIn, cookieUserId } from "../modules/session.js"

  export default {
    name: "LoginView",
    data() {
      return {
        session: {
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
        axios.post(this.server + this.api.sessions.login, this.session)
        .then((res) => {
          console.log(`SUCCESS POST ${this.api.sessions.login} ${res.data.user.nickname}`)
          this.$store.commit('setCurrentUser', { user: res.data.user })
          logIn(res.data.user)
          this.$store.commit('setCookieUserId', { userId: cookieUserId() })
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
      <VTextField label="電話番号" v-model="session.phoneNumber" />
      <span @click="contact='email'">代わりにメールアドレスを登録する</span>
    </div>
    <div v-if="contact == 'email'">
      <VTextField label="メールアドレス" v-model="session.email" />
      <span @click="contact='phoneNumber'">代わりに電話番号を登録する</span>
    </div>
    <VTextField
      label="パスワード"
      v-model="session.password"
      type="password">
    </VTextField>
    <VBtn @click="login">
      次へ
    </VBtn>
  </VForm>
</template>