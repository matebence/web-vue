<template>
  <div id="courier">
    <h1>Kuriéri</h1>
    <form class="search">
      <input
        type="text"
        class="searchTerm"
        placeholder="Meno kuriéra"
        v-model="courier.search.name"
        :disabled="parcel.activeEl.parcelId >= 0"
        @input="onAutoCompleteCourier($event.target.value)">
      <button
        @click.prevent="onSearchCourier({firstName: courier.search.user.pop().firstName})"
        type="submit"
        :disabled="parcel.activeEl.parcelId >= 0"
        class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </form>
    <app-horizontal-list
      :courier="courier.search"
      :parcel="parcel.search"
      :activeEl="activeEl"
    />
  </div>
</template>

<script>
import * as types from '@/store/types'
import horizontalList from '@/components/dashboard/child/parcel/sub/horizontalList'

export default {
  name: 'courier',
  props: ['parcel', 'courier', 'activeEl'],
  created: function () {
    return this.onSearchCourier({roles: process.env.APP_ROLE_COURIER})
  },
  beforeMount: function () {
    this.$store.commit(types.MUTATIONS_CLEAR_USER_DATA, {})
    this.$store.commit(types.MUTATIONS_CLEAR_USER_ERRORS, {})
  },
  components: {
    appHorizontalList: horizontalList
  },
  methods: {
    onAutoCompleteCourier: function ($event) {
      this.courier.search.activeEl.courierId = 0
      if ($event.length === 0) return this.onSearchCourier({roles: process.env.APP_ROLE_COURIER})
      if ($event.length < 3) return
      return this.onSearchCourier({firstName: $event})
    },
    onSearchCourier: function (obj) {
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {roles: process.env.APP_ROLE_COURIER, ...obj})
        .then(result => {
          this.courier.search.user = Object.values(result)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  div#courier {
    height: 220px;
    width: fit-content;
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
