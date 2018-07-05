import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/Main.vue'
import Home from '@/view/Home.vue'
import Transfer from '@/view/Transfer.vue'
import Instruction from '@/view/Instruction.vue'
import Introduction from '@/view/Introduction.vue'
import Registration from '@/view/Registration.vue'
import Announcement from '@/view/Announcement.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
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
      path: '/introduction',
      name: 'Introduction',
      component: Introduction
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
    }
  ]
})
