import * as types from '@/store/types'

const state = {
  payload: {
    location: {
      data: {},
      error: {
        from: ''
      }
    }
  }
}

const mutations = {
  [types.MUTATION_LOCATION_DATA]: function (state, data) {
    state.payload.location = {
      ...state.payload.location,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_LOCATION_DATA]: function (state, data) {
    state.payload = {
      location: {
        data: {},
        error: {
          from: ''
        }
      }
    }
  },

  [types.MUTATIONS_CLEAR_LOCATION_ERRORS]: function (state, data) {
    state.payload.location = {
      ...state.payload.location,
      error: {
        from: ''
      }
    }
  }
}

const actions = {
  [types.ACTION_LOCATION_GET]: function ({commit, dispatch, state, rootState}) {
    return fetch(`${process.env.HOST_IPIFY}?format=json`)
      .then(response => response.json())
      .then(({ip}) => fetch(`${process.env.HOST_IP_API}/json/${ip}`, {method: 'GET'}))
      .then(response => response.json())
      .then(location => {
        commit(types.MUTATION_LOCATION_DATA, {
          ...state.payload.location,
          data: {
            ...location
          }
        })
        return state.payload.location.data
      })
      .catch(err => {
        commit(types.MUTATION_LOCATION_DATA, {
          error: {
            ...err,
            from: 'get'
          }
        })
        return new Error(err)
      })
  }
}

const getters = {
  [types.GETTER_LOCATION_DATA]: function (state) {
    return state.payload.location.data
  },

  [types.GETTER_LOCATION_ERROR]: function (state) {
    return state.payload.location.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
