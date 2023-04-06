<script>
  import { login } from "../modules/session.js"
  import { nicknameRules, isUnique } from "../modules/validation"

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
      }
    },
    computed: {
      createUserDisabled(){
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
    },
    methods: {
      createUser(){
        axios.post(
          this.server + this.api.users.create, this.user
        )
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
    mounted(){
      isUnique()
    }
  }
</script>

<template>
  <VForm @submit.prevent="createUser">
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
      label="パスワード"
      v-model="user.password"
      type="password">
    </VTextField>
    <VTextField
      label="パスワード確認"
      v-model="user.passwordConfirmation"
      type="password">
    </VTextField>
    <VBtn @click="createUser" :disabled="createUserDisabled">
      次へ
    </VBtn>
  </VForm>
</template>
