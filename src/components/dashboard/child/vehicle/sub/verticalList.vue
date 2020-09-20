<template>
  <div id="verticalList">
    <h1>Vozidlá</h1>
    <ul class="vehicles">
      <li
        :key="item._id"
        @click.prevent="onSelectedVehicle(item)"
        v-for="item in vehicleSearch"
        :class="{active: activeEl.vehicleId === item._id}">
        <ul class="vehicle">
          <li class="image">
            <font-awesome-icon :icon="['fas', formatIcon(item.type.name)]"/>
          </li>
          <li class="summary">
            <ul>
              <li class="name">{{item.name}}</li>
              <li class="type">{{item.type.name}}</li>
              <li class="number">{{item._id}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        class="empty-list"
        v-if="(vehicleSearch !== undefined) && (Object.keys(vehicleSearch).length === 0)">
        Zoznam je prázdny
      </li>
    </ul>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    name: 'verticalList',
    props: ['activeEl'],
    data: function () {
      return {}
    },
    computed: {
      ...mapGetters({
        vehicleSearch: types.GETTER_VEHICLE_DATA_SEARCH
      })
    },
    methods: {
      onSelectedVehicle: function (el) {
        this.activeEl.vehicleId = el._id
      },
      formatIcon: function (icon) {
        switch (icon) {
          case 'Bicykel':
            return 'bicycle'
          case 'Osobné motorové vozidlo':
            return 'car-side'
          case 'Nákladné motorové vozidlo':
            return 'truck'
        }
      }
    }
  }
</script>

<style scoped>
  div#manage h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#verticalList ul.vehicles li ul.vehicle ul {
    text-align: center;
  }

  div#verticalList ul.vehicles li ul.vehicle ul li {
    margin-left: 1rem;
  }

  div#verticalList ul.vehicles li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.vehicles li:hover,
  div#verticalList ul.vehicles li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.vehicles li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.vehicles li ul.vehicle {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    text-align: center;
  }

  div#verticalList ul.vehicles li ul.vehicle li.image {
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

  div#verticalList ul.vehicles li ul.vehicle li ul li.number,
  div#verticalList ul.vehicles li ul.vehicle li ul li.name,
  div#verticalList ul.vehicles li ul.vehicle li ul li.type {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  @media (max-width: 1400px) {
    div#verticalList ul.vehicles li ul.vehicle li.image {
      display: none;
    }

    div#verticalList ul.vehicles li ul.vehicle {
      padding: 0.5rem;
    }

    div#verticalList ul.vehicles li ul.vehicle ul li {
      margin-left: 0;
    }

    div#verticalList ul.vehicles li ul.vehicle {
      justify-content: space-around;
    }
  }

  @media (max-width: 1200px) {
    div#verticalList ul.vehicles li ul.vehicle li.image {
      display: block;
    }

    div#verticalList ul.vehicles li ul.vehicle {
      padding: 0;
    }

    div#verticalList ul.vehicles li ul.vehicle ul li {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 992px) {
    div#verticalList ul.tabs {
      margin-top: 2rem;
      margin-bottom: 2rem;
      width: 100%;
    }

    div#verticalList ul.vehicles li ul.vehicle li.summary {
      margin: 0 auto;
    }
  }
</style>
