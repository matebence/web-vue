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
    },
    gender: {
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
    payout: {
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
    payment: {
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

  [types.MUTATIONS_CLEAR_USER_ERRORS]: function (state, data) {
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
  },

  [types.MUTATION_GENDER_DATA]: function (state, data) {
    state.payload.gender = {
      ...state.payload.gender,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_GENDER_DATA]: function (state, data) {
    state.payload.gender = {
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

  [types.MUTATIONS_CLEAR_GENDER_ERRORS]: function (state, data) {
    state.payload.gender = {
      ...state.payload.gender,
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

  [types.MUTATION_PAYOUT_DATA]: function (state, data) {
    state.payload.payout = {
      ...state.payload.payout,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PAYOUT_DATA]: function (state, data) {
    state.payload.payout = {
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

  [types.MUTATIONS_CLEAR_PAYOUT_ERRORS]: function (state, data) {
    state.payload.payout = {
      ...state.payload.payout,
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

  [types.MUTATION_PAYMENT_DATA]: function (state, data) {
    state.payload.payment = {
      ...state.payload.payment,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PAYMENT_DATA]: function (state, data) {
    state.payload.payment = {
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

  [types.MUTATIONS_CLEAR_PAYMENT_ERRORS]: function (state, data) {
    state.payload.payment = {
      ...state.payload.payment,
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
  [types.ACTION_USER_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_USER_DATA, {done: false})
    return this._vm.$resource('{service}/api/users', {}, {
      create: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).create({service: 'user-service'}, {...payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_USER_DATA, {
          data: {
            ...state.payload.user.data,
            create: {
              ...parsed
            },
            get: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.user.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_USER_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'create',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_USER_UPDATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_USER_DATA, {done: false})
    return this._vm.$resource('{service}/api/users/{accountId}', {}, {
      update: {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).update({service: 'user-service', accountId: payload.accountId}, {...payload})
      .then(response => {
        commit(types.MUTATION_USER_DATA, {
          data: {
            ...state.payload.user.data,
            update: {
              userId: state.payload.user.data.get.userId,
              email: state.payload.user.data.get.email,
              userName: state.payload.user.data.get.userName,
              ...payload
            },
            get: {
              userId: state.payload.user.data.get.userId,
              email: state.payload.user.data.get.email,
              userName: state.payload.user.data.get.userName,
              ...payload
            }
          },
          done: true
        })
        return state.payload.user.data.update
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_USER_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'update',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_USER_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_USER_DATA, {done: false})
    return this._vm.$resource('{service}/api/users/search', {}, {
      search: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'user-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: { ...payload }})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_USER_DATA, {
          data: {
            ...state.payload.user.data,
            search: {
              ...parsed._embedded.usersList
            }
          },
          done: true
        })
        return state.payload.user.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_USER_DATA, {
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

  [types.ACTION_USER_GET]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_USER_DATA, {done: false})
    return this._vm.$resource('{service}/api/users/{accountId}', {}, {
      get: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).get({service: 'user-service', accountId: payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_USER_DATA, {
          data: {
            ...state.payload.user.data,
            get: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.user.data.get
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_USER_DATA, {
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

  [types.ACTION_GENDER_GET_ALL]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_GENDER_DATA, {done: false})
    return this._vm.$resource('{service}/api/genders/page/{page}/limit/{limit}', {}, {
      getAll: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).getAll({service: 'user-service', page: 0, limit: 10})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_GENDER_DATA, {
          data: {
            ...state.payload.gender.data,
            getAll: {
              ...parsed._embedded.gendersList
            }
          },
          done: true
        })
        return state.payload.gender.data.getAll
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_GENDER_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'getAll',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_PAYOUT_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PAYOUT_DATA, {done: false})
    return this._vm.$resource('{service}/api/users', {}, {
      create: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).create({service: 'user-service'}, {...payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PAYOUT_DATA, {
          data: {
            ...state.payload.payout.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.payout.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PAYOUT_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'create',
                reason: {}
              },
              done: true
            })
            throw new Error(parsed.message)
          })
      })
  },

  [types.ACTION_PAYMENT_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_PAYMENT_DATA, {done: false})
    return this._vm.$resource('{service}/api/users', {}, {
      create: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).create({service: 'user-service'}, {...payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_PAYMENT_DATA, {
          data: {
            ...state.payload.payment.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.payment.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_PAYMENT_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                from: 'create',
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
  [types.GETTER_USER_DATA]: function (state) {
    return state.payload.user.data
  },

  [types.GETTER_USER_DATA_CREATE]: function (state) {
    return state.payload.user.data.create
  },

  [types.GETTER_USER_DATA_UPDATE]: function (state) {
    return state.payload.user.data.update
  },

  [types.GETTER_USER_DATA_SEARCH]: function (state) {
    return state.payload.user.data.search
  },

  [types.GETTER_USER_DATA_GET]: function (state) {
    return state.payload.user.data.get
  },

  [types.GETTER_USER_DONE]: function (state) {
    return state.payload.user.done
  },

  [types.GETTER_USER_ERROR]: function (state) {
    return state.payload.user.error
  },

  [types.GETTER_GENDER_DATA]: function (state) {
    return state.payload.gender.data
  },

  [types.GETTER_GENDER_DATA_GET_ALL]: function (state) {
    return state.payload.gender.data.getAll
  },

  [types.GETTER_GENDER_DONE]: function (state) {
    return state.payload.gender.done
  },

  [types.GETTER_GENDER_ERROR]: function (state) {
    return state.payload.gender.error
  },

  [types.GETTER_PAYOUT_DATA]: function (state) {
    return state.payload.payout.data
  },

  [types.GETTER_PAYOUT_DATA_CREATE]: function (state) {
    return state.payload.payout.data.create
  },

  [types.GETTER_PAYOUT_DONE]: function (state) {
    return state.payload.payout.done
  },

  [types.GETTER_PAYOUT_ERROR]: function (state) {
    return state.payload.payout.error
  },

  [types.GETTER_PAYMENT_DATA]: function (state) {
    return state.payload.payment.data
  },

  [types.GETTER_PAYMENT_DATA_CREATE]: function (state) {
    return state.payload.payment.data.create
  },

  [types.GETTER_PAYMENT_DONE]: function (state) {
    return state.payload.payment.done
  },

  [types.GETTER_PAYMENT_ERROR]: function (state) {
    return state.payload.payment.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
