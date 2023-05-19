<script>
import { updateProfile } from '../api';

  export default {
    name: "ProfileForm",
    data() {
      return {
        user: {
          nickname: '',
          avatar: undefined,
        },
        avatarURL: '',
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    methods: {
      updateProfile(){
        updateProfile({ user: this.user })
      },
      selectUserImage(e){
        this.user.avatar = e.target.files[0]
        this.avatarURL = URL.createObjectURL(this.user.avatar)
      }
    },
  }
</script>

<template>
  <!-- <VForm @submit.prevent="updateUser">
    <VTextField 
      label="名前" 
      v-model="currentUser.nickname">
    </VTextField>
    <VTextField
      label="自己紹介"
      v-model="currentUser.password">
    </VTextField>
    <VTextField
      label="場所"
      v-model="currentUser.website">
    </VTextField>
    <VTextField
      label="ウェブサイト"
      v-model="currentUser.website">
    </VTextField>
    <VTextField
      label="生年月日"
      v-model="currentUser.birthday">
    </VTextField>
    <VBtn @click="updateUser">
      保存
    </VBtn>
  </VForm> -->
  <input type="text" v-model="user.nickname">
  <img :src="avatarURL">
  <input type="file" @change="selectUserImage">
  <button @click="updateProfile">保存</button>
</template>