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
      redirect: '/about'
    },
    {
      path: '/about',
      name: 'About',
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
      name: 'Baan',
      component: Baan
    },
    {
      path: '/baan/:name',
      name: 'House',
      component: House
      // component: {
      //   template: '<router-view/>',
      // }
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
})
