import Vue from 'vue'
import VueRouter from 'vue-router'

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

Vue.use(VueRouter)

const routes = [
  {path: '/',
    component: auth,
    name: 'welcome',
    children: [
      {path: ':component', component: auth},
      {path: ':component/account/:id/token/:key', component: auth}
    ]},
  {path: '*',
    component: error,
    name: 'error'
  }
]

export default new VueRouter({mode: 'history', routes})
