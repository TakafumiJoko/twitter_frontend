<script>
import tweetList from '../components/tweetList.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
  name: "SearchResultView",
  data() {
    return {
    }
  },
  components: {
    tweetList,
    SearchForm,
  },
}
</script>

<template>
  <SearchForm></SearchForm>
  <tweetList></tweetList>
</template>