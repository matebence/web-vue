import Vue from 'vue'
import App from './App'
import router from './router'

import './resource'
import './vuelidate'
import 'bootstrap'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
