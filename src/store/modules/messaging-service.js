import * as types from '@/store/types'

const state = {
  payload: {
    status: {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    },
    conversation: {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    },
    communication: {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  }
}

const mutations = {
  [types.MUTATION_STATUS_DATA]: function (state, data) {
    state.payload.status = {
      ...state.payload.status,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_STATUS_DATA]: function (state, data) {
    state.payload.status = {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  },

  [types.MUTATIONS_CLEAR_STATUS_ERRORS]: function (state, data) {
    state.payload.status = {
      ...state.payload.status,
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  },

  [types.MUTATION_CONVERSATION_DATA]: function (state, data) {
    state.payload.conversation = {
      ...state.payload.conversation,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_CONVERSATION_DATA]: function (state, data) {
    state.payload.conversation = {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  },

  [types.MUTATIONS_CLEAR_CONVERSATION_ERRORS]: function (state, data) {
    state.payload.conversation = {
      ...state.payload.conversation,
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  },

  [types.MUTATION_COMMUNICATION_DATA]: function (state, data) {
    state.payload.communication = {
      ...state.payload.communication,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_COMMUNICATION_DATA]: function (state, data) {
    state.payload.communication = {
      data: {
        create: {},
        update: {},
        remove: {},
        get: {},
        getAll: {},
        search: {}
      },
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  },

  [types.MUTATIONS_CLEAR_COMMUNICATION_ERRORS]: function (state, data) {
    state.payload.communication = {
      ...state.payload.communication,
      error: {
        is: false,
        message: null,
        from: '',
        reason: {}
      },
      done: true
    }
  }
}

const actions = {
  [types.ACTION_STATUS_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_STATUS_DATA, {done: false})
    return this._vm.$resource('{service}/api/status', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).create({service: 'messaging-service'}, payload)
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_STATUS_DATA, {
          data: {
            ...state.payload.status.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.status.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_STATUS_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'create',
                reason: parsed.reason
              },
              done: true
            })
            throw new Error(state.payload.status.error.message)
          })
      })
  },

  [types.ACTION_STATUS_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_STATUS_DATA, {done: false})
    return this._vm.$resource('{service}/api/status/search', {}, {
      search: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'messaging-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        if (Object.keys(parsed).length < 2) return state.payload.status.data.search

        commit(types.MUTATION_STATUS_DATA, {
          data: {
            ...state.payload.status.data,
            search: {
              ...parsed._embedded.statusList
            }
          },
          done: true
        })
        return state.payload.status.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_STATUS_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.status.error.message)
          })
      })
  },

  [types.ACTION_CONVERSATION_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_CONVERSATION_DATA, {done: false})
    return this._vm.$resource('{service}/api/conversations', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).create({service: 'messaging-service'}, payload)
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_CONVERSATION_DATA, {
          data: {
            ...state.payload.conversation.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.conversation.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_CONVERSATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'create',
                reason: parsed.reason
              },
              done: true
            })
            throw new Error(state.payload.conversation.error.message)
          })
      })
  },

  [types.ACTION_CONVERSATION_GET]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_CONVERSATION_DATA, {done: false})
    return this._vm.$resource('{service}/api/conversations/{conversationId}', {}, {
      get: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).get({service: 'messaging-service', conversationId: payload})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_CONVERSATION_DATA, {
          data: {
            ...state.payload.conversation.data,
            get: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.conversation.data.get
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_CONVERSATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'get',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.conversation.error.message)
          })
      })
  },

  [types.ACTION_CONVERSATION_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_CONVERSATION_DATA, {done: false})
    return this._vm.$resource('{service}/api/conversations/search', {}, {
      search: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'messaging-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        if (Object.keys(parsed).length < 2) return state.payload.conversation.data.search

        commit(types.MUTATION_CONVERSATION_DATA, {
          data: {
            ...state.payload.conversation.data,
            search: {
              ...parsed._embedded.conversationsList
            }
          },
          done: true
        })
        return state.payload.conversation.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_CONVERSATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.conversation.error.message)
          })
      })
  },

  [types.ACTION_COMMUNICATION_CREATE]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_COMMUNICATION_DATA, {done: false})
    return this._vm.$resource('{service}/api/communications', {}, {
      create: {
        method: 'POST',
        headers: {'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`}
      }
    }).create({service: 'messaging-service'}, payload)
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_COMMUNICATION_DATA, {
          data: {
            ...state.payload.communication.data,
            create: {
              ...parsed
            }
          },
          done: true
        })
        return state.payload.communication.data.create
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_COMMUNICATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'create',
                reason: parsed.reason
              },
              done: true
            })
            throw new Error(state.payload.communication.error.message)
          })
      })
  },

  [types.ACTION_COMMUNICATION_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_COMMUNICATION_DATA, {done: false})
    return this._vm.$resource('{service}/api/communications/search', {}, {
      search: {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${rootState.authorization.payload.signIn.data.accessToken}`
        }
      }
    }).search({service: 'messaging-service'}, {pagination: {pageNumber: 0, pageSize: 10}, search: {...payload}})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        if (Object.keys(parsed).length < 2) return state.payload.communication.data.search

        commit(types.MUTATION_COMMUNICATION_DATA, {
          data: {
            ...state.payload.communication.data,
            search: {
              ...parsed.data
            }
          },
          done: true
        })
        return state.payload.communication.data.search
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_COMMUNICATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message ? parsed.message : 'Ľutujeme, ale nastala chyba',
                from: 'search',
                reason: {}
              },
              done: true
            })
            throw new Error(state.payload.communication.error.message)
          })
      })
  }
}

const getters = {
  [types.GETTER_STATUS_DATA]: function (state) {
    return state.payload.status.data
  },

  [types.GETTER_STATUS_DATA_CREATE]: function (state) {
    return state.payload.status.data.create
  },

  [types.GETTER_STATUS_DATA_UPDATE]: function (state) {
    return state.payload.status.data.update
  },

  [types.GETTER_STATUS_DATA_REMOVE]: function (state) {
    return state.payload.status.data.remove
  },

  [types.GETTER_STATUS_DATA_GET]: function (state) {
    return state.payload.status.data.get
  },

  [types.GETTER_STATUS_DATA_GET_ALL]: function (state) {
    return state.payload.status.data.getAll
  },

  [types.GETTER_STATUS_DATA_SEARCH]: function (state) {
    return state.payload.status.data.search
  },

  [types.GETTER_STATUS_DONE]: function (state) {
    return state.payload.status.done
  },

  [types.GETTER_STATUS_ERROR]: function (state) {
    return state.payload.status.error
  },

  [types.GETTER_CONVERSATION_DATA]: function (state) {
    return state.payload.conversation.data
  },

  [types.GETTER_CONVERSATION_DATA_CREATE]: function (state) {
    return state.payload.conversation.data.create
  },

  [types.GETTER_CONVERSATION_DATA_UPDATE]: function (state) {
    return state.payload.conversation.data.update
  },

  [types.GETTER_CONVERSATION_DATA_REMOVE]: function (state) {
    return state.payload.conversation.data.remove
  },

  [types.GETTER_CONVERSATION_DATA_GET]: function (state) {
    return state.payload.conversation.data.get
  },

  [types.GETTER_CONVERSATION_DATA_GET_ALL]: function (state) {
    return state.payload.conversation.data.getAll
  },

  [types.GETTER_CONVERSATION_DATA_SEARCH]: function (state) {
    return state.payload.conversation.data.search
  },

  [types.GETTER_CONVERSATION_DONE]: function (state) {
    return state.payload.conversation.done
  },

  [types.GETTER_CONVERSATION_ERROR]: function (state) {
    return state.payload.conversation.error
  },

  [types.GETTER_COMMUNICATION_DATA]: function (state) {
    return state.payload.communication.data
  },

  [types.GETTER_COMMUNICATION_DATA_CREATE]: function (state) {
    return state.payload.communication.data.create
  },

  [types.GETTER_COMMUNICATION_DATA_UPDATE]: function (state) {
    return state.payload.communication.data.update
  },

  [types.GETTER_COMMUNICATION_DATA_REMOVE]: function (state) {
    return state.payload.communication.data.remove
  },

  [types.GETTER_COMMUNICATION_DATA_GET]: function (state) {
    return state.payload.communication.data.get
  },

  [types.GETTER_COMMUNICATION_DATA_GET_ALL]: function (state) {
    return state.payload.communication.data.getAll
  },

  [types.GETTER_COMMUNICATION_DATA_SEARCH]: function (state) {
    return state.payload.communication.data.search
  },

  [types.GETTER_COMMUNICATION_DONE]: function (state) {
    return state.payload.communication.done
  },

  [types.GETTER_COMMUNICATION_ERROR]: function (state) {
    return state.payload.communication.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
