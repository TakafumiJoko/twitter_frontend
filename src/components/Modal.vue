<script>
export default {
 
}
</script>

<template>
  <Teleport to="body">
    <div id="overlay"></div>
    <div class="modal">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
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
  margin: 0 auto;
  width: 600px;
  height: 90%;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 5%;
}

@media screen and (max-width: 699px) {
  .modal {
    width: 450px;
  }
}

@media screen and (max-width: 549px) {
    .modal {
      width: 300px;
    }
}

</style>