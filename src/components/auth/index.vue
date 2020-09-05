<template>
  <div id="auth">
    <div id="wrapper">
      <div id="hero-video">
        <video autoplay loop muted playsinline src="@/assets/video/hero-video.mp4"/>
        <div id="form">
          <keep-alive>
            <component
              :activeEl="components.appAuth.activeEl"
              :is="components.appAuth.activeEl.component"
              :appSignIn="components.appAuth.sub.appSignIn"
              :appSignUp="components.appAuth.sub.appSignUp"
              :appForgetPassword="components.appAuth.sub.appForgetPassword" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'
import signIn from '@/components/auth/sub/signIn'
import signUp from '@/components/auth/sub/signUp'
import signOut from '@/components/auth/sub/signOut'
import forgetPass from '@/components/auth/sub/forgetPass'

export default {
  created: function () {
    return this.navigateContent(this.$route.params.component)
  },
  beforeMount: function () {
    this.$store.commit(types.MUTATIONS_CLEAR_SIGN_UP_ERRORS, {})
    this.$store.commit(types.MUTATIONS_CLEAR_SIGN_IN_ERRORS, {})
    this.$store.commit(types.MUTATIONS_CLEAR_FORGET_PASSWORD_ERRORS, {})
  },
  name: 'auth',
  data: function () {
    return {
      components: {
        appAuth: {
          sub: {
            appSignIn: {
              form: {
                values: {
                  userName: null,
                  password: null,
                  stayLoggedIn: false
                }
              },
              alert: {
                condition: [],
                type: [],
                text: []
              }
            },
            appSignUp: {
              form: {
                values: {
                  userName: null,
                  email: null,
                  password: null,
                  confirmPassword: null,
                  roles: '{}'
                }
              },
              url: {
                url: {
                  values: {
                    id: this.$route.params.id,
                    key: this.$route.params.key
                  }
                }
              },
              alert: {
                condition: [],
                type: [],
                text: []
              }
            },
            appForgetPassword: {
              form: {
                values: {
                  email: null
                }
              },
              url: {
                url: {
                  values: {
                    id: this.$route.params.id,
                    key: this.$route.params.key
                  }
                }
              },
              alert: {
                condition: [],
                type: [],
                text: []
              }
            }
          },
          activeEl: {
            component: 'app-sign-in'
          }
        }
      }
    }
  },
  components: {
    appSignUp: signUp,
    appSignIn: signIn,
    appSignOut: signOut,
    appForgetPassword: forgetPass
  },
  watch: {
    '$route': function (to, from) {
      return this.navigateContent(to.params.component)
    }
  },
  methods: {
    navigateContent: function (componenet = 'sign-in') {
      if (!['sign-in', 'sign-out', 'sign-up', 'forget-password'].includes(componenet)) {
        this.$router.push({name: 'error'})
        return
      }
      this.components.appAuth.activeEl.component = `app-${componenet}`
    }
  }
}
</script>

<style scoped>
  div#auth div#wrapper {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    z-index: 1;
  }

  div#auth div#hero-video:before {
    content:"";
    z-index:1;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background:linear-gradient(to right, rgba(23, 108, 157, 0.81), rgba(38, 176, 255, 0.38));
  }

  div#auth div#hero-video {
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  div#auth div#form {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
    width: 35vw;
    height: 98vh;
    transform: translate(0%, -50%);
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 5rem;
    background: #ffffff;
    max-height: 100vh;
    overflow: auto;
  }

  @media (max-width: 1230px) {
    div#auth div#form {
      padding-left: 10rem;
      padding-right: 10rem;
      z-index: 999;
      width: 100vw;
      height: 100%;
      border-radius: 0;
      background: #ffffff;
    }
  }

  @media (max-width: 992px) {
    div#auth div#form {
      height: inherit;
      padding-left: 7rem;
      padding-right: 7rem;
    }
  }

  @media (max-width: 768px) {
    div#auth div#form {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }

  @media (max-width: 576px) {
    div#auth div#form {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
