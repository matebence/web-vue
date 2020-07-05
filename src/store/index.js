import Vue from 'vue'
import Vuex from 'vuex'

import activationToken from './modules/activationToken'
import forgetPassword from './modules/forgetPassword'
import recoverToken from './modules/recoverToken'
import signOut from './modules/signOut'
import signUp from './modules/signUp'
import signIn from './modules/signIn'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activationToken,
    forgetPassword,
    recoverToken,
    signIn,
    signUp,
    signOut
  }
})
