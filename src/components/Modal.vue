<script>
export default {
 
}
</script>

<template>
  <Teleport to="body">
    <div id="overlay"></div>
    <div class="modal">
      <router-link :to="{ name: 'beforeLogin' }">✖️</router-link><br>
      <slot id="main"></slot>
    </div>
  </Teleport>
</template>

<style scoped>
#overlay{
  position: fixed;
  top: 0; 
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: rgba(150, 150, 150, .5)
}

.modal {
  position: fixed;
  z-index: 3;
  inset: 0;
  margin: auto;
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 5%;
  padding: 50px;
}
</style>