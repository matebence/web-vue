import * as types from '@/store/types'

const state = {
  payload: {
    preferences: {
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
  [types.MUTATION_PREFERENCES_DATA]: function (state, data) {
    state.payload.preferences = {
      ...state.payload.preferences,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_PREFERENCES_DATA]: function (state, data) {
    state.payload.preferences = {
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

  [types.MUTATIONS_CLEAR_PREFERENCES_ERRORS]: function (state, data) {
    state.payload.preferences = {
      ...state.payload.preferences,
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
  [types.ACTION_PREFERENCES_SEARCH]: function ({commit, dispatch, state, rootState}, payload) {

  }
}

const getters = {
  [types.GETTER_PREFERENCES_DEFAULT]: function (state) {
    return state.payload.preferences
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
