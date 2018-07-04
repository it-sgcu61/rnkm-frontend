import Vue from 'vue'
import Router from 'vue-router'
import Main from '../view/Main.vue'
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
      component: (r) => require(['../view/Home.vue'], r)
    },
    {
      path: '/register',
      name: 'Register',
      component: (r) => require(['../view/Form.vue'], r)
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: r => require(['../view/Transfer.vue'], r),
      props: true
    },
    {
      path: '/instruction',
      name: 'Instruction',
      component: r => require(['../view/Instruction.vue'], r)
    },
    {
      path: '/introduction',
      name: 'Introduction',
      component: (r) => require(['../view/Introduction.vue'], r)
    },
    {
      path: '/registration',
      name: 'Registration',
      component: r => require(['../view/Registration.vue'], r)
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: r => require(['../view/Announcement.vue'], r)
    }
  ]
})
