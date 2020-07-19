import * as types from '@/store/types'

const state = {
  payload: {
    parcel: {
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
    category: {
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
  [types.MUTATION_PARCEL_DATA]: function (state, data) {
    state.payload.parcel = {
      ...state.payload.parcel,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PARCEL_ERRORS]: function (state, data) {
    state.payload.parcel = {
      ...state.payload.parcel,
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

  [types.MUTATIONS_CLEAR_PARCEL_DATA]: function (state, data) {
    state.payload.parcel = {
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

  [types.MUTATION_CATEGORY_DATA]: function (state, data) {
    state.payload.category = {
      ...state.payload.category,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_CATEGORY_ERRORS]: function (state, data) {
    state.payload.category = {
      ...state.payload.category,
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

  [types.MUTATIONS_CLEAR_CATEGORY_DATA]: function (state, data) {
    state.payload.category = {
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

const actions = {
  [types.ACTION_PARCEL_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PARCEL_DATA, {done: false})
    const resource = this._vm.$resource('{service}/api/parcels', {}, {
      create: {method: 'POST', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    return resource.create({service: 'parcel-service'}, {canceled: false, ...payload}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_PARCEL_DATA, {
        data: {
          ...state.payload.parcel.data,
          create: {
            ...parsed.data
          }
        },
        done: true
      })
      return state.payload.parcel.data.create
    }).catch(err => {
      err.json().then(parsed => {
        let validations = {}
        parsed.validations.forEach(e => { validations[e.param] = e.msg })

        commit(types.MUTATION_PARCEL_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message,
            from: 'create',
            reason: {
              ...validations
            }
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_PARCEL_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PARCEL_DATA, {done: false})
    const resource = this._vm.$resource('{service}/api/parcels/search', {}, {
      search: {method: 'POST', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    return resource.search({service: 'parcel-service'}, {
      pagination: {
        pageNumber: 0,
        pageSize: 10
      },
      search: {
        sender: payload.sender
      }
    }).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_PARCEL_DATA, {
        data: {
          ...state.payload.parcel.data,
          search: {
            ...parsed.data
          }
        },
        done: true
      })
      return state.payload.parcel.data.search
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_PARCEL_DATA, {
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
  },

  [types.ACTION_CATEGORY_GET_ALL]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/api/categories/page/{page}/limit/{limit}', {}, {
      getAll: {method: 'GET', headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}}})
    return resource.getAll({service: 'parcel-service', page: 1, limit: 10}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_CATEGORY_DATA, {
        data: {
          ...state.payload.parcel.data,
          getAll: {
            ...parsed.data
          }
        },
        done: true
      })
      return state.payload.parcel.data.getAll
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_CATEGORY_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message,
            from: 'getAll',
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
  [types.GETTER_PARCEL_DEFAULT]: function (state) {
    return state.payload.parcel
  },

  [types.GETTER_CATEGORY_DEFAULT]: function (state) {
    return state.payload.category
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
