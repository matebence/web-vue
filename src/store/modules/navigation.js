import * as types from '@/store/types'

const state = {
  payload: {
    navigation: {
      data: {
        loggedAccount: {
          avatar: null
        }
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    }
  }
}

const mutations = {
  [types.MUTATION_NAVIGATION_DATA]: function (state, data) {
    state.payload.navigation = {
      ...state.payload.navigation,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_NAVIGATION_DATA]: function (state, data) {
    state.payload.navigation = {
      data: {
        loggedAccount: {
          avatar: null
        }
      },
      error: {
        is: false,
        message: null,
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
        reason: {
        }
      },
      done: true
    }
  }
}

const actions = {
  [types.ACTION_NAVIGATION_AVATAR]: function ({commit, dispatch, state, rootState}, payload) {
    dispatch(types.ACTION_USER_SEARCH, {accountId: rootState.authorization.payload.signIn.data.accountId}).then(result => {
      if (localStorage.getItem('avatar') === null) {
        const user = result[0]
        const firstName = user.firstName
        const lastName = user.lastName

        localStorage.setItem('avatar', `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`)
      }
      commit(types.MUTATION_NAVIGATION_DATA, {
        data: {
          ...state.payload.navigation.data,
          loggedAccount: {
            avatar: localStorage.getItem('avatar')
          }
        },
        done: true
      })
    })
  }
}

const getters = {
  [types.GETTER_NAVIGATION_DEFAULT]: function (state) {
    return state.payload.navigation
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
