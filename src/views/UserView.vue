<script>
import Profile from "../components/Profile.vue"
import ProfileForm from "../components/ProfileForm.vue"

export default {
  name: "UserView",
  components: {
    Profile,
    ProfileForm,
  },
  data() {
    return {
    }
  },
  methods: {
   
  },

}
</script>

<template>
  <Profile />
  <ProfileForm />
</template>