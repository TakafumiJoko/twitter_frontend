<script>
import TweetForm from "../components/TweetForm.vue"
import TweetList from "../components/TweetList.vue"
import SearchForm from "../components/SearchForm.vue"

export default {
  name: "HomeView",
  data(){
    return {
      newTweet: null, 
      user: null,
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
  components: {
    TweetForm,
    TweetList,
    SearchForm,
  },
  created(){
    const user_id = $cookies.get("user_id")
    if(user_id != null){
      this.getUser(`/users/${user_id}`)
    } 
  },
}
</script>

<template>
  <TweetForm @tweet-created="(param) => { this.newTweet = param }" />
  <TweetList :new-tweet="newTweet" :user="user" />  
  <SearchForm></SearchForm>
</template>