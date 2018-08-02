// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

import 'bulma'
import './css/animate.css'
import './css/vue2-animate.css'
import './css/rnkm-style.css'

import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome'

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

import Validate from 'vee-validate'
Vue.use(Validate)

import Resource from 'vue-resource'
Vue.use(Resource)

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

import RnkmNavbar from './components/RnkmNavbar.vue'
Vue.component('rnkm-nav', RnkmNavbar)
import RnkmSponsor from './components/Sponsor.vue'
Vue.component('rnkm-sponsor', RnkmSponsor)

Vue.config.productionTip = false
Vue.config.devtools = true

var config = {
  apiKey: "AIzaSyDQLSoNkP8FbxlbbkgCBafxCpR567XFCko",
  authDomain: "rnkm-cu102.firebaseapp.com",
  databaseURL: "https://rnkm-cu102.firebaseio.com",
  projectId: "rnkm-cu102",
  storageBucket: "rnkm-cu102.appspot.com",
  messagingSenderId: "947832976689"
};
var firebaseDB = firebase.initializeApp(config);
export {firebaseDB}

new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'

})

