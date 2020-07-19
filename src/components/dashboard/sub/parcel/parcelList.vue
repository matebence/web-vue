<template>
  <div id="parcelList">
    <ul class="tabs">
      <li
        v-bind:key="option.id"
        @click.prevent="selectedOption(option)"
        v-for="option in tab.items"
        :class="{active: activeEl.tabs.tabId === option.itemId}">{{option.value}}</li>
    </ul>
    <ul class="parcels">
      <li
        v-bind:key="item.id"
        @click.prevent="selectedParcel(item)"
        v-for="item in parcel.data.search"
        v-show="activeEl.tabs.value === tab.items[0].value || activeEl.tabs.value === tab.items[2].value"
        :class="{active: activeEl.parcels.parcelId === item.id}">
        <ul class="parcel">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(tab.items[0].value)]"/>
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

      <li
        v-bind:key="item.id"
        @click.prevent="selectedParcel(item)"
        v-for="item in parcel.data.create"
        v-show="activeEl.tabs.value === tab.items[1].value || activeEl.tabs.value === tab.items[2].value"
        :class="{active: activeEl.parcels.parcelId === item.id}">
        <ul class="parcel">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(tab.items[1].value)]"/>
          </li>
          <li>
            <ul>
              <li class="number">#Bez poradia</li>
              <li class="created">Balík nebol podaný</li>
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
  name: 'parcelList',
  props: ['activeEl'],
  created: function () {
    return this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.data.accountId})
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_ERRORS, {})
  },
  data: function () {
    return {
      tab: {
        items: [
          {
            itemId: 1,
            value: 'Pridelené'
          },
          {
            itemId: 2,
            value: 'Nepridelené'
          },
          {
            itemId: 3,
            value: 'Všetky'
          }
        ]
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
      this.activeEl.parcels.parcelId = 0
      this.activeEl.tabs.tabId = el.id
      this.activeEl.tabs.value = el.value

      if (this.activeEl.tabs.value === this.tab.items[0].value) {
        return this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.data.accountId})
      }
    },
    selectedParcel: function (el) {
      this.activeEl.parcels.parcelId = el.id
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
        case 'Nepridelené':
          return 'box-open'
      }
    }
  }
}
</script>

<style scoped>
  div#parcelList ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#parcelList ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#parcelList ul.tabs li:hover,
  div#parcelList ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;

  }

  div#parcelList ul.parcels li:hover,
  div#parcelList ul.parcels li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#parcelList ul.parcels li ul.parcel {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  div#parcelList ul.parcels li ul.parcel li.image {
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

  div#parcelList ul.parcels li ul.parcel li ul li.number,
  div#parcelList ul.parcels li ul.parcel li ul li.created {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  div#parcelList ul.parcels li ul.parcel li.category {
    padding: 1rem;
  }

  div#parcelList ul.parcels li ul.parcel li.category svg {
    font-size: 1.3em;
    color: #176c9d;
  }
</style>
