import * as types from '@/store/types'

const state = {
  payload: {
    place: {
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
  [types.MUTATION_PLACE_DATA]: function (state, data) {
    state.payload.place = {
      ...state.payload.place,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PLACE_DATA]: function (state, data) {
    state.payload.place = {
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

  [types.MUTATIONS_CLEAR_PLACE_ERRORS]: function (state, data) {
    state.payload.place = {
      ...state.payload.place,
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
  [types.ACTION_PLACE_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PLACE_DATA, {done: false})
    return this._vm.$resource('{service}/api/villages/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).search({service: 'place-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PLACE_DATA, {
          data: {
            ...state.payload.place.data,
            search: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.place.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PLACE_DATA, {
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
  [types.GETTER_PLACE_DATA]: function (state) {
    return state.payload.place.data
  },

  [types.GETTER_PLACE_DATA_SEARCH]: function (state) {
    return state.payload.place.data.search
  },

  [types.GETTER_PLACE_DONE]: function (state) {
    return state.payload.place.done
  },

  [types.GETTER_PLACE_ERROR]: function (state) {
    return state.payload.place.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
