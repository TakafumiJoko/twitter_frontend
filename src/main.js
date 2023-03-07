import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main.css'

const user_id = $cookies.get("user_id")
if(user_id != null){
  getUser(`/users/${user_id}`)
} else {
  const app = createApp(App)
  app.use(router)
  app.use(VueCookies, { expires: '30d' })
  app.mount('#app')
}

function getUser(backend){
  let user = null
  axios({
    method: "get",
    url: `http://127.0.0.1:3000${backend}`,
  })
  .then((res) => {
    user = res.data.user
    console.log(`GET ${backend} ${user}`)
    const app = createApp(App)
    app.config.globalProperties.user = user
    app.use(router)
    app.use(VueCookies, { expires: '30d' })
    app.mount('#app')
  })
  .catch(error => {
    console.log(error)
    const app = createApp(App)
    app.use(router)
    app.use(VueCookies, { expires: '30d' })
    app.mount('#app')
  })
}