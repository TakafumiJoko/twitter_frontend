<script>
  export default {
    name: "ProfileForm",
    data() {
      return {
 
      }
    },
    methods: {
      updateUser(backend){
        axios({
          method: "patch",
          url: `http://127.0.0.1:3000${backend}`,
          data: this.$user,
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
  }
</script>

<template>
  <label for="nickname">名前</label>
  <input type="text" v-model="$user.nickname" id="nickname">
  <label for="introduction">自己紹介</label>
  <textarea v-model="$user.introduction" id="introduction" cols="20" rows="8"></textarea>
  <label for="residence">場所</label>
  <input type="text" v-model="$user.residence" id="residence">
  <label for="website">ウェブサイト</label>
  <input type="text" v-model="$user.website" id="website">
  <label for="birthday">生年月日</label>
  <input type="text" v-model="$user.birthday" id="birthday">
  <button @click="updateUser(`/users/${$user.id}`)">保存</button>
</template>