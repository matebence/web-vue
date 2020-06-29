import Vue from 'vue'
import VueRouter from 'vue-router'

const auth = resolve => {
  require.ensure(['@/components/auth/auth'], () => {
    resolve(require('@/components/auth/auth'))
  }, 'auth')
}

Vue.use(VueRouter)

const routes = [
  { path: '/', component: auth }
]

export default new VueRouter({mode: 'history', routes})
