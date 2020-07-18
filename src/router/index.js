import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const dashboard = resolve => {
  require.ensure(['@/components/dashboard/dashboard'], () => {
    resolve(require('@/components/dashboard/dashboard'))
  }, 'dashboard')
}

const parcel = resolve => {
  require.ensure(['@/components/dashboard/child/parcel'], () => {
    resolve(require('@/components/dashboard/child/parcel'))
  }, 'parcel')
}

const auth = resolve => {
  require.ensure(['@/components/auth/auth'], () => {
    resolve(require('@/components/auth/auth'))
  }, 'auth')
}

const error = resolve => {
  require.ensure(['@/components/error/error'], () => {
    resolve(require('@/components/error/error'))
  }, 'error')
}

const routes = [
  {path: '/dashboard',
    component: dashboard,
    name: 'dashboard',
    beforeEnter: function (to, from, next) {
      if (store.state.authorization.payload.signIn.data.accessToken) return next()
      return next('/sign-in')
    },
    children: [
      {path: 'parcel', name: 'parcel', component: parcel}]},

  {path: '/',
    component: auth,
    name: 'welcome',
    children: [
      {path: ':component', component: auth},
      {path: ':component/account/:id/token/:key', component: auth}]},

  {path: '*',
    component: error,
    name: 'error'
  }
]

export default new VueRouter({mode: 'history', routes})
