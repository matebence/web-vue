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
  [types.MUTATION_PLACES_DATA]: function (state, data) {
    state.payload.place = {
      ...state.payload.place,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PLACES_DATA]: function (state, data) {
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

  [types.MUTATIONS_CLEAR_PLACES_ERRORS]: function (state, data) {
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
  [types.ACTION_PLACES_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PLACES_DATA, {done: false})
    const resource = this._vm.$resource('{service}/api/villages/search', {}, {
      search: {method: 'POST', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    return resource.search({service: 'place-service'}, {
      pagination: {
        pageNumber: 0,
        pageSize: 10
      },
      search: {
        ...payload
      }
    }).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_PLACES_DATA, {
        data: {
          ...state.payload.place.data,
          search: {
            ...parsed.data
          }
        },
        done: true
      })
      return state.payload.place.data.search
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_PLACES_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message,
            from: 'search',
            reason: {}
          },
          done: true
        })
        return new Error(parsed.message)
      })
    })
  }
}

const getters = {
  [types.GETTER_PLACES_DATA]: function (state) {
    return state.payload.place.data
  },

  [types.GETTER_PLACES_DATA_SEARCH]: function (state) {
    return state.payload.place.data.search
  },

  [types.GETTER_PLACES_DONE]: function (state) {
    return state.payload.place.done
  },

  [types.GETTER_PLACES_ERROR]: function (state) {
    return state.payload.place.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
