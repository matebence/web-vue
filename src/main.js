import router from './router'
import store from './store'
import App from './App'
import Vue from 'vue'

import 'bootstrap'

import './vueawesome'
import './vuelidate'
import './firebase'
import './position'
import './resource'
import './mask'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
