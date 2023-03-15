<script>
import Profile from "../components/Profile.vue"
import ProfileForm from "../components/ProfileForm.vue"
import SearchForm from "../components/SearchForm.vue"
import TweetList from "../components/TweetList.vue"

export default {
  name: "UserView",
  components: {
    Profile,
    ProfileForm,
    SearchForm,
    TweetList,
  },
  data() {
    return {
      user: null,
      user_id: null,
      newTweet: null,
    }
  },
  methods: {
    getUser(backend){
      axios({
        method: "get",
        url: `http://127.0.0.1:3000${backend}`,
      })
      .then((res) => {
        this.user = res.data.user
        console.log(`GET ${backend} ${this.user.nickname}`)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  created() {
    this.user_id = $cookies.get("user_id")
    if(this.user_id != null){
      this.getUser(`/users/${this.user_id}`)
    } 
  },
}
</script>

<template>
  <Profile :user="user" />
  <TweetList :new-tweet="newTweet" :user="user" />  
  <ProfileForm v-if="user?.id==user_id" :user="user" />
  <SearchForm></SearchForm>
</template>