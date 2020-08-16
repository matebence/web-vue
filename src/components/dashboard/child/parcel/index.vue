<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          :activeEl="components.parcel.activeEl" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-courier
          :parcel="components.parcel"
          :courier="components.courier"
          :activeEl="components.parcel.activeEl"/>
        <app-here-map
          :parcel="components.parcel"
          :courier="components.courier" />
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'
import manage from '@/components/dashboard/child/parcel/sub/manage'
import courier from '@/components/dashboard/child/parcel/sub/courier'
import hereMap from '@/components/dashboard/child/parcel/sub/hereMap'

export default {
  beforeMount: function () {
    this.$store.commit(types.MUTATIONS_CLEAR_USER_DATA, {})
    return this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_ERRORS, {})
  },
  name: 'index',
  data: function () {
    return {
      components: {
        parcel: {
          search: {
            shipment: {
            }
          },
          activeEl: {
            tabId: 1,
            value: 'Pridelené',
            parcelId: 0
          }
        },
        courier: {
          search: {
            user: {
            },
            activeEl: {
              courierId: 0
            }
          }
        }
      }
    }
  },
  components: {
    appCourier: courier,
    appManage: manage,
    appHereMap: hereMap
  },
  watch: {
    'components.parcel.activeEl.parcelId': function (newValue, oldValue) {
      if (newValue <= 0) {
        this.components.parcel.search.shipment = {}
      } else {
        return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {parcelId: newValue})
          .then(result => {
            this.components.parcel.search.shipment = Object.values(result).pop()
          })
          .catch(err => console.log(err.message))
      }
    }
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
    overflow-x: hidden;
    overflow-y: auto;
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
