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
    },
    rating: {
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
  },

  [types.MUTATION_RATING_DATA]: function (state, data) {
    state.payload.rating = {
      ...state.payload.rating,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_RATING_ERRORS]: function (state, data) {
    state.payload.rating = {
      ...state.payload.rating,
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

  [types.MUTATIONS_CLEAR_RATING_DATA]: function (state, data) {
    state.payload.rating = {
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
    return this._vm.$resource('{service}/api/parcels', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).create({service: 'parcel-service'}, {canceled: false, ...payload.data})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PARCEL_DATA, {
          data: {
            ...state.payload.parcel.data,
            create: [
              ...Object.values(state.payload.parcel.data.create).filter(e => e.id !== payload.id)
            ]
          },
          done: true
        })
        return parsed
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            let validations = {}
            parsed.validations.forEach(e => { validations[e.param] = e.msg })

            commit(types.MUTATION_PARCEL_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'create',
                reason: {
                  ...validations
                }
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  },

  [types.ACTION_PARCEL_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PARCEL_DATA, {done: false})
    return this._vm.$resource('{service}/api/parcels/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).search({service: 'parcel-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: payload, orderBy: {id: 'desc'}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
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
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PARCEL_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {
                }
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  },

  [types.ACTION_CATEGORY_GET_ALL]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_CATEGORY_DATA, {done: false})
    return this._vm.$resource('{service}/api/categories/page/{page}/limit/{limit}', {}, {
      getAll: {
        method: 'GET',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).getAll({service: 'parcel-service', page: 1, limit: 10})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
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
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_CATEGORY_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'getAll',
                reason: {
                }
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  },

  [types.ACTION_RATING_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_RATING_DATA, {done: false})
    return this._vm.$resource('{service}/api/ratings', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).create({service: 'parcel-service'}, {...payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_RATING_DATA, {
          data: {
            ...state.payload.rating.data,
            create: [
              ...Object.values(state.payload.rating.data.create).filter(e => e.id !== payload.id)
            ]
          },
          done: true
        })
        return parsed
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            let validations = {}
            parsed.validations.forEach(e => { validations[e.param] = e.msg })

            commit(types.MUTATION_RATING_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'create',
                reason: {
                  ...validations
                }
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  },

  [types.ACTION_RATING_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_RATING_DATA, {done: false})
    return this._vm.$resource('{service}/api/ratings/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).search({service: 'parcel-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_RATING_DATA, {
          data: {
            ...state.payload.rating.data,
            search: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.rating.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_RATING_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {
                }
              },
              done: true
            })
            throw new Error(parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba')
          })
      })
  }
}

const getters = {
  [types.GETTER_RATING_DATA]: function (state) {
    return state.payload.rating.data
  },

  [types.GETTER_RATING_DATA_CREATE]: function (state) {
    return state.payload.rating.data.create
  },

  [types.GETTER_RATING_DATA_UPDATE]: function (state) {
    return state.payload.rating.data.update
  },

  [types.GETTER_RATING_DATA_REMOVE]: function (state) {
    return state.payload.rating.data.remove
  },

  [types.GETTER_RATING_DATA_GET]: function (state) {
    return state.payload.rating.data.get
  },

  [types.GETTER_RATING_DATA_GET_ALL]: function (state) {
    return state.payload.rating.data.getAll
  },

  [types.GETTER_RATING_DATA_SEARCH]: function (state) {
    return state.payload.rating.data.search
  },

  [types.GETTER_RATING_DATA_UPDATE]: function (state) {
    return state.payload.rating.data.search
  },

  [types.GETTER_RATING_DONE]: function (state) {
    return state.payload.rating.done
  },

  [types.GETTER_RATING_ERROR]: function (state) {
    return state.payload.rating.error
  },

  [types.GETTER_CATEGORY_DATA]: function (state) {
    return state.payload.category.data
  },

  [types.GETTER_CATEGORY_DATA_CREATE]: function (state) {
    return state.payload.category.data.create
  },

  [types.GETTER_CATEGORY_DATA_UPDATE]: function (state) {
    return state.payload.category.data.update
  },

  [types.GETTER_CATEGORY_DATA_REMOVE]: function (state) {
    return state.payload.category.data.remove
  },

  [types.GETTER_CATEGORY_DATA_GET]: function (state) {
    return state.payload.category.data.get
  },

  [types.GETTER_CATEGORY_DATA_GET_ALL]: function (state) {
    return state.payload.category.data.getAll
  },

  [types.GETTER_CATEGORY_DATA_SEARCH]: function (state) {
    return state.payload.category.data.search
  },

  [types.GETTER_CATEGORY_DATA_UPDATE]: function (state) {
    return state.payload.category.data.search
  },

  [types.GETTER_CATEGORY_DONE]: function (state) {
    return state.payload.category.done
  },

  [types.GETTER_CATEGORY_ERROR]: function (state) {
    return state.payload.category.error
  },

  [types.GETTER_PARCEL_DATA]: function (state) {
    return state.payload.parcel.data
  },

  [types.GETTER_PARCEL_DATA_CREATE]: function (state) {
    return state.payload.parcel.data.create
  },

  [types.GETTER_PARCEL_DATA_UPDATE]: function (state) {
    return state.payload.parcel.data.update
  },

  [types.GETTER_PARCEL_DATA_REMOVE]: function (state) {
    return state.payload.parcel.data.remove
  },

  [types.GETTER_PARCEL_DATA_GET]: function (state) {
    return state.payload.parcel.data.get
  },

  [types.GETTER_PARCEL_DATA_GET_ALL]: function (state) {
    return state.payload.parcel.data.getAll
  },

  [types.GETTER_PARCEL_DATA_SEARCH]: function (state) {
    return state.payload.parcel.data.search
  },

  [types.GETTER_PARCEL_DATA_UPDATE]: function (state) {
    return state.payload.parcel.data.search
  },

  [types.GETTER_PARCEL_DONE]: function (state) {
    return state.payload.parcel.done
  },

  [types.GETTER_PARCEL_ERROR]: function (state) {
    return state.payload.parcel.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
