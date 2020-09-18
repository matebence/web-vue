import * as types from '@/store/types'

const state = {
  payload: {
    vehicle: {
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
    type: {
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
  [types.MUTATION_VEHICLE_DATA]: function (state, data) {
    state.payload.vehicle = {
      ...state.payload.vehicle,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_VEHICLE_DATA]: function (state, data) {
    state.payload.vehicle = {
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

  [types.MUTATIONS_CLEAR_VEHICLE_ERRORS]: function (state, data) {
    state.payload.vehicle = {
      ...state.payload.vehicle,
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

  [types.MUTATION_TYPE_DATA]: function (state, data) {
    state.payload.type = {
      ...state.payload.type,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_TYPE_DATA]: function (state, data) {
    state.payload.type = {
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

  [types.MUTATIONS_CLEAR_TYPE_ERRORS]: function (state, data) {
    state.payload.type = {
      ...state.payload.type,
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
  [types.ACTION_VEHICLE_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_VEHICLE_DATA, {done: false})
    return this._vm.$resource('{service}/api/vehicles', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).create({service: 'vehicle-service'}, {name: payload.name, courier: payload.accountId, type: payload.type._id})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...state.payload.vehicle.data,
            create: {
              ...parsed
            },
            search: [...state.payload.vehicle.data.search, {...parsed, type: payload.type}]
          },
          done: true
        })
        return state.payload.vehicle.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            let validations = {}
            parsed.validations.forEach(e => { validations[e.param] = e.msg })

            commit(types.MUTATION_VEHICLE_DATA, {
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
            throw new Error(state.payload.vehicle.error.message)
          })
      })
  },

  [types.ACTION_VEHICLE_UPDATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_VEHICLE_DATA, {done: false})
    return this._vm.$resource('{service}/api/vehicles/{_id}', {}, {
      update: {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).update({service: 'vehicle-service', _id: payload._id}, {name: payload.name, courier: payload.accountId, type: payload.type._id})
      .then(response => {
        commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...state.payload.vehicle.data,
            update: {
              ...payload.data
            },
            search: [...Object.values(state.payload.vehicle.data.search).filter(e => e._id !== payload._id), {_id: payload._id, name: payload.name, courier: payload.accountId, type: payload.type}]
          },
          done: true
        })
        return state.payload.vehicle.data.update
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            let validations = {}
            parsed.validations.forEach(e => { validations[e.param] = e.msg })

            commit(types.MUTATION_VEHICLE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'update',
                reason: {
                  ...validations
                }
              },
              done: true
            })
            throw new Error(state.payload.vehicle.error.message)
          })
      })
  },

  [types.ACTION_VEHICLE_DELETE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_VEHICLE_DATA, {done: false})
    return this._vm.$resource('{service}/api/vehicles/{_id}', {}, {
      delete: {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).delete({service: 'vehicle-service', _id: payload._id})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...state.payload.vehicle.data,
            remove: {
              ...parsed
            },
            search: payload.data
          },
          done: true
        })
        return state.payload.vehicle.data.remove
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_VEHICLE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'remove',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.vehicle.error.message)
          })
      })
  },

  [types.ACTION_VEHICLE_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_VEHICLE_DATA, {done: false})
    return this._vm.$resource('{service}/api/vehicles/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'vehicle-service'}, {pagination: {pageNumber: 1, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        if (Object.keys(parsed).length < 2) return state.payload.vehicle.data.search

        commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...state.payload.vehicle.data,
            search: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.vehicle.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_VEHICLE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.vehicle.error.message)
          })
      })
  },

  [types.ACTION_VEHICLE_GET]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_VEHICLE_DATA, {done: false})
    return this._vm.$resource('{service}/api/vehicles/{_id}', {}, {
      get: {
        method: 'GET',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).get({service: 'vehicle-service', _id: payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...state.payload.vehicle.data,
            get: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.vehicle.data.get
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_VEHICLE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'get',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.vehicle.error.message)
          })
      })
  },

  [types.ACTION_TYPE_GET_ALL]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_TYPE_DATA, {done: false})
    return this._vm.$resource('{service}/api/types/page/{page}/limit/{limit}', {}, {
      getAll: {
        method: 'GET',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).getAll({service: 'vehicle-service', page: 1, limit: 10})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        if (Object.keys(parsed).length < 2) return state.payload.type.data.getAll

        commit(types.MUTATION_TYPE_DATA, {
          data: {
            ...state.payload.type.data,
            getAll: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.type.data.getAll
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_TYPE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'getAll',
                reason: {
                }
              },
              done: true
            })
            throw new Error(state.payload.type.error.message)
          })
      })
  }
}

const getters = {
  [types.GETTER_VEHICLE_DATA]: function (state) {
    return state.payload.vehicle.data
  },

  [types.GETTER_VEHICLE_DATA_CREATE]: function (state) {
    return state.payload.vehicle.data.create
  },

  [types.GETTER_VEHICLE_DATA_UPDATE]: function (state) {
    return state.payload.vehicle.data.update
  },

  [types.GETTER_VEHICLE_DATA_REMOVE]: function (state) {
    return state.payload.vehicle.data.remove
  },

  [types.GETTER_VEHICLE_DATA_GET]: function (state) {
    return state.payload.vehicle.data.get
  },

  [types.GETTER_VEHICLE_DATA_GET_ALL]: function (state) {
    return state.payload.vehicle.data.getAll
  },

  [types.GETTER_VEHICLE_DATA_SEARCH]: function (state) {
    return state.payload.vehicle.data.search
  },

  [types.GETTER_VEHICLE_DONE]: function (state) {
    return state.payload.vehicle.done
  },

  [types.GETTER_VEHICLE_ERROR]: function (state) {
    return state.payload.vehicle.error
  },

  [types.GETTER_TYPE_DATA]: function (state) {
    return state.payload.type.data
  },

  [types.GETTER_TYPE_DATA_CREATE]: function (state) {
    return state.payload.type.data.create
  },

  [types.GETTER_TYPE_DATA_UPDATE]: function (state) {
    return state.payload.type.data.update
  },

  [types.GETTER_TYPE_DATA_REMOVE]: function (state) {
    return state.payload.type.data.remove
  },

  [types.GETTER_TYPE_DATA_GET]: function (state) {
    return state.payload.type.data.get
  },

  [types.GETTER_TYPE_DATA_GET_ALL]: function (state) {
    return state.payload.type.data.getAll
  },

  [types.GETTER_TYPE_DATA_SEARCH]: function (state) {
    return state.payload.type.data.search
  },

  [types.GETTER_TYPE_DONE]: function (state) {
    return state.payload.type.done
  },

  [types.GETTER_TYPE_ERROR]: function (state) {
    return state.payload.type.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
