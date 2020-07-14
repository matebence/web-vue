import * as types from '@/store/types'
import router from '@/router'

const state = {
  payload: {
    parcel: {
      data: {
      },
      error: {
        is: false,
        message: null
      },
      done: true
    },
    category: {
      data: {
      },
      error: {
        is: false,
        message: null
      },
      done: true
    }
  }
}

const mutations = {
  [types.MUTATION_PARCEL_DATA]: function (state, data) {
    state.payload.parcel = {
      ...state.payload.parcel,
      ...data
    }
  },

  [types.MUTATION_CATEGORY_DATA]: function (state, data) {
    state.payload.category = {
      ...state.payload.category,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_PARCEL]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/signout', {}, {
      performSignOut: {method: 'DELETE', headers: {'Authorization': `Bearer ${payload.accessToken}`}}})
    resource.performSignOut({service: 'authorization-server'}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_PARCEL_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        },
        done: true
      })
      router.push({path: '/sign-in'})
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_PARCEL_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_CATEGORY]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/api/categories/page/{page}/limit/{limit}', {}, {
      getAll: {method: 'GET', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    resource.getAll({service: 'parcel-service', page: 1, limit: 10}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_CATEGORY_DATA, {
        data: {
          ...parsed.data
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_CATEGORY_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_PARCEL_DEFAULT]: function (state) {
    return state.payload.parcel
  },

  [types.GETTER_CATEGORY_DEFAULT]: function (state) {
    return state.payload.category
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
