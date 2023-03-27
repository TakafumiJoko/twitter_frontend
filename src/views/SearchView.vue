<script>
import SearchForm from '../components/SearchForm.vue'
import CategoryTabs from "../components/CategoryTabs.vue"

export default {
  name: "SearchView",
  data() {
    return {
    }
  },
  components: {
    SearchForm,
    CategoryTabs
  },
}
</script>

<template>
  <SearchForm></SearchForm>
  <CategoryTabs></CategoryTabs>
</template>