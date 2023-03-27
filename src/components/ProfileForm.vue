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
  <label for="nickname">ニックネーム</label>
  <input :value="currentUser.nickname" @change="$store.commit('updateNickname', { value: $event.target.value })" type="text" id="nickname">
  <label for="introduction">自己紹介</label>
  <textarea :value="currentUser.introduction" @change="$store.commit('updateIntroduction', { value: $event.target.value })" id="introduction" cols="20" rows="8"></textarea>
  <label for="residence">場所</label>
  <input :value="currentUser.residence" @change="$store.commit('updateResidence', { value: $event.target.value })" type="text" id="residence">
  <label for="website">ウェブサイト</label>
  <input :value="currentUser.website" @change="$store.commit('updateWebsite', { value: $event.target.value })" type="text" id="website">
  <label for="birthday">生年月日</label>
  <input :value="currentUser.birthday" @change="$store.commit('updateBirthday', { value: $event.target.value })" type="text" id="birthday">
  <button @click="updateUser">保存</button>
</template>