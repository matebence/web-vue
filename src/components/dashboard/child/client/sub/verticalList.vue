<template>
  <div id="verticalList">
    <h1>Klienti</h1>
    <ul class="tabs">
      <li
        :key="option.id"
        @click.prevent="onSelectedTab(option)"
        v-for="option in appVerticalList.items"
        :class="{active: activeEl.itemId === option.itemId}">{{option.value}}
      </li>
    </ul>
    <ul class="clients">
      <li
        :key="item._id"
        @click.prevent="onSelectedShipment(item)"
        v-for="item in shipmentData.search"
        :class="{active: activeEl.shipmentId === item._id}">
        <ul class="client">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'location-arrow']"/>
          </li>
          <li class="summary">
            <ul>
              <li class="id">{{item.status.name}}</li>
              <li class="from">{{item.from.split(',').pop()}} - {{item.to.split(',').pop()}}</li>
              <li class="created">{{formatDate(item.createdAt)}} {{formatTime(item.createdAt)}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        class="empty-list"
        v-if="Object.keys(shipmentData.search).length === 0">
        Zoznam je prázdny
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '@/store/types'

  export default {
    created: function () {
      return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {
        courier: this.signIn.accountId,
        status: process.env.PARCEL_NEW_STATUS_ID
      })
        .then(result => {
          this.shipmentData.search = result
        })
        .catch(err => {
          this.shipmentData.search = {}
          console.warn(err.message)
        })
    },
    name: 'verticalList',
    props: ['appVerticalList', 'shipmentData', 'activeEl'],
    data: function () {
      return {}
    },
    watch: {
      'activeEl.itemId': function (newValue, oldValue) {
        const status = this.appVerticalList.items.filter(e => e.itemId === newValue).pop().id
        return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {courier: this.signIn.accountId, status: status})
          .then(result => {
            this.shipmentData.search = result
          })
          .catch(err => {
            console.warn(err.message)
          })
      }
    },
    computed: {
      ...mapGetters({
        signIn: types.GETTER_SIGN_IN_DATA
      })
    },
    methods: {
      onSelectedTab: function (el) {
        this.shipmentData.search = {}
        this.activeEl.shipmentId = 0
        this.activeEl.value = el.value
        this.activeEl.itemId = el.itemId
      },
      onSelectedShipment: function (el) {
        this.activeEl.shipmentId = el._id
      },
      formatDate: function (timestamp) {
        const date = new Date(timestamp)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      },
      formatTime: function (timestamp) {
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

  div#verticalList ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#verticalList ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#verticalList ul.tabs li:hover,
  div#verticalList ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;
  }

  div#verticalList ul.clients li ul.client ul {
    text-align: center;
  }

  div#verticalList ul.clients li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.clients li:hover,
  div#verticalList ul.clients li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.clients li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.clients li ul.client {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    text-align: center;
  }

  div#verticalList ul.clients li ul.client li.image {
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

  div#verticalList ul.clients li ul.client li.summary {
    display: block;
    margin: 0 auto;
  }

  div#verticalList ul.clients li ul.client li ul li.created,
  div#verticalList ul.clients li ul.client li ul li.id,
  div#verticalList ul.clients li ul.client li ul li.from {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  @media (max-width: 1400px) {
    div#verticalList ul.clients li ul.client li.image {
      display: none;
    }

    div#verticalList ul.clients li ul.client {
      padding: 0.5rem;
    }

    div#verticalList ul.clients li ul.client ul li {
      margin-left: 0;
    }

    div#verticalList ul.clients li ul.client {
      justify-content: space-around;
    }
  }

  @media (max-width: 1200px) {
    div#verticalList ul.clients li ul.client li.image {
      display: block;
    }

    div#verticalList ul.clients li ul.client {
      padding: 0;
    }

    div#verticalList ul.clients li ul.client ul li {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 992px) {
    div#verticalList ul.tabs {
      margin-top: 2rem;
      margin-bottom: 2rem;
      width: 100%;
    }

    div#verticalList ul.clients li ul.client li.summary {
      margin: 0 auto;
    }
  }
</style>
