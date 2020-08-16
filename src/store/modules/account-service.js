import * as types from '@/store/types'

const state = {
  payload: {
    preference: {
      data: {
        create: {
        },
        update: {
        },
        remove: {
        },
        get: {
        },
        getAll: {
        },
        search: {
        }
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {
        }
      },
      done: true
    }
  }
}

const mutations = {
  [types.MUTATION_PREFERENCE_DATA]: function (state, data) {
    state.payload.preference = {
      ...state.payload.preference,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PREFERENCE_DATA]: function (state, data) {
    state.payload.preference = {
      data: {
        create: {
        },
        update: {
        },
        remove: {
        },
        get: {
        },
        getAll: {
        },
        search: {
        }
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {
        }
      },
      done: true
    }
  },

  [types.MUTATIONS_CLEAR_PREFERENCE_ERRORS]: function (state, data) {
    state.payload.preference = {
      ...state.payload.preference,
      error: {
        is: false,
        message: null,
        from: '',
        reason: {
        }
      },
      done: true
    }
  }
}

const actions = {
  [types.ACTION_PREFERENCE_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PREFERENCE_DATA, {done: false})
    return this._vm.$resource('{service}/api/preferences/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'account-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PREFERENCE_DATA, {
          data: {
            ...state.payload.preference.data,
            search: {
              ...parsed._embedded.preferencesSearchList
            }
          },
          done: true
        })
        return state.payload.preference.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PREFERENCE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  }
}

const getters = {
  [types.GETTER_PREFERENCE_DATA]: function (state) {
    return state.payload.preference.data
  },

  [types.GETTER_PREFERENCE_DATA_SEARCH]: function (state) {
    return state.payload.preference.data.search
  },

  [types.GETTER_PREFERENCE_DONE]: function (state) {
    return state.payload.preference.done
  },

  [types.GETTER_PREFERENCE_ERROR]: function (state) {
    return state.payload.preference.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
