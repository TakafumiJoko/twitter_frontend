<script>
  import ContactInput from "../components/ContactInput.vue"
  import { login } from "../modules/session.js"

  export default {
    name: "SignupModalView",
    components: {
      ContactInput,
    },
    data() {
      return {
        user: {},
        passwordConfirmation: '',
      }
    },
    computed: {
      createUserDisabled(){
        return !(this.user.password?.trim() && this.user.password === this.passwordConfirmation)
      },
      server(){
        return this.$store.getters.server
      },
      api(){
        return this.$store.getters.api
      },
    },
    methods: {
      createUser(){
        axios.post(this.server + this.api.users.create, this.user)
        .then((res) => {
          console.log(`POST ${this.api.users.create} ${res.data.user.nickname}`)
          this.$router.push({ name: 'home' })
          login(res.data.user)
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
  <label for="name">ニックネーム</label>
  <input type="text" v-model="user.nickname" id="name">
  <ContactInput :user="user"></ContactInput>
  <label for="birthday">生年月日</label>
  <input type="text" v-model="user.birthday" id="birthday">
  <label for="password">パスワード</label>
  <input type="password" v-model="user.password" id="password">
  <label for="password_congirmation">パスワード確認</label>
  <input type="password" v-model="passwordConfirmation" id="password_confirmation">
  <button @click="createUser" :disabled="createUserDisabled">アカウントを作成</button>
</template>
