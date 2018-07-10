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

import Validate from 'vee-validate'
Vue.use(Validate)

import Resource from 'vue-resource'
Vue.use(Resource)

import RnkmNavbar from './components/RnkmNavbar.vue'
Vue.component('rnkm-nav', RnkmNavbar)

Vue.config.productionTip = false

let config = {
  apiKey: "AIzaSyDQLSoNkP8FbxlbbkgCBafxCpR567XFCko",
  authDomain: "rnkm-cu102.firebaseapp.com",
  databaseURL: "https://rnkm-cu102.firebaseio.com",
  projectId: "rnkm-cu102",
  storageBucket: "rnkm-cu102.appspot.com",
  messagingSenderId: "947832976689"
};
firebase.initializeApp(config);

new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'

})

