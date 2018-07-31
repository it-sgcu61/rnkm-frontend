import Vue from 'vue'
import House from '@/view/House.vue'
import About from '@/view/About.vue'
import Baan from '@/view/Baan.vue'
import Dorm from '@/view/Dorm.vue'
import Register from '@/view/Register.vue'
import Announce from '@/view/Announce.vue'
import Transfer from '@/view/Transfer.vue'
import EditInfo from '@/components/EditInfo.vue'

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
      // redirect: '/about'
      name: 'Register',
      component: Register
    },
    {
      path: '/announce',
      // redirect: '/about'
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
    },
    {
      path: '/edit',
      name: 'Edit',
      component: EditInfo,
    },
    {
      path: '/dorm',
      name: 'Dorm',
      component: Dorm
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
