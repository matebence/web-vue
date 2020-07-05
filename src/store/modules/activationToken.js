import * as types from '@/store/types'

const state = {
  payload: {
    data: {},
    error: {
      is: false,
      message: null
    },
    done: true
  }
}

const mutations = {
  [types.MUTATION_ACCOUNT_ACTIVATION_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_ACCOUNT_ACTIVATION]: function ({commit, dispatch, state}, payload) {
    const resource = this._vm.$resource('{service}/signup/{account}/{id}/{token}/{key}', {}, {
      verifyActivationToken: { method: 'GET' }})
    resource.verifyActivationToken({service: 'authorization-server', account: 'account', id: payload.id, token: 'token', key: payload.key}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        }
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          }
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_ACCOUNT_ACTIVATION_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}