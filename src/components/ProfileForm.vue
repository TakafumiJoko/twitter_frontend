<script>
  export default {
    name: "ProfileForm",
    data() {
      return {
        nickname: null,
        introduction: null,
        residence: null,
        website: null,
        birthday: null,
      }
    },
    props: ["user"],
    methods: {
      updateUser(backend){
        axios({
          method: "patch",
          url: `http://127.0.0.1:3000${backend}`,
          data: this.user,
        })
        .then((res) => {
          const user = res.data.user
          console.log(`PATCH ${backend} ${user}`)
        })
        .catch(error => {
          console.log(error)
        })
      },
    },
    watch: {
      user(newUser, oldUser){
        this.nickname = newUser.nickname
        this.introduction = newUser.introduction
        this.residence = newUser.residence
        this.website = newUser.website
        this.birthday = newUser.birthday
      }
    }
  }
</script>

<template>
  <label for="nickname">名前</label>
  <input v-model="nickname" type="text" id="nickname">
  <label for="introduction">自己紹介</label>
  <textarea v-model="introduction" id="introduction" cols="20" rows="8"></textarea>
  <label for="residence">場所</label>
  <input v-model="residence" type="text" id="residence">
  <label for="website">ウェブサイト</label>
  <input v-model="website" type="text" id="website">
  <label for="birthday">生年月日</label>
  <input v-model="birthday" type="text" id="birthday">
  <button @click="updateUser(`/users/${user?.id}`)">保存</button> 
</template>