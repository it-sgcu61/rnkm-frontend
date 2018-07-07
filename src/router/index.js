import Vue from 'vue'
import Home from '@/view/Home.vue'
import House from '@/view/House.vue'
import Transfer from '@/view/Transfer.vue'
import Instruction from '@/view/Instruction.vue'
import Introduction from '@/view/Introduction.vue'
import Registration from '@/view/Registration.vue'
import Announcement from '@/view/Announcement.vue'

import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer,
      props: true
    },
    {
      path: '/instruction',
      name: 'Instruction',
      component: Instruction
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: Introduction,
    },
    {
      path: '/house',
      name: 'House',
      component: Introduction,
    },
    {
      path: '/house/:name',
      name: 'House',
      component: House
    },
    {
      path: '/house/:name',
      name: 'House',
      component: House,
    },

  ]
})
