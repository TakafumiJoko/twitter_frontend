<script>
import TweetList from '../components/TweetList.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
  name: "SearchResultView",
  data() {
    return {
    }
  },
  components: {
    TweetList,
    SearchForm,
  },
}
</script>

<template>
  <SearchForm></SearchForm>
  <TweetList></TweetList>
</template>