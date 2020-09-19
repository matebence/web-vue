<template>
  <div id="verticalList">
    <h1>Správy</h1>
    <form id="searchForm">
      <div class="form-input">
        <font-awesome-icon :icon="['fas', 'search']"/>
        <input
          type="text"
          name="search"
          id="search"
          autocomplete="off"
          @blur="onClearParticipent()"
          @focus="onAutoCompleteParticipent('')"
          placeholder="Zadajte používateľské meno"
          @input="onAutoCompleteParticipent($event.target.value)">
      </div>
    </form>
    <ul
      id="searchList"
      class="participents">
      <li
        :key="item.userId"
        v-for="item in userData.search"
        @click.prevent="onSelectedParticipent(item)">
        <ul class="participent">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'user-plus']"/>
          </li>
          <li class="summary">
            <ul>
              <li class="userName">{{item.userName}}</li>
              <li class="country">{{item.places.country}}</li>
              <li class="region">{{item.places.region}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        class="empty-list"
        v-show="!appVerticalList.form.visible"
        v-if="(Object.keys(userData.search).length === 0)">
        Zoznam je prázdny
      </li>
    </ul>
    <ul
      class="participents"
      id="conversationList"
      v-show="appVerticalList.form.visible">
      <li
        :key="item.conversationId"
        v-for="item in conversationSearch"
        @click.prevent="onSelectedConversation(item)"
        :class="{active: activeEl.conversationId === item.conversationId}">
        <ul class="participent">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'user']"/>
          </li>
          <li class="summary">
            <ul>
              <li class="userName">{{formatUsername(item.participants)}}</li>
              <li class="state">{{formatState(item.participants)}}</li>
              <li class="createdAt">{{formatDate(item.participants)}} {{formatTime(item.participants)}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        class="empty-list"
        v-if="(Object.keys(conversationSearch).length === 0)">
        Zoznam je prázdny
      </li>
    </ul>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import {mapGetters} from 'vuex'
  import * as types from '@/store/types'
  import WebSocket from '@/websocket/index'

  export default {
    name: 'verticalList',
    props: ['userData', 'accountData', 'appVerticalList', 'activeEl'],
    data: function () {
      return {}
    },
    computed: {
      ...mapGetters({
        conversationData: types.GETTER_CONVERSATION_DATA,
        conversationSearch: types.GETTER_CONVERSATION_DATA_SEARCH
      })
    },
    methods: {
      onAutoCompleteParticipent: function ($event) {
        this.activeEl.conversationId = 0
        this.appVerticalList.form.visible = false
        if ($event.length === 0) return this.onSearchParticipent({roles: this.onSearchParticipentCriteria()})
        if ($event.length < 3) return
        return this.onSearchParticipent({firstName: $event})
      },
      onSearchParticipent: function (obj) {
        return this.$store.dispatch(types.ACTION_USER_SEARCH, {roles: this.onSearchParticipentCriteria(), ...obj})
          .then(result => {
            if (Object.keys(this.conversationSearch).length === 0) {
              this.userData.search = Object.values(result)
            } else {
              const existingConversations = [].concat.apply([], Object.values(this.conversationSearch).map(a => a.participants)).filter(b => b.accountId !== this.accountData.accountId).map(c => c.accountId)
              this.userData.search = Object.values(result).filter(e => !existingConversations.includes(e.accountId))
            }
          })
          .catch(err => console.warn(err.message))
      },
      onSelectedParticipent: function (el) {
        return this.$store.dispatch(types.ACTION_STATUS_SEARCH, {userName: el.userName})
          .then(result => {
            if (!result) return
            result = Object.values(result).pop()
            return this.$store.dispatch(types.ACTION_CONVERSATION_CREATE, {
              participants: [{
                accountId: this.accountData.accountId,
                status: {statusId: this.accountData.status, userName: this.accountData.userName},
                lastConversionId: null,
                lastReadedConversionId: null
              }, {
                accountId: el.accountId,
                status: {statusId: result.statusId, state: result.state, userName: el.userName},
                lastConversionId: null,
                lastReadedConversionId: null
              }]
            })
          })
          .then(result => {
            let data = Object.values(this.conversationSearch)
            WebSocket.data.stompClient.send(`/websocket-service/conversation/${CryptoJS.MD5(el.userName).toString()}/sendConversation`, JSON.stringify({
              chanel: {
                from: this.accountData.userName,
                to: el.userName,
                conversationId: result.conversationId
              },
              accessToken: {
                token: this.accountData.accessToken
              }
            }, {}))

            data.push(result)
            this.$store.commit(types.MUTATION_CONVERSATION_DATA, {
              data: {
                ...this.conversationData,
                search: {
                  ...data
                }
              }
            })
          })
          .catch(err => console.warn(err.message))
      },
      onClearParticipent: function () {
        setTimeout(() => {
          this.appVerticalList.form.visible = true
          this.userData.search = []
        }, 200)
      },
      onSearchParticipentCriteria: function () {
        return this.accountData.authorities.find(e => true) === process.env.APP_ROLE_COURIER ? process.env.APP_ROLE_CLIENT : process.env.APP_ROLE_COURIER
      },
      onSelectedConversation: function (el) {
        this.activeEl.conversationId = el.conversationId
      },
      formatUsername: function (userName) {
        return userName.filter(e => e.accountId !== this.accountData.accountId).find(e => true).status.userName
      },
      formatState: function (state) {
        return state.filter(e => e.accountId !== this.accountData.accountId).find(e => true).status.state
      },
      formatDate: function (timestamp) {
        timestamp = timestamp.filter(e => e.accountId !== this.accountData.accountId).find(e => true).status.createdAt
        const date = new Date(timestamp)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      },
      formatTime: function (timestamp) {
        timestamp = timestamp.filter(e => e.accountId !== this.accountData.accountId).find(e => true).status.createdAt
        const time = new Date(timestamp)
        return `${time.getHours()}:${time.getMinutes()}`
      }
    }
  }
</script>

<style scoped>
  div#verticalList h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#verticalList form#searchForm {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div#verticalList form#searchForm div.form-input svg {
    position: absolute;
    left: 1.5rem;
    top: 5.4rem;
    color: #868686;
    z-index: 2;
  }

  div#verticalList form#searchForm div.form-input input {
    position: relative;
    width: 100%;
    font-size: 0.9em;
    padding-left: 2rem;
    border: solid 0.01rem #a1a1a1;
    border-radius: 0.6rem;
  }

  div#verticalList ul.participents li ul.participent ul {
    text-align: left;
  }

  div#verticalList ul.participents li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.participents li:hover,
  div#verticalList ul.participents li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.participents li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.participents li ul.participent {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    text-align: center;
  }

  div#verticalList ul.participents li ul.participent ul {
    text-align: center;
  }

  div#verticalList ul.participents li ul.participent li.image {
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 0.5rem;
    border: solid 0.09rem #176c9d;
    color: #176c9d;
  }

  div#verticalList ul.participents li ul.participent li.summary {
    margin: 0 auto;
  }

  div#verticalList ul.participents li ul.participent li ul li.state,
  div#verticalList ul.participents li ul.participent li ul li.region,
  div#verticalList ul.participents li ul.participent li ul li.country,
  div#verticalList ul.participents li ul.participent li ul li.userName,
  div#verticalList ul.participents li ul.participent li ul li.createdAt {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  @media (max-width: 1400px) {
    div#verticalList ul.participents li ul.participent li.image {
      display: none;
    }

    div#verticalList ul.participents li ul.participent {
      padding: 0.5rem;
    }

    div#verticalList ul.participents li ul.participent ul li {
      margin-left: 0;
    }

    div#verticalList ul.participents li ul.participent {
      justify-content: space-around;
    }
  }

  @media (max-width: 1200px) {
    div#verticalList ul.participents li ul.participent li.image {
      display: block;
    }

    div#verticalList ul.participents li ul.participent {
      padding: 0;
    }

    div#verticalList ul.participents li ul.participent ul li {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 992px) {
    div#verticalList ul.participents li ul.participent li.summary {
      margin: 0 auto;
    }
  }
</style>
