import Vue from 'vue'
import Vuex from 'vuex'

import parcel from './modules/parcel'
import user from './modules/user'
import authorization from './modules/authorization'
import navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authorization,
    navigation,
    parcel,
    user
  }
})
