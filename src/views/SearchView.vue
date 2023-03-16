<script>
import TweetList from '../components/TweetList.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
  name: "Search",
  data() {
    return {
      searchedTweets: null,
    }
  },
  components: {
    TweetList,
    SearchForm,
  },
}
</script>

<template>
  <SearchForm @tweet-searched="(results)=>searchedTweets=results"></SearchForm>
  <TweetList :searched-tweets="searchedTweets"></TweetList>
</template>