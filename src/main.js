import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'bootstrap'

import './mask'
import './resource'
import './vuelidate'
import './vueawesome'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
