import Vue from 'vue'
import Vuex from 'vuex'

import authorization from './modules/authorization'
import preferences from './modules/preferences'
import shipment from './modules/shipment'
import parcel from './modules/parcel'
import place from './modules/place'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authorization,
    preferences,
    shipment,
    parcel,
    place,
    user
  }
})
