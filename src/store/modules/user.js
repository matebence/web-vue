import * as types from '@/store/types'

const state = {
  payload: {
    user: {
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
  [types.MUTATION_USER_DATA]: function (state, data) {
    state.payload.user = {
      ...state.payload.user,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_USER_DATA]: function (state, data) {
    state.payload.user = {
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

  [types.MUTATIONS_CLEAR_NAVIGATION_ERRORS]: function (state, data) {
    state.payload.user = {
      ...state.payload.user,
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
  [types.ACTION_USER_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_USER_DATA, {done: false})
    const resource = this._vm.$resource('{service}/api/users/search', {}, {
      search: {method: 'POST', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    resource.search({service: 'user-service'}, {
      pagination: {
        pageNumber: 0,
        pageSize: 4
      },
      search: {
        ...payload
      }
    }).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_USER_DATA, {
        data: {
          ...state.payload.user.data,
          search: {
            ...parsed._embedded.usersList
          }
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_USER_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message,
            from: 'search',
            reason: {
            }
          },
          done: true
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_USER_DEFAULT]: function (state) {
    return state.payload.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
