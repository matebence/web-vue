import * as types from '@/store/types'

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
  [types.MUTATION_CATEGORY_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  }
}

const actions = {
  [types.ACTION_CATEGORY]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/api/categories/page/{page}/limit/{limit}', {}, {
      getAll: {method: 'GET', headers: {'Authorization': `Bearer ${rootState.signIn.payload.data.accessToken}`}}})
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
  [types.GETTER_CATEGORY_DEFAULT]: function (state) {
    return state.payload
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
