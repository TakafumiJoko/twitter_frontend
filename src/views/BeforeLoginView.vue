<script>

export default {
  name: "BeforeLoginView",
  data: function() {
    return {
      formData: {
        nickname: "",
        phone_number: "",
        email: "",
        birthday: "",
      },
      showPhoneNumber: true,
      showEmail: false,
    }
  },
  methods: {
    submit(formData, backend, frontend){
      for(let property in formData) {
        if(formData[property] == ""){
          delete formData[property]
        }
      }
      const bodyParams = new URLSearchParams(formData)
      axios({
        method: "post",
        url: `http://127.0.0.1:3000${backend}`,
        data: bodyParams,
      })
      .then((res) => {
        console.log(`POST ${backend} ${JSON.stringify(res.data.user)}`)
        location.href = frontend
      })
      .catch(error => {
        console.log(error)
      })
    },
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
  <h1>ログイン前</h1>
  <label for="name">ニックネーム</label>
  <input type="text" v-model="formData.nickname" id="name">
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
  <label for="birthday">生年月日</label>
  <input type="text" v-model="formData.birthday" id="birthday">
  <button @click="submit(formData, '/user', '/home')">アカウントを作成</button>
</template>
