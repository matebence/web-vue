import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  data: {
    sockClient: null,
    stompClient: null
  },
  onInitialize: function (onConnected) {
    this.data.sockClient = new SockJS(process.env.HOST_BLESK_WEBSOCKET)
    this.data.stompClient = Stomp.over(this.data.sockClient)
    this.data.stompClient.connect({}, onConnected, this.onDisconnected)
  },
  onDisconnected: function () {
    console.warn('Websocket pripojenie zlyhalo')
  }
}
