<script>
import { shallowReactive } from 'vue'

export default {
  name: "CategoryTabs",
  data() {
    return {
      categoryName: 'おすすめ',
    }
  },
  computed: {
    server(){
      return this.$store.getters.server
    },
    api() {
      return this.$store.getters.api
    },
    categories() {
      return this.$store.getters.categories
    },
    category() {
      return this.$store.getters.category
    },
    hashTags() {
      return this.$store.getters.hashTags
    },
    tweets(){
      return this.$store.getters.tweets
    }
  },
  methods: {
    async getCategories(){
      const res = await axios.get(this.server + this.api.categories.main)
      console.log(`GET ${this.api.categories.main} ${res.data.categories[0].name}`)
      this.$store.commit('setcategories', { categories: res.data.categories })
      this.getHashTags()
    },
    async getHashTags(category = this.categories.find((category)=>{return category.name === this.categoryName})){
      this.setCategory(category)
      const res = await axios.get(this.server + this.api.hashTags.index)
      console.log(`GET ${this.api.hashTags.index} ${res.data.hash_tags[0].value}`)
      this.$store.commit('sethashTags', { hashTags: res.data.hash_tags })
    },
    setCategory(category){
      this.categoryName = category.name
      this.$store.commit('setCategory', { category: category })
    },
    async getHashTagTweets(hashTag){
      const responses = await Promise.all(hashTag.tweet_ids.map(async (tweetId)=>{
        this.$store.commit('setTweetId', { tweetId: tweetId })
        const res = await axios.get(this.server + this.api.tweets.hashTag)
        console.log(`GET ${ this.api.tweets.hashTag} ${res.data.tweet.message}`)
        return res
      }))
      this.$store.commit('setTweetsMode', { mode: { tweets: 'hashTag' } })
      const tweets = responses.map((res)=>{return res.data.tweet})
      this.$store.commit('setTweets', { tweets: tweets })      
    },
  },
  created(){
    this.getCategories()
  },
}
</script>

<template>
  <ul class="tabnav">
    <li v-for="category in categories" @click="getHashTags(category)" :class="{'active': categoryName === category.name}">
      {{ category.name }}
    </li>
  </ul>
  <div class="tabcontent">
    <ul>
      <li v-for="hashTag in hashTags" @click="getHashTagTweets(hashTag)">{{ hashTag }}</li>
    </ul>
  </div>
</template>

<style scoped>
.tabnav {
  margin: auto;
  display: flex;
  list-style-type: none;
}
.tabnav li {
  cursor: pointer;
  width: 20%;
  background: #ddd;
  color: #333;
  padding: 10px;
  text-decoration: none;
}
.tabnav li.active {
  border-bottom: 5px #405dca solid;
  font-weight: bold;
}
.tabcontent {
  padding: 20px;
  border: 1px dotted #ccc;
}
</style>