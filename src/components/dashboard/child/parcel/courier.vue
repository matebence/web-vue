<template>
  <div id="courier">
    <h1>Kuriéri</h1>
    <form class="search">
      <input
        type="text"
        class="searchTerm"
        placeholder="Meno kuriéra"
        v-model="courier.search.name"
        :disabled="parcel.search.activeEl.parcels.parcelId >= 0"
        @input="autoCompleteCourier($event.target.value)">
      <button
        @click.prevent="searchCourier({firstName: Object.values(courier.search.user).pop().firstName})"
        type="submit"
        :disabled="parcel.search.activeEl.parcels.parcelId >= 0"
        class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </form>
    <app-courier-list
      :search="courier.search"
      :parcel="parcel.search.activeEl.parcels"/>
  </div>
</template>

<script>
import * as types from '@/store/types'
import courierList from '@/components/dashboard/sub/parcel/courierList'

export default {
  name: 'courier',
  props: ['parcel', 'courier'],
  created: function () {
    return this.searchCourier({roles: process.env.APP_ROLE_COURIER})
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_USER_ERRORS, {})
  },
  components: {
    appCourierList: courierList
  },
  methods: {
    autoCompleteCourier: function ($event) {
      this.courier.search.activeEl.courierId = 0
      if ($event.length === 0) return this.searchCourier({roles: process.env.APP_ROLE_COURIER})
      if ($event.length < 3) return
      return this.searchCourier({firstName: $event})
    },
    searchCourier: function (obj) {
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {roles: process.env.APP_ROLE_COURIER, ...obj})
        .then(result => {
          this.courier.search.user = result
        })
    }
  }
}
</script>

<style scoped>
  div#courier {
    height: 29.5vh;
  }

  div#courier h1 {
    margin-top: 1em;
    margin-left: 0.5em;
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

  @media (max-width: 1500px) {
    div#courier {
      height: 34.5vh;
    }
  }

  @media (max-width: 400px) {
    div#courier {
      height: 40.5vh;
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
