<script>
import { logout } from "../modules/session.js"
export default {
  name: "SettingAccountDeactiveView",
  data(){
    return {
    }
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    pageMode(){
      return this.$store.getters.pageMode
    },
    passwordConfirmation(){
      return this.$store.getters.passwordConfirmation
    },
    destroyUserDisabled(){
      return this.$store.getters.destroyUserDisabled
    },
  },
  mounted() {
  },
  methods: {
    setPageMode(page){
      this.$store.commit('setPageMode', { mode: { page: page } })
    },
    destroyUser(){
      this.$store.dispatch('destroyUser')
      logout()
    },
    judgePassword(password){
      this.$store.dispatch('judgePassword', { value: password })
    },
  },
}
</script>

<template>
  <p v-if="pageMode == 'introduction'" @click="setPageMode('confirmation')">アカウント削除</p>
  <div v-if="pageMode == 'confirmation'">
    <VForm>
      <VTextField 
        label="パスワード確認" 
        :value="passwordConfirmation" @input="judgePassword($event.target.value)"
      ></VTextField>
      <VBtn
        @click="destroyUser" 
        :disabled="destroyUserDisabled"
      >アカウント削除</VBtn>
      <VBtn @click="setPageMode('introduction')">戻る</VBtn>
    </VForm> 
  </div>
</template>

<style scoped>

</style>
