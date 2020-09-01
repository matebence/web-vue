<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          :vehicle="vehicleSearch"
          :activeEl="components.appVehicle.activeEl" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-properties
          :vehicle="selectedItem"
          :activeEl="components.appVehicle.activeEl"/>
        <app-options />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import manage from '@/components/dashboard/child/vehicle/sub/manage'
import options from '@/components/dashboard/child/vehicle/sub/options'
import properties from '@/components/dashboard/child/vehicle/sub/properties'

export default {
  name: 'index',
  data: function () {
    return {
      components: {
        appVehicle: {
          search: {
            vehicle: {
            }
          },
          activeEl: {
            vehicleId: 0
          }
        }
      }
    }
  },
  components: {
    appManage: manage,
    appOptions: options,
    appProperties: properties
  },
  computed: {
    selectedItem: function () {
      if (this.components.appVehicle.activeEl.vehicleId === 0) return
      return Object.values(this.vehicleSearch).filter(e => e._id === this.components.appVehicle.activeEl.vehicleId).pop()
    },
    ...mapGetters({
      vehicleSearch: types.GETTER_VEHICLE_DATA_SEARCH
    })
  }
}
</script>

<style scoped>
  div#index div#main-content,
  div#index div#content {
    width: 100%;
    height: 98vh;
    overflow: auto;
  }

  div#index div#content {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#index div#main-content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    padding: 0;
    height: 98vh;
  }

  @media (max-width: 992px) {
    div#index div#main-content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
