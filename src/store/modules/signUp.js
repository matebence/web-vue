import * as types from '@/store/types'

const state = {
  payload: {
    data: {},
    error: {
      error: false,
      message: null,
      reason: {
        userName: null,
        email: null,
        password: null
      }
    },
    done: true
  }
}

const mutations = {
  [types.MUTATION_SIGN_UP_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_SIGN_UP]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_SIGN_UP_DATA, {done: false})
    const resource = this._vm.$resource('{service}/signup', {}, {performSignUp: {method: 'POST'}})
    resource.performSignUp({service: 'authorization-server'}, {userName: payload.userName, email: payload.email, password: payload.password, confirmPassword: payload.confirmPassword, accountRoles: [{roles: payload.roles}]
    }).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_SIGN_UP_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message,
          reason: {
            userName: null,
            email: null,
            password: null
          }
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_SIGN_UP_DATA, {
          error: {
            is: parsed.error,
            reason: parsed.reason,
            message: parsed.message
          },
          done: true
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_SIGN_UP_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
