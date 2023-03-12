<script>
import { logout } from "../modules/session.js"
export default {
  name: "SettingAccountDeactiveView",
  data(){
    return {
      step: "introduction",
      password: null,
      canDestroyUser: true,
    }
  },
  mounted() {
  },
  methods: {
    goToConfirmation() {
      this.step = "confirmation"
    },
    destroyUser(backend, frontend){
      axios({
        method: "delete",
        url: `http://127.0.0.1:3000${backend}`,
      })
      .then(() => {
        logout(this.$user.id)
        location.href = frontend
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  watch: {
    password(newPassword) {
      if(newPassword.length > 0 && newPassword == this.$user.password){
        this.canDestroyUser = false
      }
    }
  }
}
</script>

<template>
  <p v-if="step == 'introduction'" @click="goToConfirmation">アカウント削除</p>
  <div v-if="step == 'confirmation'">
    <label for="password">パスワード</label>
    <input type="password" v-model="password" id="password">
    <button @click="destroyUser(`/users/${$user.id}`, '/')" :disabled="canDestroyUser">アカウント削除</button>
  </div>
</template>

<style scoped>

</style>
