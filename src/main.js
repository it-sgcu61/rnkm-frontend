// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

import './css/bulma.css'
import './css/vue2-animate.css'
import './css/animate.css'
import './css/k_transition.css'
import './css/custom_fontface.css'
import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome'

// import FontAwesome from '@fortawesome/fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { faSquare } from '@fortawesome/free-regular-svg-icons'
// import { faCoffee, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'

// FontAwesome.library.add(
//   faCoffee,
//   faMinus,
//   faTimes
// )
// library.add(
//   faCoffee,
//   faMinus,
//   faTimes
// )

// import { faCoffee, faChild, faCircle, faArchive } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

// library.add(
//   faCoffee,
//   faChild,
//   faCircle,
//   faArchive,
//   faComment,
//   faTwitter
// )

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

// library.add(faCoffee)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('fa', FontAwesomeIcon)

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

import Validate from 'vee-validate'
Vue.use(Validate)

import Resource from 'vue-resource'
Vue.use(Resource)

import RnkmNavbar from './components/RnkmNavbar.vue'
Vue.component('rnkm-nav', RnkmNavbar)
import RnkmSponsor from './components/Sponsor.vue'
Vue.component('rnkm-sponsor', RnkmSponsor)

Vue.config.productionTip = false

let config = {
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

