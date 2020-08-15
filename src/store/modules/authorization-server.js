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

  [types.MUTATIONS_CLEAR_SIGN_IN_ERRORS]: function (state, data) {
    state.payload.signIn = {
      ...state.payload.signIn,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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

  [types.MUTATIONS_CLEAR_SIGN_UP_ERRORS]: function (state, data) {
    state.payload.signUp = {
      ...state.payload.signUp,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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

  [types.MUTATIONS_CLEAR_SIGN_OUT_ERRORS]: function (state, data) {
    state.payload.signOut = {
      ...state.payload.signOut,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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

  [types.MUTATIONS_CLEAR_FORGET_PASSWORD_ERRORS]: function (state, data) {
    state.payload.forgetPassword = {
      ...state.payload.forgetPassword,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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

  [types.MUTATIONS_CLEAR_ACCOUNT_RECOVER_ERRORS]: function (state, data) {
    state.payload.recoverToken = {
      ...state.payload.recoverToken,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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

  [types.MUTATIONS_CLEAR_ACCOUNT_ACTIVATION_ERRORS]: function (state, data) {
    state.payload.activationToken = {
      ...state.payload.activationToken,
      error: {
        is: false,
        message: null,
        reason: {
        }
      },
      done: true
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
    const timeout = setTimeout(function () {
      if (state.payload.signIn.data.stayLoggedIn) {
        dispatch(types.ACTION_REFRESH_AUTH, {
          grantType: process.env.GRANT_TYPE_REFRESH_TOKEN,
          refreshToken: state.payload.signIn.data.refreshToken
        })
      } else {
        if (!state.payload.signIn.data.accessToken) return clearTimeout(timeout)
        dispatch(types.ACTION_SIGN_OUT, {
          accessToken: state.payload.signIn.data.accessToken
        })
      }
    }, payload * 1000)
    return timeout
  },

  [types.ACTION_SETUP_AVATAR]: function ({commit, dispatch, state, rootState}, payload) {
    if (localStorage.getItem('avatar') === null) {
      localStorage.setItem('avatar', `${payload.firstName.substr(0, 1)}${payload.lastName.substr(0, 1)}`)
    }
    return localStorage.getItem('avatar')
  },

  [types.ACTION_CHECK_BALANCE]: function ({commit, dispatch, state, rootState}, payload) {
    if (localStorage.getItem('balance') === null) {
      localStorage.setItem('balance', Number(payload.balance))
    }
    return localStorage.getItem('balance')
  },

  [types.ACTION_CHECK_PROFILE]: function ({commit, dispatch, state, rootState}, payload) {
    dispatch(types.ACTION_USER_GET, rootState.authorization.payload.signIn.data.accountId).then(result => {
      return Promise.all([
        dispatch(types.ACTION_SETUP_AVATAR, {...result}),
        dispatch(types.ACTION_CHECK_BALANCE, {...result})
      ])
    }).catch(err => {
      return console.log(`${err} presmeruj na user profil setup screen`)
    })
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
    dispatch(types.ACTION_START_AUTH_TIMER, Number(new Date(localStorage.getItem('expirationDate')).getTime() / 1000) - Number(new Date().getTime() / 1000))
    dispatch(types.ACTION_CHECK_PROFILE)
    router.push({path: '/dashboard'})
  },

  [types.ACTION_SIGN_IN]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATIONS_SIGN_IN_DATA, {done: false})
    return this._vm.$resource('{service}/signin', {}, {
      performSignIn: {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`
        }
      }
    }, {
      emulateJSON: true
    }).performSignIn({service: 'authorization-server'}, {grant_type: payload.grantType, username: payload.userName, password: payload.password})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        const jwt = VueJwtDecode.decode(parsed.access_token)
        const accountData = {
          accessToken: parsed.access_token,
          refreshToken: parsed.refresh_token,
          expiresIn: parsed.expires_in,
          userName: parsed.user_name,
          authorities: jwt.authorities,
          accountId: parsed.account_id,
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

        dispatch(types.ACTION_CHECK_PROFILE)
        dispatch(types.ACTION_START_AUTH_TIMER, parsed.expires_in)
        router.push({path: '/dashboard'})
        return state.payload.signIn.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATIONS_SIGN_IN_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              },
              done: true
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_REFRESH_AUTH]: function ({commit, dispatch, state, rootState}, payload) {
    return this._vm.$resource('{service}/signin', {}, {
      refreshAuthorizationToken: {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`
        }
      }
    }, {
      emulateJSON: true
    }).refreshAuthorizationToken({service: 'authorization-server'}, {grant_type: payload.grantType, refresh_token: payload.refreshToken})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        const jwt = VueJwtDecode.decode(parsed.access_token)
        const accountData = {
          accessToken: parsed.access_token,
          refreshToken: parsed.refresh_token,
          expiresIn: parsed.expires_in,
          userName: parsed.user_name,
          authorities: jwt.authorities,
          accountId: parsed.account_id,
          stayLoggedIn: state.payload.signIn.data.stayLoggedIn
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
        return state.payload.signIn.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATIONS_SIGN_IN_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              },
              done: true
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_SIGN_UP]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_SIGN_UP_DATA, {done: false})
    return this._vm.$resource('{service}/signup', {}, {
      performSignUp: {
        method: 'POST'
      }
    }).performSignUp({service: 'authorization-server'}, {userName: payload.userName, email: payload.email, password: payload.password, confirmPassword: payload.confirmPassword, accountRoles: [{roles: payload.roles}]})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
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
        return state.payload.signUp.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_SIGN_UP_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: parsed.reason
              },
              done: true
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_SIGN_OUT]: function ({commit, dispatch, state, rootState}, payload) {
    return this._vm.$resource('{service}/signout', {}, {
      performSignOut: {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.payload.signIn.data.accessToken}`
        }
      }
    }).performSignOut({service: 'authorization-server'})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        localStorage.removeItem('avatar')
        localStorage.removeItem('balance')
        localStorage.removeItem('position')
        localStorage.removeItem('accountData')
        localStorage.removeItem('expirationDate')

        commit(types.MUTATIONS_CLEAR_USER_DATA, {})
        commit(types.MUTATIONS_CLEAR_PARCEL_DATA, {})
        commit(types.MUTATIONS_CLEAR_SIGN_IN_DATA, {})

        commit(types.MUTATION_SIGN_OUT_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
        router.push({path: '/sign-in'})
        return state.payload.signOut.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_SIGN_OUT_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              },
              done: true
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_FORGET_PASSWORD]: function ({commit, dispatch, state, rootState}, payload) {
    commit(types.MUTATION_FORGET_PASSWORD_DATA, { done: false })
    return this._vm.$resource('{service}/forgetpassword', {}, {
      recoverPassword: {
        method: 'POST'}
    }).recoverPassword({service: 'authorization-server'}, {email: payload.email})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_FORGET_PASSWORD_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          },
          done: true
        })
        return state.payload.forgetPassword.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_FORGET_PASSWORD_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              },
              done: true
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_ACCOUNT_RECOVER]: function ({commit, dispatch, state, rootState}, payload) {
    return this._vm.$resource('{service}/forgetpassword/{account}/{id}/{token}/{key}', {}, {
      verifyRecoverToken: {
        method: 'GET'}
    }).verifyRecoverToken({service: 'authorization-server', account: 'account', id: payload.id, token: 'token', key: payload.key})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_ACCOUNT_RECOVER_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          }
        })
        return state.payload.recoverToken.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_ACCOUNT_RECOVER_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              }
            })
            throw parsed.message
          })
      })
  },

  [types.ACTION_ACCOUNT_ACTIVATION]: function ({commit, dispatch, state, rootState}, payload) {
    return this._vm.$resource('{service}/signup/{account}/{id}/{token}/{key}', {}, {
      verifyActivationToken: {
        method: 'GET' }
    }).verifyActivationToken({service: 'authorization-server', account: 'account', id: payload.id, token: 'token', key: payload.key})
      .then(response => {
        return response.json()
      })
      .then(parsed => {
        commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
          error: {
            is: parsed.error,
            message: parsed.message
          }
        })
        return state.payload.activationToken.data
      })
      .catch(err => {
        return err.json()
          .then(parsed => {
            commit(types.MUTATION_ACCOUNT_ACTIVATION_DATA, {
              error: {
                is: parsed.error,
                message: parsed.message,
                reason: {
                }
              }
            })
            throw parsed.message
          })
      })
  }
}

const getters = {
  [types.GETTER_SIGN_IN_IS_AUTH]: function (state) {
    return state.payload.signIn.data.accessToken !== null
  },

  [types.GETTER_SIGN_IN_GET_ROLE]: function (state) {
    return state.payload.signIn.data.authorities
  },

  [types.GETTER_SIGN_IN_DATA]: function (state) {
    return state.payload.signIn.data
  },

  [types.GETTER_SIGN_IN_DONE]: function (state) {
    return state.payload.signIn.done
  },

  [types.GETTER_SIGN_IN_ERROR]: function (state) {
    return state.payload.signIn.error
  },

  [types.GETTER_SIGN_UP_DATA]: function (state) {
    return state.payload.signUp.data
  },

  [types.GETTER_SIGN_UP_DONE]: function (state) {
    return state.payload.signUp.done
  },

  [types.GETTER_SIGN_UP_ERROR]: function (state) {
    return state.payload.signUp.error
  },

  [types.GETTER_SIGN_OUT_DATA]: function (state) {
    return state.payload.signOut.data
  },

  [types.GETTER_SIGN_OUT_DONE]: function (state) {
    return state.payload.signOut.done
  },

  [types.GETTER_SIGN_OUT_ERROR]: function (state) {
    return state.payload.signOut.error
  },

  [types.GETTER_FORGET_PASSWORD_DATA]: function (state) {
    return state.payload.forgetPassword.data
  },

  [types.GETTER_FORGET_PASSWORD_DONE]: function (state) {
    return state.payload.forgetPassword.done
  },

  [types.GETTER_FORGET_PASSWORD_ERROR]: function (state) {
    return state.payload.forgetPassword.error
  },

  [types.GETTER_ACCOUNT_RECOVER_DATA]: function (state) {
    return state.payload.recoverToken.data
  },

  [types.GETTER_ACCOUNT_RECOVER_DONE]: function (state) {
    return state.payload.recoverToken.done
  },

  [types.GETTER_ACCOUNT_RECOVER_ERROR]: function (state) {
    return state.payload.recoverToken.error
  },

  [types.GETTER_ACCOUNT_ACTIVATION_DATA]: function (state) {
    return state.payload.activationToken.data
  },

  [types.GETTER_ACCOUNT_ACTIVATION_DONE]: function (state) {
    return state.payload.activationToken.done
  },

  [types.GETTER_ACCOUNT_ACTIVATION_ERROR]: function (state) {
    return state.payload.activationToken.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
