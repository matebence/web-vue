<template>
  <div id="verticalList">
    <h1>Balíky</h1>
    <ul class="tabs">
      <li
        :key="option.id"
        @click.prevent="onSelectedTab(option)"
        v-for="option in appVerticalList.items"
        :class="{active: activeEl.itemId === option.itemId}">{{option.value}}
      </li>
    </ul>
    <ul class="parcels">
      <li
        :key="item.id"
        @click.prevent="onSelectedParcel(item)"
        v-for="item in parcelSearch"
        v-show="activeEl.itemId === appVerticalList.items[0].itemId || activeEl.itemId === appVerticalList.items[2].itemId"
        :class="{active: activeEl.parcelId === item.id}">
        <ul class="parcel">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(appVerticalList.items[0].value)]"/>
          </li>
          <li>
            <ul>
              <li class="number" v-if="onNewItemCreated(item.createdAt)"><span class="badge badge-pill badge-danger">Nové</span>
              </li>
              <li class="number" v-else>Číslo balíka: {{item.id}}</li>
              <li class="created">{{formatDate(item.createdAt)}}<br>{{formatTime(item.createdAt)}}</li>
            </ul>
          </li>
          <li class="category">
            <font-awesome-icon :icon="['fas', formatIcon(item.category.name)]"/>
          </li>
        </ul>
      </li>
      <li
        :key="item.id"
        @click.prevent="onSelectedParcel(item)"
        v-for="item in parcelCreate"
        v-show="activeEl.itemId === appVerticalList.items[1].itemId || activeEl.itemId === appVerticalList.items[2].itemId"
        :class="{active: activeEl.parcelId === item.id}">
        <ul class="parcel">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(appVerticalList.items[1].value)]"/>
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
      <li
        class="empty-list"
        v-if="(parcelSearch !== undefined) && (Object.keys(parcelSearch).length === 0) && (activeEl.itemId === appVerticalList.items[0].itemId)">
        Zoznam je prázdny
      </li>
      <li
        class="empty-list"
        v-if="(parcelCreate !== undefined) && (Object.keys(parcelCreate).length === 0) && (activeEl.itemId === appVerticalList.items[1].itemId)">
        Zoznam je prázdny
      </li>
      <li
        class="empty-list"
        v-if="(parcelSearch !== undefined && parcelCreate !== undefined) && (Object.keys(parcelSearch).length === 0 && Object.keys(parcelCreate).length === 0) && (activeEl.itemId === appVerticalList.items[2].itemId)">
        Zoznam je prázdny
      </li>
    </ul>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    created: function () {
      return this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.accountId})
        .catch(err => console.warn(err.message))
    },
    name: 'verticalList',
    props: ['appVerticalList', 'activeEl'],
    data: function () {
      return {}
    },
    watch: {
      'activeEl.itemId': function (newValue, oldValue) {
        if (newValue === 1) this.onSelectedTab({itemId: this.activeEl.itemId})
      }
    },
    computed: {
      ...mapGetters({
        signIn: types.GETTER_SIGN_IN_DATA,
        parcelSearch: types.GETTER_PARCEL_DATA_SEARCH,
        parcelCreate: types.GETTER_PARCEL_DATA_CREATE
      })
    },
    methods: {
      onSelectedTab: function (el) {
        this.activeEl.parcelId = 0
        this.activeEl.itemId = el.itemId

        if (this.activeEl.itemId === this.appVerticalList.items[0].itemId || this.activeEl.itemId === this.appVerticalList.items[2].itemId) {
          return this.$store.dispatch(types.ACTION_PARCEL_SEARCH, {sender: this.signIn.accountId})
            .catch(err => console.warn(err.message))
        }
      },
      onSelectedParcel: function (el) {
        this.activeEl.parcelId = el.id
      },
      onNewItemCreated: function (timestamp) {
        const current = Number(new Date().getTime()) / 1000
        const parcel = Number(new Date(timestamp).getTime()) / 1000
        return current - parcel < 60
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

  div#verticalList ul.parcels li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.parcels li:hover,
  div#verticalList ul.parcels li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.parcels li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.parcels li ul.parcel {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  div#verticalList ul.parcels li ul.parcel li.image {
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

  div#verticalList ul.parcels li ul.parcel li ul li.number,
  div#verticalList ul.parcels li ul.parcel li ul li.created {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  div#verticalList ul.parcels li ul.parcel li.category {
    padding: 1rem;
  }

  div#verticalList ul.parcels li ul.parcel li.category svg {
    font-size: 1.3em;
    color: #176c9d;
  }
</style>
