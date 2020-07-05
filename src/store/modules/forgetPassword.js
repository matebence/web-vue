import * as types from '@/store/types'

const state = {
  payload: {
    data: {
    },
    error: {
      is: false,
      message: null
    },
    done: true
  }
}

const mutations = {
  [types.MUTATION_FORGET_PASSWORD_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_FORGET_PASSWORD]: function ({commit, dispatch, state}, payload) {
    commit(types.MUTATION_FORGET_PASSWORD_DATA, { done: false })
    const resource = this._vm.$resource('{service}/forgetpassword', {}, {
      recoverPassword: {method: 'POST'}})
    resource.recoverPassword({service: 'authorization-server'}, {email: payload.email}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_FORGET_PASSWORD_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_FORGET_PASSWORD_DATA, {
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
  [types.GETTER_FORGET_PASSWORD_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
