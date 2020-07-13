import * as types from '@/store/types'
import router from '@/router'

const state = {
  payload: {
    data: {
    },
    error: {
      error: false,
      message: null
    },
    done: true
  }
}

const mutations = {
  [types.MUTATION_PARCEL_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
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
  }
}

const getters = {
  [types.GETTER_PARCEL_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
