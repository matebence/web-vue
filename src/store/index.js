import Vue from 'vue'
import Vuex from 'vuex'

import activationToken from './modules/activationToken'
import forgetPassword from './modules/forgetPassword'
import recoverToken from './modules/recoverToken'
import category from './modules/category'
import signOut from './modules/signOut'
import signUp from './modules/signUp'
import signIn from './modules/signIn'
import parcel from './modules/parcel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activationToken,
    forgetPassword,
    recoverToken,
    category,
    signOut,
    signIn,
    signUp,
    parcel
  }
})
