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
  require.ensure(['@/components/dashboard/child/parcel/index'], () => {
    resolve(require('@/components/dashboard/child/parcel/index'))
  }, 'parcel')
}

const client = resolve => {
  require.ensure(['@/components/dashboard/child/client/index'], () => {
    resolve(require('@/components/dashboard/child/client/index'))
  }, 'client')
}

const message = resolve => {
  require.ensure(['@/components/dashboard/child/message/index'], () => {
    resolve(require('@/components/dashboard/child/message/index'))
  }, 'message')
}

const shipment = resolve => {
  require.ensure(['@/components/dashboard/child/shipment/index'], () => {
    resolve(require('@/components/dashboard/child/shipment/index'))
  }, 'shipment')
}

const vehicle = resolve => {
  require.ensure(['@/components/dashboard/child/vehicle/index'], () => {
    resolve(require('@/components/dashboard/child/vehicle/index'))
  }, 'vehicle')
}

const profile = resolve => {
  require.ensure(['@/components/dashboard/child/profile/index'], () => {
    resolve(require('@/components/dashboard/child/profile/index'))
  }, 'profile')
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
      return store.state.authorization.payload.signIn.data.accessToken ? next() : next('/sign-in')
    },
    children: [
      {
        path: 'parcel',
        name: 'parcel',
        component: parcel,
        beforeEnter: function (to, from, next) {
          return store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_CLIENT) ? next() : next('/sign-in')
        }
      }, {
        path: 'client',
        name: 'client',
        component: client,
        beforeEnter: function (to, from, next) {
          return store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_COURIER) ? next() : next('/sign-in')
        }
      }, {
        path: 'vehicle',
        name: 'vehicle',
        component: vehicle,
        beforeEnter: function (to, from, next) {
          return store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_COURIER) ? next() : next('/sign-in')
        }
      }, {
        path: 'message',
        name: 'message',
        component: message,
        beforeEnter: function (to, from, next) {
          return (store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_CLIENT) || store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_COURIER)) ? next() : next('/sign-in')
        }
      }, {
        path: 'shipment',
        name: 'shipment',
        component: shipment,
        beforeEnter: function (to, from, next) {
          return store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_CLIENT) ? next() : next('/sign-in')
        }
      }, {
        path: 'profile',
        name: 'profile',
        component: profile,
        beforeEnter: function (to, from, next) {
          return (store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_CLIENT) || store.state.authorization.payload.signIn.data.authorities.includes(process.env.APP_ROLE_COURIER)) ? next() : next('/sign-in')
        }
      }
    ]
  }, {
    path: '/',
    component: auth,
    name: 'welcome',
    children: [
      {
        path: ':component',
        component: auth
      }, {
        path: ':component/account/:id/token/:key',
        component: auth
      }
    ]
  }, {
    path: '*',
    component: error,
    name: 'error'
  }
]

export default new VueRouter({mode: 'history', routes})
