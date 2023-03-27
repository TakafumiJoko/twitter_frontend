import { nextTick } from 'vue'
import VueCookies from 'vue-cookies/vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import SearchView from '../views/SearchView.vue'
import SearchResultView from '../views/SearchResultView.vue'
import SettingView from '../views/SettingView.vue'
import SettingAccountView from '../views/SettingAccountView.vue'
import SettingAccountDeactiveView from '../views/SettingAccountDeactiveView.vue'
import { cookieUserId } from '../modules/session'
import BeforeLoginView from '../views/BeforeLoginView.vue'
import SignupModalView from '../views/SignupView.vue'
import LoginModalView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beforeLogin',
      component: BeforeLoginView,
      children: [
        {
          path: 'signup',
          name: 'signup',
          component: SignupModalView,
        },
        {
          path: 'login',
          name: 'login',
          component: LoginModalView,
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { requiresAuth: true },
    },
    {
      path: '/search_result/:key',
      name: 'searchResult',
      component: SearchResultView,
      meta: { requiresAuth: true },
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/setting/account',
      name: 'settingAccount',
      component: SettingAccountView,
      meta: { requiresAuth: true },
    },
    {
      path: '/setting/account/deactive',
      name: 'settingAccountDeactive',
      component: SettingAccountDeactiveView,
      meta: { requiresAuth: true },
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.requiresAuth && cookieUserId() == null){
//     next({ name: "beforeLogin" })
//   } else {
//     next()
//   }
// })

export default router

