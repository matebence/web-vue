import * as types from '@/store/types'

const state = {
  payload: {
    shipment: {
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
    price: {
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
    invoice: {
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
  [types.MUTATION_SHIPMENT_DATA]: function (state, data) {
    state.payload.shipment = {
      ...state.payload.shipment,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_SHIPMENT_DATA]: function (state, data) {
    state.payload.shipment = {
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

  [types.MUTATIONS_CLEAR_SHIPMENT_ERRORS]: function (state, data) {
    state.payload.shipment = {
      ...state.payload.shipment,
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

  [types.MUTATION_PRICE_DATA]: function (state, data) {
    state.payload.price = {
      ...state.payload.price,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PRICE_DATA]: function (state, data) {
    state.payload.price = {
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

  [types.MUTATIONS_CLEAR_PRICE_ERRORS]: function (state, data) {
    state.payload.price = {
      ...state.payload.price,
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

  [types.MUTATION_INVOICE_DATA]: function (state, data) {
    state.payload.invoice = {
      ...state.payload.invoice,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_INVOICE_DATA]: function (state, data) {
    state.payload.invoice = {
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

  [types.MUTATIONS_CLEAR_INVOICE_ERRORS]: function (state, data) {
    state.payload.invoice = {
      ...state.payload.invoice,
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
  [types.ACTION_SHIPMENT_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_SHIPMENT_DATA, {done: false})
    return this._vm.$resource('{service}/api/shipments', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).create({service: 'shipment-service'}, {shipments: payload.shipments.map(e => ({ ...e, express: false }))})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_SHIPMENT_DATA, {
          data: {
            ...state.payload.shipment.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.shipment.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            let validations = {}
            parsed.validations.forEach(e => { validations[e.param] = e.msg })

            commit(types.MUTATION_SHIPMENT_DATA, {
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
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_SHIPMENT_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_SHIPMENT_DATA, {done: false})
    return this._vm.$resource('{service}/api/shipments/search', {}, {
      search: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'shipment-service'}, {pagination: {pageNumber: 1, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_SHIPMENT_DATA, {
          data: {
            ...state.payload.shipment.data,
            search: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.shipment.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_SHIPMENT_DATA, {
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
  },

  [types.ACTION_PRICE_GET]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PRICE_DATA, {done: false})
    return this._vm.$resource('{service}/api/prices/{_id}', {}, {
      get: {
        method: 'GET',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).get({service: 'shipment-service', _id: payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PRICE_DATA, {
          data: {
            ...state.payload.price.data,
            get: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.price.data.get
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PRICE_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'get',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_INVOICE_DOWNLOAD]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_INVOICE_DATA, {done: false})
    return this._vm.$resource('{service}/api/invoices/{_id}', {}, {
      get: {
        method: 'GET',
        responseType: 'arraybuffer',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).get({service: 'shipment-service', _id: payload})
      .then(response => {
        return response.data
      })
      .then(parsed => {
        commit(types.MUTATION_INVOICE_DATA, {
          done: true
        })
        return window.open(window.URL.createObjectURL(new Blob([parsed], {type: 'application/pdf'})))
      })
      .catch(err => {
        commit(types.MUTATION_INVOICE_DATA, {
          error: {
            is: !err.ok,
            message: 'Ľutujeme, ale faktúra nie je k dispozícií.',
            from: 'get',
            reason: {}
          },
          done: true
        })
        throw new Error(state.payload.invoice.error.message)
      })
  }
}

const getters = {
  [types.GETTER_SHIPMENT_DATA]: function (state) {
    return state.payload.shipment.data
  },

  [types.GETTER_SHIPMENT_DATA_CREATE]: function (state) {
    return state.payload.shipment.data.create
  },

  [types.GETTER_SHIPMENT_DATA_SEARCH]: function (state) {
    return state.payload.shipment.data.search
  },

  [types.GETTER_SHIPMENT_DONE]: function (state) {
    return state.payload.shipment.done
  },

  [types.GETTER_SHIPMENT_ERROR]: function (state) {
    return state.payload.shipment.error
  },

  [types.GETTER_PRICE_DATA]: function (state) {
    return state.payload.price.data
  },

  [types.GETTER_PRICE_DATA_GET]: function (state) {
    return state.payload.price.data.get
  },

  [types.GETTER_PRICE_DONE]: function (state) {
    return state.payload.price.done
  },

  [types.GETTER_PRICE_ERROR]: function (state) {
    return state.payload.price.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
