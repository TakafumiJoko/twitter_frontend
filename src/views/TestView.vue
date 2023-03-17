<script>

export default {
  name: "TestView",
  methods: {
    getTrends() {
      axios({
        method: "get",
        url: "http://127.0.0.1:3000/tags",
      })
      .then((res)=>{
        console.log(res.data.tags[0].name)
      })
      .catch((err)=>{
        console.error
      })
    },
  },
}

</script>

<template>
  <button @click="getTrends">gettags</button>
</template>