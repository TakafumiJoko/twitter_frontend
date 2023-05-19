<script>
import Modal from '../components/Modal.vue';

export default {
  name: "BeforeLoginView",
  data(){
    return {
    }
  },
  components: {
    Modal,
  },
}
</script>

<template>
  <router-link :to="{ name: 'signup' }">サインアップする</router-link>
  <router-link :to="{ name: 'login' }">ログインする</router-link>
  <Modal v-if="/\/(signup|login)/.test($route.path)">
    <template v-slot>
      <router-link :to="{ name: 'beforeLogin' }">✖️</router-link><br>
      <router-view></router-view>
    </template>
  </Modal>
</template>


