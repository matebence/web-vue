import * as types from '@/store/types'
import router from '@/router'

const state = {
  payload: {
    data: {
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      userName: null,
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
  }
}

const actions = {
  [types.ACTION_START_AUTH_TIMER]: function ({commit, dispatch, state}, payload) {
    setTimeout(function () {
    }, payload.expirationTime * 1000)
  },

  [types.ACTION_REFRESH_AUTH]: function ({commit, dispatch, state}, payload) {
  },

  [types.ACTION_AUTO_SIGN_IN]: function ({commit, dispatch, state}, payload) {
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

  [types.ACTION_SIGN_IN]: function ({commit, dispatch, state}, payload) {
    commit(types.MUTATIONS_SIGN_IN_DATA, {done: false})
    const resource = this._vm.$resource('{service}/signin', {}, {
      performSignIn: {method: 'POST', headers: {'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`}}}, {emulateJSON: true})
    resource.performSignIn({service: 'authorization-server'}, {grant_type: payload.grantType, username: payload.userName, password: payload.password}).then(response => {
      return response.json()
    }).then(parsed => {
      const accountData = {
        accessToken: parsed.access_token,
        refreshToken: parsed.refresh_token,
        expiresIn: parsed.expires_in,
        userName: parsed.user_name,
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

      dispatch(types.ACTION_START_AUTH_TIMER, parsed.expires_in)
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
  }
}

const getters = {
  [types.GETTER_SIGN_IN_DEFAULT]: function (state) {
    return state.payload
  },

  [types.GETTER_SIGN_IN_IS_AUTH]: function (state) {
    return state.payload.data.accessToken !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
