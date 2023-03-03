<script>
import TweetForm from "../components/TweetForm.vue"
export default {
  name: "HomeView",
  components: {
    TweetForm,
  },
  data(){
    return {
    }
  },
  props: ["user_id"],
}
</script>

<template>
  {{ $route.params.user_id}}
  {{ user_id  }}
</template>