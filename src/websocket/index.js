import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import CryptoJS from 'crypto-js'
import store from '@/store'

import * as types from '@/store/types'

const WebSocket = {
  data: {
    account: null,
    browser: null,
    sockClient: null,
    stompClient: null
  },

  onInitialize: function () {
    this.data.sockClient = new SockJS(process.env.HOST_BLESK_WEBSOCKET)
    this.data.stompClient = Stomp.over(this.data.sockClient)
    this.data.stompClient.connect({}, this.onConnected, this.onDisconnected)

    let accountData = localStorage.getItem(process.env.LOCAL_STORAGE_ACCOUNT_DATA)
    let browserData = localStorage.getItem(process.env.LOCAL_STORAGE_BROWSER_DATA)

    if (!accountData || !browserData) return
    this.data.account = JSON.parse(accountData)
    this.data.browser = JSON.parse(browserData)

    return store.dispatch(types.ACTION_CONVERSATION_SEARCH, {'participants.accountId': this.data.account.accountId})
      .catch(err => console.warn(err.message))
  },

  onDisconnected: function () {
    console.warn('Websocket pripojenie zlyhalo')
  },

  onConnected: function () {
    WebSocket.data.stompClient.subscribe(`${process.env.WEBSOCKET_STATUS_ENDPOINT}`, WebSocket.onStateListener)
    WebSocket.data.stompClient.subscribe(`${process.env.WEBSOCKET_CONVERSATION_ENDPOINT}/${CryptoJS.MD5(WebSocket.data.account.userName).toString()}`, WebSocket.onConversationListener)

    return WebSocket.data.stompClient.send(`${process.env.WEBSOCKET_PREFIX}${process.env.WEBSOCKET_STATUS_CHANEL}`, JSON.stringify({
      status: {
        userName: WebSocket.data.account.userName,
        state: process.env.APP_STATUS_ONLINE,
        token: WebSocket.data.browser.browserId
      },
      accessToken: {token: WebSocket.data.account.accessToken}
    }, {}))
  },

  onStateListener: function (payload) {
    if (!payload) return
    payload = JSON.parse(payload.body)
    return WebSocket.data.account.userName === payload.userName ? WebSocket.onCommunicationSubscribe(payload) : WebSocket.onParticipantUpdate(payload)
  },

  onConversationListener: function (payload) {
    if (!payload) return
    payload = JSON.parse(payload.body)

    return store.dispatch(types.ACTION_CONVERSATION_GET, payload.conversationId)
      .then(result => {
        let data = Object.values(store.state.messaging.payload.conversation.data.search)
        data.push(result)
        store.commit(types.MUTATION_CONVERSATION_DATA, {
          data: {
            ...store.state.messaging.payload.conversation.data,
            search: {
              ...data
            }
          }
        })
        return WebSocket.data.stompClient.subscribe(`${process.env.WEBSOCKET_COMMUNICATION_ENDPOINT}/${payload.conversationId}`, WebSocket.onCommunicationListener)
      })
      .catch(err => console.warn(err.message))
  },

  onCommunicationListener: function (payload) {
    if (!payload) return
    payload = JSON.parse(payload.body)

    let data = Object.values(store.state.messaging.payload.communication.data.search)
    data.push(payload)
    store.commit(types.MUTATION_COMMUNICATION_DATA, {
      data: {
        ...store.state.messaging.payload.communication.data,
        search: {
          ...data
        }
      }
    })
  },

  onParticipantUpdate: function (payload) {
    let userStatusChange = Object.values(store.state.messaging.payload.conversation.data.search).filter(a => a.participants.filter(b => b.status.statusId === payload.statusId)).pop()
    if (!userStatusChange) return

    userStatusChange = {
      ...userStatusChange,
      participants: userStatusChange.participants.map(e => ({...e, status: {...e.status, state: payload.state}}))
    }
    let data = Object.values(store.state.messaging.payload.conversation.data.search).filter(e => e.conversationId !== userStatusChange.conversationId)
    data.push(userStatusChange)

    return store.commit(types.MUTATION_CONVERSATION_DATA, {
      data: {
        ...store.state.messaging.payload.conversation.data,
        search: {
          ...data
        }
      }
    })
  },

  onCommunicationSubscribe: function (payload) {
    localStorage.setItem(process.env.LOCAL_STORAGE_ACCOUNT_DATA, JSON.stringify({
      ...this.data.account,
      status: payload.statusId
    }))
    return Object.values(store.state.messaging.payload.conversation.data.search).forEach(e => this.data.stompClient.subscribe(`/communication/${e.conversationId}`, this.onCommunicationListener))
  }
}

export default WebSocket
