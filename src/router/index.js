import { nextTick } from 'vue'
import VueCookies from 'vue-cookies/vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'
import BeforeLoginView from '../views/BeforeLoginView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'

const userId = $cookies.get("user_id")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beforeLogin',
      component: BeforeLoginView,
    },
    {
      path: '/home/:user_id',
      name: 'home',
      component: HomeView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/:user_id',
      name: 'user',
      component: UserView,
      props: true,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && userId == null){
    next({ name: "beforeLogin" })
  } else {
    next()
  }
})

export default router
