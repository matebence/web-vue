import * as types from '@/store/types'

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

  [types.MUTATIONS_CLEAR_PARCEL_DATA]: function (state, data) {
    state.payload.parcel = {
      data: {
      },
      error: {
        is: false,
        message: null
      },
      done: true
    }
  },

  [types.MUTATION_CATEGORY_DATA]: function (state, data) {
    state.payload.category = {
      ...state.payload.category,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_CATEGORY_DATA]: function (state, data) {
    state.payload.category = {
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

const actions = {
  [types.ACTION_PARCEL_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PARCEL_DATA, {done: false})
    const resource = this._vm.$resource('{service}/api/parcels', {}, {
      create: {method: 'POST', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    resource.create({service: 'parcel-service'}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_PARCEL_DATA, {
        data: {
          ...parsed.data
        },
        done: true
      })
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

  [types.ACTION_CATEGORY_GET_ALL]: function ({commit, dispatch, state, rootState}, payload) {
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
