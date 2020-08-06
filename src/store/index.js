import Vue from 'vue'
import Vuex from 'vuex'

import authorization from './modules/authorization-server'
import shipment from './modules/shipment-service'
import location from './modules/location-service'
import account from './modules/account-service'
import parcel from './modules/parcel-service'
import place from './modules/place-service'
import user from './modules/user-service'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authorization,
    shipment,
    location,
    account,
    parcel,
    place,
    user
  }
})
