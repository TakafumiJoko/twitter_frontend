import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main.css'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(VueCookies, { expires: '30d' })
app.use(store)
app.mount('#app')