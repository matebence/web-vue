<template>
  <div id="courier">
    <h1>Kuriéri</h1>
    <form class="search">
      <input
        type="text"
        autocomplete="off"
        class="searchTerm"
        placeholder="Meno kuriéra"
        :disabled="activeEl.parcelId >= 0"
        v-model="parcelData.courier.search.name"
        @input="onAutoCompleteCourier($event.target.value)">
      <button
        type="submit"
        class="searchButton"
        :disabled="activeEl.parcelId >= 0"
        @click.prevent="onSearchCourier({firstName: parcelData.courier.search.user.pop().firstName})">
        <i class="fa fa-search"></i>
      </button>
    </form>
    <app-horizontal-list
      :activeEl="activeEl"
      :parcelData="parcelData"
      :appHorizontalList="appHorizontalList"/>
  </div>
</template>

<script>
  import * as types from '@/store/types'

  import horizontalList from '@/components/dashboard/child/parcel/sub/horizontalList'

  export default {
    created: function () {
      return this.onSearchCourier({roles: process.env.APP_ROLE_COURIER})
    },
    name: 'courier',
    props: ['appHorizontalList', 'parcelData', 'activeEl'],
    data: function () {
      return {}
    },
    components: {
      appHorizontalList: horizontalList
    },
    methods: {
      onAutoCompleteCourier: function ($event) {
        this.activeEl.courierId = 0
        if ($event.length === 0) return this.onSearchCourier({roles: process.env.APP_ROLE_COURIER})
        if ($event.length < 3) return
        return this.onSearchCourier({firstName: $event})
      },
      onSearchCourier: function (obj) {
        return this.$store.dispatch(types.ACTION_USER_SEARCH, {roles: process.env.APP_ROLE_COURIER, ...obj})
          .then(result => {
            this.parcelData.courier.search.user = Object.values(result)
          })
          .catch(err => console.warn(err.message))
      }
    }
  }
</script>

<style scoped>
  div#courier {
    height: 210px;
    width: fit-content;
  }

  div#courier h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#courier form.search {
    position: absolute;
    right: 0;
    top: 5%;
  }

  div#courier form.search {
    display: inline-flex;
  }

  div#courier form.search input {
    font-size: 0.9em;
  }

  div#courier form.search .searchTerm {
    width: 10rem;
    border: 0.13rem solid #176c9d;
    border-right: none;
    text-align: center;
    border-radius: 3rem 0 0 3rem;
    outline: none;
  }

  div#courier form.search .searchButton {
    position: relative;
    right: 7%;
    width: 3rem;
    background: #176c9d;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
  }

  div#courier form.search .searchButton:hover {
    background: #187fb1;
  }

  div#courier form.search .searchButton:disabled {
    background: rgba(9, 81, 116, 0.74);
  }

  @media (max-width: 400px) {
    div#courier {
      height: 275px;
    }

    div#courier form.search {
      margin-top: 2rem;
      margin-left: 1.5rem;
      position: relative;
      display: flex;
      justify-content: center;
    }
  }
</style>
