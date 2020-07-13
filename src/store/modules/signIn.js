import VueJwtDecode from 'vue-jwt-decode'
import * as types from '@/store/types'
import router from '@/router'

const state = {
  payload: {
    data: {
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      userName: null,
      authorities: [],
      accountId: 0,
      loginId: 0,
      stayLoggedIn: false
    },
    error: {
      is: false,
      message: null
    },
    done: true
  }
}

const mutations = {
  [types.MUTATIONS_SIGN_IN_DATA]: function (state, data) {
    state.payload = {
      ...state.payload,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_SIGN_IN_DATA]: function (state, data) {
    state.payload = {
      data: {
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
        userName: null,
        authorities: [],
        accountId: 0,
        loginId: 0,
        stayLoggedIn: false
      },
      error: {
        is: false,
        message: null
      },
      done: true
    }
  }
}

const actions = {
  [types.ACTION_START_AUTH_TIMER]: function ({commit, dispatch, state, rootState}, payload) {
    setTimeout(function () {
      if (state.payload.data.stayLoggedIn) {
        dispatch(types.ACTION_REFRESH_AUTH, {
          grantType: process.env.GRANT_TYPE_REFRESH_TOKEN,
          refreshToken: state.payload.data.refreshToken
        })
      } else {
        dispatch(types.ACTION_SIGN_OUT, {
          accessToken: state.payload.data.accessToken
        })
      }
    }, payload.expirationTime * 1000)
  },

  [types.ACTION_AUTO_SIGN_IN]: function ({commit, dispatch, state, rootState}, payload) {
    const data = localStorage.getItem('accountData')
    if (!data) return

    const expirationDate = localStorage.getItem('expirationDate')
    const accountData = JSON.parse(data)

    if (new Date() >= expirationDate) return
    commit(types.MUTATIONS_SIGN_IN_DATA, {
      data: {
        ...accountData
      },
      done: true
    })
    router.push({path: '/dashboard'})
  },

  [types.ACTION_SIGN_IN]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATIONS_SIGN_IN_DATA, {done: false})
    const resource = this._vm.$resource('{service}/signin', {}, {
      performSignIn: {method: 'POST', headers: {'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`}}}, {emulateJSON: true})
    resource.performSignIn({service: 'authorization-server'}, {grant_type: payload.grantType, username: payload.userName, password: payload.password}).then(response => {
      return response.json()
    }).then(parsed => {
      const jwt = VueJwtDecode.decode(parsed.access_token)
      const accountData = {
        accessToken: parsed.access_token,
        refreshToken: parsed.refresh_token,
        expiresIn: parsed.expires_in,
        userName: parsed.user_name,
        authorities: jwt.authorities,
        accountId: parsed.account_id,
        loginId: parsed.login_id,
        stayLoggedIn: payload.stayLoggedIn
      }

      commit(types.MUTATIONS_SIGN_IN_DATA, {
        data: {
          ...accountData
        },
        done: true
      })

      localStorage.setItem('accountData', JSON.stringify(accountData))
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + parsed.expires_in * 1000))

      dispatch(types.ACTION_START_AUTH_TIMER, {expirationTime: parsed.expires_in})
      router.push({path: '/dashboard'})
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATIONS_SIGN_IN_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_REFRESH_AUTH]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/signin', {}, {
      refreshAuthorizationToken: {method: 'POST', headers: {'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`}}}, {emulateJSON: true})
    resource.refreshAuthorizationToken({service: 'authorization-server'}, {grant_type: payload.grantType, refresh_token: payload.refreshToken}).then(response => {
      return response.json()
    }).then(parsed => {
      const jwt = VueJwtDecode.decode(parsed.access_token)
      const accountData = {
        accessToken: parsed.access_token,
        refreshToken: state.payload.data.refreshToken,
        expiresIn: parsed.expires_in,
        userName: parsed.user_name,
        authorities: jwt.authorities,
        accountId: parsed.account_id,
        loginId: parsed.login_id,
        stayLoggedIn: state.payload.data.stayLoggedIn
      }

      commit(types.MUTATIONS_SIGN_IN_DATA, {
        data: {
          ...accountData
        },
        done: true
      })

      localStorage.setItem('accountData', JSON.stringify(accountData))
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + parsed.expires_in * 1000))

      dispatch(types.ACTION_START_AUTH_TIMER, {expirationTime: parsed.expires_in})
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATIONS_SIGN_IN_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_SIGN_IN_DEFAULT]: function (state) {
    return state.payload
  },

  [types.GETTER_SIGN_IN_IS_AUTH]: function (state) {
    return state.payload.data.accessToken !== null
  },

  [types.GETTER_SIGN_IN_GET_ROLE]: function (state) {
    return state.payload.data.authorities
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
