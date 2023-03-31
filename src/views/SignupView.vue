<script>
  import { login } from "../modules/session.js"

  export default {
    name: "SignupView",
    components: {
    },
    data() {
      return {
        nickname: '',
        birthday: '',
        password: '',
        passwordConfirmation: '',
      }
    },
    computed: {
      createUserDisabled(){
        return !(this.password?.trim() && this.password === this.passwordConfirmation)
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
        axios.post(this.server + this.api.users.create)
        .then((res) => {
          console.log(`POST ${this.api.users.create} ${res.data.nickname}`)
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
  <VForm @submit.prevent="createUser">
    <VTextField 
      label="名前" 
      v-model="nickname"
      >
    </VTextField>
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
    <VBtn @click="createUser" :disabled="createUserDisabled">
      次へ
    </VBtn>
  </VForm>
</template>
