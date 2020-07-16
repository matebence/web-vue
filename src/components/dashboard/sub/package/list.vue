<template>
  <div id="list">
    <ul class="tabs">
      <li
        v-bind:key="option.id"
        @click="selectedOption(option)"
        v-for="option in navigation.tabs"
        :class="{active: navigation.activeEl.tabs.id === option.id}">{{option.value}}</li>
    </ul>
    <ul class="parcels">
      <li
        v-bind:key="item.id"
        @click="selectedParcel(item)"
        v-for="item in parcel.data.search"
        v-show="navigation.activeEl.tabs.value === navigation.tabs[0].value"
        :class="{active: navigation.activeEl.parcels.id === item.id}">
        <ul class="parcel">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(navigation.tabs[0].value)]"/>
          </li>
          <li>
            <ul>
              <li class="number">#{{item.id}}</li>
              <li class="created">{{formatDate(item.createdAt)}}<br>{{formatTime(item.createdAt)}}</li>
            </ul>
          </li>
          <li class="category">
            <font-awesome-icon :icon="['fas', formatIcon(item.category.name)]"/>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'list',
  created: function () {
    this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.data.accountId})
  },
  data: function () {
    return {
      navigation: {
        tabs: [
          {
            id: 1,
            value: 'Pridelené'
          },
          {
            id: 2,
            value: 'Nepridelené'
          },
          {
            id: 3,
            value: 'Všetky'
          }
        ],
        activeEl: {
          tabs: {
            id: 1,
            value: 'Pridelené'
          },
          parcels: {
            id: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DEFAULT,
      parcel: types.GETTER_PARCEL_DEFAULT
    })
  },
  methods: {
    selectedOption: function (el) {
      this.navigation.activeEl.tabs.id = el.id
      this.navigation.activeEl.tabs.value = el.value

      if (this.navigation.activeEl.tabs.value === this.navigation.tabs[0].value) {
        this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.data.accountId})
      }
    },
    selectedParcel: function (el) {
      this.navigation.activeEl.parcels.id = el.id
    },
    formatDate: function (timestamp) {
      const date = new Date(timestamp)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
    formatTime: function (timestamp) {
      const time = new Date(timestamp)
      return `${time.getHours()}:${time.getMinutes()}`
    },
    formatIcon: function (icon) {
      switch (icon) {
        case 'Dokumenty':
          return 'file'
        case 'Drogéria':
          return 'spray-can'
        case 'Elektronika':
          return 'plug'
        case 'Iné':
          return 'question-circle'
        case 'Oblečenie':
          return 'tshirt'
        case 'Potraviny':
          return 'utensils'
        case 'Pridelené':
          return 'box'
      }
    }
  }
}
</script>

<style scoped>
  div#list ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#list ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#list ul.tabs li:hover,
  div#list ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;

  }

  div#list ul.parcels li:hover,
  div#list ul.parcels li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#list ul.parcels li ul.parcel {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  div#list ul.parcels li ul.parcel li.image {
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

  div#list ul.parcels li ul.parcel li ul li.number,
  div#list ul.parcels li ul.parcel li ul li.created {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  div#list ul.parcels li ul.parcel li.category {
    padding: 1rem;
  }

  div#list ul.parcels li ul.parcel li.category svg {
    font-size: 1.3em;
    color: #176c9d;
  }
</style>
