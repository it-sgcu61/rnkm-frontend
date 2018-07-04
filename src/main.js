// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './css/bulma.css'
import './css/cu_style.css'
import './css/vue2-animate.css'
import './css/animate.css'
import './css/k_transition.css'
import './css/custom_fontface.css'

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

import Resource from 'vue-resource'
Vue.use(Resource)

Vue.config.productionTip = false

import Navbar from './components/Navbar.vue'
Vue.component('rnkm-nav', Navbar)

firebase.initializeApp({
  apiKey: "AIzaSyCOsTn0sJAU7BJLB9NeZUYUaSCUkbe_EZE",
  authDomain: "rnkm-7ec9a.firebaseapp.com",
  databaseURL: "https://rnkm-7ec9a.firebaseio.com",
  projectId: "rnkm-7ec9a",
  storageBucket: "rnkm-7ec9a.appspot.com",
  messagingSenderId: "62061746282"
});

new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})

