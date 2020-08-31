import Vuex from 'vuex'
import Vue from 'vue'

import authorization from './modules/authorization-server'
import shipment from './modules/shipment-service'
import location from './modules/location-service'
import account from './modules/account-service'
import vehicle from './modules/vehicle-service'
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
    vehicle,
    parcel,
    place,
    user
  }
})
