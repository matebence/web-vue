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
  [types.MUTATION_SIGN_OUT_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_SIGN_OUT]: function ({commit, dispatch, state}, payload) {
    const resource = this._vm.$resource('{service}/signout', {}, {
      performSignOut: {method: 'DELETE', headers: {'Authorization': `Bearer ${payload.accessToken}`}}})
    resource.performSignOut({service: 'authorization-server'}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_SIGN_OUT_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        },
        done: true
      })
      router.push({path: '/sign-in'})
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_SIGN_OUT_DATA, {
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
  [types.GETTER_SIGN_OUT_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
