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
      name: 'register',
      component: Register
    },
    {
      path: '/announce',
      name: 'announce',
      component: Announce
    },
    {
      path: '/baan',
      name: 'baan',
      component: Baan
    },
    {
      path: '/baan/:name',
      name: 'house',
      component: House
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    console.log(from, to, savedPosition)
    if (to.name == 'house') return {x: 0, y:0}
    if (to.name == 'baan') return savedPosition || { x: 0, y: 0 }
    return {x: 0, y: 0}
  }
})
