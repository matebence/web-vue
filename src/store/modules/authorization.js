import VueJwtDecode from 'vue-jwt-decode'
import * as types from '@/store/types'
import router from '@/router'

const state = {
  payload: {
    signIn: {
      data: {
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    },
    signUp: {
      data: {
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    },
    signOut: {
      data: {
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    },
    forgetPassword: {
      data: {
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    },
    recoverToken: {
      data: {
      },
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
    },
    activationToken: {
      data: {
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
  [types.MUTATIONS_SIGN_IN_DATA]: function (state, data) {
    state.payload.signIn = {
      ...state.payload.signIn,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_SIGN_IN_DATA]: function (state, data) {
    state.payload.signIn = {
      data: {
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

  [types.MUTATION_SIGN_UP_DATA]: function (state, data) {
    state.payload.signUp = {
      ...state.payload.signUp,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_SIGN_UP_DATA]: function (state, data) {
    state.payload.signUp = {
      data: {
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

  [types.MUTATION_SIGN_OUT_DATA]: function (state, data) {
    state.payload.signOut = {
      ...state.payload.signOut,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_SIGN_OUT_DATA]: function (state, data) {
    state.payload.signOut = {
      data: {
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

  [types.MUTATION_FORGET_PASSWORD_DATA]: function (state, data) {
    state.payload.forgetPassword = {
      ...state.payload.forgetPassword,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_FORGET_PASSWORD_DATA]: function (state, data) {
    state.payload.forgetPassword = {
      data: {
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

  [types.MUTATION_ACCOUNT_RECOVER_DATA]: function (state, data) {
    state.payload.recoverToken = {
      ...state.payload.recoverToken,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_ACCOUNT_RECOVER_DATA]: function (state, data) {
    state.payload.recoverToken = {
      data: {
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

  [types.MUTATION_ACCOUNT_ACTIVATION_DATA]: function (state, data) {
    state.payload.activationToken = {
      ...state.payload.activationToken,
      ...data
    }
  },

  [types.MUTATIONS_CLEAR_ACCOUNT_ACTIVATION_DATA]: function (state, data) {
    state.payload.activationToken = {
      data: {
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
  },

  [types.ACTION_SIGN_UP]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_SIGN_UP_DATA, {done: false})
    const resource = this._vm.$resource('{service}/signup', {}, {performSignUp: {method: 'POST'}})
    resource.performSignUp({service: 'authorization-server'}, {userName: payload.userName, email: payload.email, password: payload.password, confirmPassword: payload.confirmPassword, accountRoles: [{roles: payload.roles}]
    }).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_SIGN_UP_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message,
          reason: {
            userName: null,
            email: null,
            password: null
          }
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_SIGN_UP_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message,
            reason: parsed.reason
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_SIGN_OUT]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/signout', {}, {
      performSignOut: {method: 'DELETE', headers: {'Authorization': `Bearer ${state.payload.signIn.data.accessToken}`}}})
    resource.performSignOut({service: 'authorization-server'}).then(response => {
      return response.json()
    }).then(parsed => {
      localStorage.removeItem('accountData')
      localStorage.removeItem('expirationDate')

      commit(types.MUTATIONS_CLEAR_SIGN_IN_DATA, {})
      commit(types.MUTATION_SIGN_OUT_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        },
        done: true
      })
      router.push({path: '/sign-in'})
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_SIGN_OUT_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_FORGET_PASSWORD]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_FORGET_PASSWORD_DATA, { done: false })
    const resource = this._vm.$resource('{service}/forgetpassword', {}, {
      recoverPassword: {method: 'POST'}})
    resource.recoverPassword({service: 'authorization-server'}, {email: payload.email}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_FORGET_PASSWORD_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        },
        done: true
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_FORGET_PASSWORD_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
      })
    })
  },

  [types.ACTION_ACCOUNT_RECOVER]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/forgetpassword/{account}/{id}/{token}/{key}', {}, {
      verifyRecoverToken: {method: 'GET'}})
    resource.verifyRecoverToken({service: 'authorization-server', account: 'account', id: payload.id, token: 'token', key: payload.key}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_ACCOUNT_RECOVER_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        }
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_ACCOUNT_RECOVER_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          }
        })
      })
    })
  },

  [types.ACTION_ACCOUNT_ACTIVATION]: function ({commit, dispatch, state, rootState}, payload) {
    const resource = this._vm.$resource('{service}/signup/{account}/{id}/{token}/{key}', {}, {
      verifyActivationToken: { method: 'GET' }})
    resource.verifyActivationToken({service: 'authorization-server', account: 'account', id: payload.id, token: 'token', key: payload.key}).then(response => {
      return response.json()
    }).then(parsed => {
      commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
        error: {
          is: parsed.error,
          message: parsed.message
        }
      })
    }).catch(err => {
      err.json().then(parsed => {
        commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          }
        })
      })
    })
  }
}

const getters = {
  [types.GETTER_SIGN_IN_DEFAULT]: function (state) {
    return state.payload.signIn
  },

  [types.GETTER_SIGN_IN_IS_AUTH]: function (state) {
    return state.payload.signIn.data.accessToken !== null
  },

  [types.GETTER_SIGN_IN_GET_ROLE]: function (state) {
    return state.payload.signIn.data.authorities
  },

  [types.GETTER_SIGN_UP_DEFAULT]: function (state) {
    return state.payload.signUp
  },

  [types.GETTER_SIGN_OUT_DEFAULT]: function (state) {
    return state.payload.signOut
  },

  [types.GETTER_FORGET_PASSWORD_DEFAULT]: function (state) {
    return state.payload.forgetPassword
  },

  [types.GETTER_ACCOUNT_RECOVER_DEFAULT]: function (state) {
    return state.payload.recoverToken
  },

  [types.GETTER_ACCOUNT_ACTIVATION_DEFAULT]: function (state) {
    return state.payload.activationToken
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
