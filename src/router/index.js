import { nextTick } from 'vue'
import VueCookies from 'vue-cookies/vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'
import BeforeLoginView from '../views/BeforeLoginView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beforeLogin',
      component: BeforeLoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: { requiresAuth: true },
    },
  ]
})

const user_id = $cookies.get("user_id")

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && user_id == null){
    next({ name: "beforeLogin" })
  } else {
    next()
  }
})

export default router
