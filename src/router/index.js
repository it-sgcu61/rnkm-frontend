import Vue from 'vue'
import House from '@/view/House.vue'
import About from '@/view/About.vue'
import Baan from '@/view/Baan.vue'
import Register from '@/view/Register.vue'
import Announce from '@/view/Announce.vue'
import Transfer from '@/view/Transfer.vue'

import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'about'
      // name: 'Home',
      // component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/announce',
      name: 'Announce',
      component: Announce
    },
    {
      path: '/baan',
      name: 'baan',
      component: Baan
    },
    {
      path: '/baan/:name',
      name: 'House',
      component: House
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name == 'baan') return savedPosition
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
