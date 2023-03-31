<script>
  export default {
    name: "ProfileForm",
    data() {
      return {
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    methods: {
      updateUser(){
        this.$store.dispatch('updateUser')
      },
    },
  }
</script>

<template>
  <VForm @submit.prevent="updateUser">
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
  </VForm>
</template>