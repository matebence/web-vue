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
    },
    account: {
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
  },

  [types.MUTATION_ACCOUNT_DATA]: function (state, data) {
    state.payload.account = {
      ...state.payload.account,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_ACCOUNT_DATA]: function (state, data) {
    state.payload.account = {
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

  [types.MUTATIONS_CLEAR_ACCOUNT_ERRORS]: function (state, data) {
    state.payload.account = {
      ...state.payload.account,
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
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  },

  [types.ACTION_ACCOUNT_UPDATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_ACCOUNT_DATA, {done: false})
    return this._vm.$resource('{service}/api/accounts/{accountId}', {}, {
      update: {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).update({service: 'account-service', accountId: payload.accountId}, {...payload})
      .then(response => {
        commit(types.MUTATION_ACCOUNT_DATA, {
          data: {
            ...state.payload.account.data,
            update: {
              ...payload
            },
            get: {
              ...payload
            }
          },
          done: true
        })
        return state.payload.account.data.update
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_ACCOUNT_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'update',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  }
}

const getters = {
  [types.GETTER_PREFERENCE_DATA]: function (state) {
    return state.payload.preference.data
  },

  [types.GETTER_PREFERENCE_DATA_CREATE]: function (state) {
    return state.payload.preference.data.create
  },

  [types.GETTER_PREFERENCE_DATA_UPDATE]: function (state) {
    return state.payload.preference.data.update
  },

  [types.GETTER_PREFERENCE_DATA_REMOVE]: function (state) {
    return state.payload.preference.data.remove
  },

  [types.GETTER_PREFERENCE_DATA_GET]: function (state) {
    return state.payload.preference.data.get
  },

  [types.GETTER_PREFERENCE_DATA_GET_ALL]: function (state) {
    return state.payload.preference.data.getAll
  },

  [types.GETTER_PREFERENCE_DATA_SEARCH]: function (state) {
    return state.payload.preference.data.search
  },

  [types.GETTER_PREFERENCE_DONE]: function (state) {
    return state.payload.preference.done
  },

  [types.GETTER_PREFERENCE_ERROR]: function (state) {
    return state.payload.preference.error
  },

  [types.GETTER_ACCOUNT_DATA]: function (state) {
    return state.payload.account.data
  },

  [types.GETTER_ACCOUNT_DATA_CREATE]: function (state) {
    return state.payload.account.data.create
  },

  [types.GETTER_ACCOUNT_DATA_UPDATE]: function (state) {
    return state.payload.account.data.update
  },

  [types.GETTER_ACCOUNT_DATA_REMOVE]: function (state) {
    return state.payload.account.data.remove
  },

  [types.GETTER_ACCOUNT_DATA_GET]: function (state) {
    return state.payload.account.data.get
  },

  [types.GETTER_ACCOUNT_DATA_GET_ALL]: function (state) {
    return state.payload.account.data.getAll
  },

  [types.GETTER_ACCOUNT_DATA_SEARCH]: function (state) {
    return state.payload.account.data.search
  },

  [types.GETTER_ACCOUNT_DATA_UPDATE]: function (state) {
    return state.payload.account.data.search
  },

  [types.GETTER_ACCOUNT_DONE]: function (state) {
    return state.payload.account.done
  },

  [types.GETTER_ACCOUNT_ERROR]: function (state) {
    return state.payload.account.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
