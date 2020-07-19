<template>
  <div id="courier">
    <h1>Kuriéry</h1>
    <form class="search">
      <input
        type="text"
        class="searchTerm"
        placeholder="Meno kuriéra"
        v-model="components.search.name"
        @input="autoCompleteCourier($event.target.value)">
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </form>
    <app-courier-list
      :search="components.search"
      :selectedParcelId="selectedParcelId">
    </app-courier-list>
  </div>
</template>

<script>
import * as types from '@/store/types'
import courierList from '@/components/dashboard/sub/parcel/courierList'

export default {
  name: 'courier',
  props: ['selectedParcelId'],
  created: function () {
    return this.searchCourier({roles: process.env.APP_ROLE_COURIER})
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_USER_ERRORS, {})
  },
  data: function () {
    return {
      components: {
        search: {
          courier: {
          },
          activeEl: {
            courierId: 0
          }
        }
      }
    }
  },
  components: {
    appCourierList: courierList
  },
  methods: {
    autoCompleteCourier: function ($event) {
      this.components.search.activeEl.courierId = 0
      if ($event.length === 0) return this.searchCourier({roles: process.env.APP_ROLE_COURIER})
      if ($event.length < 3) return
      return this.searchCourier({firstName: $event, roles: process.env.APP_ROLE_COURIER})
    },
    searchCourier: function (obj) {
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {...obj}).then(result => {
        this.components.search.courier = result
      })
    }
  }
}
</script>

<style scoped>
  div#courier h1 {
    margin-top: 1em;
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

  @media (max-width: 370px) {
    div#courier form.search {
      margin-top: 2rem;
      position: relative;
      left: calc(50% - (10rem / 2));
    }
  }
</style>
