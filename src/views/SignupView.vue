<script>
  import { isLoggedIn, setCookie } from "../modules/cookie.js"
  import { nicknameRules } from "../modules/validation"
  import { signup } from "../api"

  export default {
    name: "SignupView",
    components: {
    },
    data() {
      return {
        user: {
          nickname: '',
          birthday: '',
          phoneNumber: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        },
        contact: 'phoneNumber',
        test: this.test,
      }
    },
    computed: {
      signupDisabled(){
        return !(this.user.password?.trim() && this.user.password === this.user.passwordConfirmation)
      },
      server(){
        return this.$store.getters.server
      },
      api(){
        return this.$store.getters.api
      },
      nicknameRules(){
        return nicknameRules
      },
      isLoggedIn(){
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      async signup(){
        const res = await signup({ user: this.user })
        this.$store.commit('setCurrentUser', { user: res.data.user })
        this.$store.commit('setUser', { user: res.data.user })
        this.$store.commit('setIsLoggedIn', { isLoggedIn: isLoggedIn })
        var expires = (new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)).toUTCString()
        setCookie('username', res.data.user.name, { expires: expires })
        this.$router.push({ name: 'home' })
      },
    },
  }
</script>

<template>
  <VForm @submit.prevent="signup">
    <VTextField 
      label="名前" 
      v-model="user.nickname"
      :rules="nicknameRules"
      >
    </VTextField>
    <div v-if="contact == 'phoneNumber'">
      <VTextField label="電話番号" v-model="user.phoneNumber"/>
      <span @click="contact='email'">代わりにメールアドレスを登録する</span>
    </div>
    <div v-if="contact == 'email'">
      <VTextField label="メールアドレス" v-model="user.email" />
      <span @click="contact='phoneNumber'">代わりに電話番号を登録する</span>
    </div>
    <VTextField
      label="生年月日"
      v-model="user.birthday"
      type="date">
    </VTextField>
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
    <VBtn @click="signup" :disabled="signupDisabled">
      サインアップ
    </VBtn>
  </VForm>
</template>
