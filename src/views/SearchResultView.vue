<script>
import Tweets from '../components/Tweets.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
  name: "SearchResultView",
  data() {
    return {
    }
  },
  components: {
    Tweets,
    SearchForm,
  },
}
</script>

<template>
  <SearchForm></SearchForm>
  <Tweets></Tweets>
</template>