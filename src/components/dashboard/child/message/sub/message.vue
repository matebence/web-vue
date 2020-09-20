<template>
  <div id="message">
    <div id="message-header">
      <h1>{{onSelectedParticipants.status.userName}}
        <span
          :class="{
            online: onSelectedParticipants.status.state === 'ONLINE',
            offline: onSelectedParticipants.status.state === 'OFFLINE'
          }"></span>
      </h1>
    </div>
    <div
      v-show="activeEl.conversationId !== 0"
      id="message-panel"
      ref="messagePanel">
      <div
        class="text"
        :key="item.communicationId"
        v-for="item in communicationSearch">
        <p
          :class="{
            sender: accountData.accountId === item.sender,
            receiver: accountData.accountId !== item.sender
          }">{{item.content}}</p>
      </div>
    </div>
    <div id="message-form">
      <form>
        <div class="form-input">
          <input
            type="text"
            name="message"
            id="text-message"
            autocomplete="off"
            v-model="appMessage.form.conversation"
            placeholder="Napíšte správu...">
        </div>
        <div class="form-input">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="activeEl.conversationId === 0"
            @click.prevent="onSend">
            Poslať
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import WebSocket from '@/websocket/index'
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    beforeDestroy: function () {
      this.activeEl.conversationId = 0
    },
    props: ['accountData', 'appMessage', 'activeEl'],
    name: 'message',
    data: function () {
      return {}
    },
    watch: {
      'activeEl.conversationId': function (newValue, oldValue) {
        if (this.activeEl.conversationId === 0) return
        return this.$store.dispatch(types.ACTION_COMMUNICATION_SEARCH, {'conversations.conversationId': newValue})
          .then(result => {
            const messageDisplay = this.$refs.messagePanel
            messageDisplay.scrollTop = messageDisplay.scrollHeight
            return this.onSelectedParticipants
          })
          .catch(err => console.warn(err.message))
      }
    },
    computed: {
      onSelectedConversation: function () {
        if (this.activeEl.conversationId === 0) {
          return {
            status: {
              userName: 'Používateľ',
              state: process.env.APP_STATUS_OFFLINE
            }
          }
        }
        return Object.values(this.conversationSearch).filter(a => a.conversationId === this.activeEl.conversationId).pop()
      },
      onSelectedParticipants: function () {
        if (this.activeEl.conversationId === 0) {
          return {
            status: {
              userName: 'Používateľ',
              state: process.env.APP_STATUS_OFFLINE
            }
          }
        }
        return Object.values(this.conversationSearch).filter(a => a.conversationId === this.activeEl.conversationId).pop().participants.filter(b => b.accountId !== this.accountData.accountId).pop()
      },
      ...mapGetters({
        conversationSearch: types.GETTER_CONVERSATION_DATA_SEARCH,
        communicationSearch: types.GETTER_COMMUNICATION_DATA_SEARCH
      })
    },
    methods: {
      onSend: function () {
        if (this.appMessage.form.conversation.length < 3) return
        WebSocket.data.stompClient.send(`${process.env.WEBSOCKET_PREFIX}${process.env.WEBSOCKET_COMMUNICATION_CHANEL}/${this.onSelectedConversation.conversationId}${process.env.WEBSOCKET_COMMUNICATION_CHANEL_POSTFIX}`, JSON.stringify({
          communications: {
            userName: this.accountData.userName,
            sender: this.accountData.accountId,
            content: this.appMessage.form.conversation,
            conversations: {
              conversationId: this.onSelectedConversation.conversationId,
              participants: [{
                accountId: this.accountData.accountId,
                status: {
                  statusId: this.accountData.status,
                  userName: this.accountData.userName
                }
              }, {
                accountId: this.onSelectedParticipants.accountId,
                status: {
                  statusId: this.onSelectedParticipants.status.statusId,
                  userName: this.onSelectedParticipants.status.userName
                }
              }]
            }
          },
          accessToken: {
            token: this.accountData.accessToken
          }
        }, {}))

        this.appMessage.form.conversation = ''
      }
    }
  }
</script>

<style scoped>
  div#message div#message-header {
    position: absolute;
    width: 100%;
    z-index: 2;
    border-top-left-radius: 3rem;
    border-bottom: solid 0.01rem #868686;
    background-color: #ffffff;
  }

  div#message div#message-header h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#message div#message-header h1 span.online {
    height: 1rem;
    width: 1rem;
    background-color: #58bb19;
    border-radius: 50%;
    display: inline-block;
  }

  div#message div#message-header h1 span.offline {
    height: 1rem;
    width: 1rem;
    background-color: #ff0000;
    border-radius: 50%;
    display: inline-block;
  }

  div#message div#message-panel {
    overflow: auto;
    height: 70%;
    width: 100%;
    position: absolute;
    z-index: 1;
    bottom: 8rem;
  }

  div#message div#message-panel div.text {
    margin-left: 2rem;
    margin-right: 2rem;
    clear: both;
  }

  div#message div#message-panel div.text p {
    width: 20rem;
    padding: 1rem;
    font-size: 0.9em;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }

  div#message div#message-panel div.text p.sender {
    float: right;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    background-color: #187fb1;
  }

  div#message div#message-panel div.text p.receiver {
    float: left;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: #176c9d;
  }

  div#message div#message-form {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  div#message div#message-form form div.form-input {
    display: inline;
  }

  div#message div#message-form form div.form-input button {
    position: absolute;
    left: calc(93% - 7.3rem);
    top: 5%;
    width: 7rem;
    height: 2.5rem;
    margin-left: 2rem;
    border-radius: 0.7rem;
    border: none;
    background-color: #176c9d;
  }

  div#message div#message-form form div.form-input button:hover {
    background-color: #187fb1;
  }

  div#message div#message-form form div.form-input input {
    position: relative;
    width: 93%;
    height: 2.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    padding-left: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 0.9em;
    border-radius: 0.7rem;
    border: solid 0.01rem #a1a1a1;
  }
</style>
