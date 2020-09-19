<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <app-navigation
            :appNavigation="components.appDashboard.sub.appNavigation"
            :activeEl="components.appDashboard.activeEl" />
        </div>
        <div class="col-lg-11 col-xl-10" id="wrapper">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import WebSocket from '@/websocket/index'

import navigation from '@/components/dashboard/sub/navigation'

export default {
  created: function () {
    if (this.userProfile.userId === undefined) {
      this.components.appDashboard.activeEl = {itemId: 6, value: 'Nastavenia'}
      this.$router.push({path: '/dashboard/settings'})
    } else if (this.allowedRoles.includes(process.env.APP_ROLE_CLIENT)) {
      this.components.appDashboard.activeEl = {itemId: 1, value: 'Balíky'}
      this.$router.push({path: '/dashboard/parcel'})
    } else if ([...this.allowedRoles].includes(process.env.APP_ROLE_COURIER)) {
      this.components.appDashboard.activeEl = {itemId: 3, value: 'Klienti'}
      this.$router.push({path: '/dashboard/client'})
    } else {
      this.$router.push({path: '/sign-out'})
    }
  },
  beforeMount: function () {
    let accountData = localStorage.getItem('accountData')
    let browserData = localStorage.getItem('browserData')

    if (!accountData || !browserData) return
    this.components.appDashboard.data.account = JSON.parse(accountData)
    this.components.appDashboard.data.browser = JSON.parse(browserData)

    return this.$store.dispatch(types.ACTION_CONVERSATION_SEARCH, {'participants.accountId': this.components.appDashboard.data.account.accountId})
      .then(result => { this.components.appDashboard.data.conversation.search = result })
      .catch(err => console.warn(err.message))
  },
  mounted: function () {
    WebSocket.onInitialize(this.onConnected)
  },
  name: 'dashboard',
  data: function () {
    return {
      components: {
        appDashboard: {
          sub: {
            appNavigation: {
              items: [
                {
                  itemId: 1,
                  value: 'Balíky',
                  route: 'parcel',
                  optional: {
                    icon: 'box-open',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_CLIENT]
                  }
                }, {
                  itemId: 2,
                  value: 'Zásielky',
                  route: 'shipment',
                  optional: {
                    icon: 'shipping-fast',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_CLIENT]
                  }
                }, {
                  itemId: 3,
                  value: 'Klienti',
                  route: 'client',
                  optional: {
                    icon: 'users',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_COURIER]
                  }
                }, {
                  itemId: 4,
                  value: 'Vozidlá',
                  route: 'vehicle',
                  optional: {
                    icon: 'car',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_COURIER]
                  }
                }, {
                  itemId: 5,
                  value: 'Správy',
                  route: 'message',
                  optional: {
                    icon: 'comment-dots',
                    badge: 'Nové'
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
                  }
                }, {
                  itemId: 6,
                  value: 'Nastavenia',
                  route: 'settings',
                  optional: {
                    icon: 'cog',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
                  }
                }, {
                  itemId: 7,
                  value: 'Odhlásiť sa',
                  route: '/sign-out',
                  optional: {
                    icon: 'sign-out-alt',
                    badge: ''
                  },
                  isVisible: {
                    for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
                  }
                }
              ]
            }
          },
          data: {
            conversation: {
              search: {
              }
            },
            account: {
            },
            browser: {
            }
          },
          activeEl: {
          }
        }
      }
    }
  },
  components: {
    appNavigation: navigation
  },
  computed: {
    ...mapGetters({
      userProfile: types.GETTER_USER_DATA_GET,
      allowedRoles: types.GETTER_SIGN_IN_GET_ROLE,
      conversationData: types.GETTER_CONVERSATION_DATA
    })
  },
  methods: {
    onConnected: function () {
      WebSocket.data.stompClient.subscribe(`/status`, this.onPayload)
      WebSocket.data.stompClient.send(`/websocket-service/state`, JSON.stringify({status: {userName: this.components.appDashboard.data.account.userName, state: process.env.APP_STATUS_ONLINE, token: this.components.appDashboard.data.browser.browserId}, accessToken: {token: this.components.appDashboard.data.account.accessToken}}, {}))
    },
    onPayload: function (payload) {
      if (!payload) return
      payload = JSON.parse(payload.body)

      if (this.components.appDashboard.data.account.userName === payload.userName) {
        localStorage.setItem('accountData', JSON.stringify({...this.components.appDashboard.data.account, status: payload.statusId}))
      } else {
        let userStatusChange = Object.values(this.components.appDashboard.data.conversation.search).filter(a => a.participants.filter(b => b.status.statusId === payload.statusId)).pop()
        if (!userStatusChange) return

        userStatusChange = {...userStatusChange, participants: userStatusChange.participants.map(e => ({...e, status: {...e.status, state: payload.state}}))}
        let data = Object.values(this.components.appDashboard.data.conversation.search).filter(e => e.conversationId !== userStatusChange.conversationId)
        data.push(userStatusChange)

        this.$store.commit(types.MUTATION_CONVERSATION_DATA, {
          data: {
            ...this.conversationData,
            search: {
              ...data
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  div#dashboard {
    background: #176c9d;
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  div#dashboard div#wrapper {
    border: 0.3rem #176c9d solid;
    border-radius: 3rem;
    background: #f1f1f1;
  }

  div#dashboard div#navigation {
    width: 100%;
    height: 98vh;
  }

  div#dashboard div#navigation {
    background: #176c9d;
  }
</style>
