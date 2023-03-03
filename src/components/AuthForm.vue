<script>
  export default {
    name: "AuthForm",
    data: () => {
      return {
        showPhoneNumber: true,
        showEmail: false,
      }
    },
    props: ["formData"],
    methods: {
      toggleForm(formName) {
        switch(formName){
          case "phoneNumber":
            this.showPhoneNumber = true
            this.showEmail = false
            break
          case "email":
            this.showEmail = true
            this.showPhoneNumber = false
            break
          default:
            this.showPhoneNumber = true
            this.showEmail = false
            break
        }
      }
    },
  }
</script>

<template>
  <div v-if="showPhoneNumber">
    <label for="phone_number">電話番号</label>
    <input type="text" v-model="formData.phone_number" id="phone_number">
    <span @click="toggleForm('email')">代わりにメールアドレスを登録する</span>
  </div>
  <div v-if="showEmail">
    <label for="email">メールアドレス</label>
    <input type="text" v-model="formData.email" id="email">
    <span @click="toggleForm('phoneNumber')">代わりに電話番号を登録する</span>
  </div>
</template>