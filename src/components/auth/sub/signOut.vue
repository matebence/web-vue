<template>
  <div id="signout">
  </div>
</template>

<script>
  import WebSocket from '@/websocket/index'
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    created: function () {
      if (this.signIn.accessToken === undefined || WebSocket.data.sockClient === null) {
        return this.$router.push({name: 'welcome', path: 'sign-in'})
      }

      WebSocket.data.sockClient.close()
      WebSocket.data.sockClient = null
      WebSocket.data.stompClient = null
    },
    beforeMount: function () {
      return this.$store.dispatch(types.ACTION_SIGN_OUT, {accessToken: this.signIn.accessToken})
        .catch(err => console.warn(err.message))
    },
    name: 'signout',
    data: function () {
      return {}
    },
    computed: {
      ...mapGetters({
        signIn: types.GETTER_SIGN_IN_DATA
      })
    }
  }
</script>

<style scoped>
</style>
