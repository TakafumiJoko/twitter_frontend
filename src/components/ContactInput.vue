<script>
  export default {
    name: 'ContactInput',
    data(){
      return {
        contact: 'phoneNumber',
      }
    },
    props: ['user'],
    methods: {
      setContact(contact){
        this.contact = contact
      },
    },
  }
</script>

<template>
  <div v-if="contact == 'phoneNumber'">
    <label for="phone_number">電話番号</label>
    <input type="text" id="phone_number" v-model="user.phoneNumber">
    <span @click="setContact('email')">代わりにメールアドレスを登録する</span>
  </div>
  <div v-if="contact == 'email'">
    <label for="email">メールアドレス</label>
    <input type="text" id="email" v-model="user.email">
    <span @click="setContact('phoneNumber')">代わりに電話番号を登録する</span>
  </div>
</template>