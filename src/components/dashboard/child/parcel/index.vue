<template>
  <div id="parcel">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          :activeEl="components.parcel.activeEl" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-courier
          :parcel="components.parcel"
          :courier="components.courier" />
        <app-here-map
          :parcel="components.parcel"
          :courier="components.courier" />
      </div>
    </div>
  </div>
</template>

<script>
import courier from '@/components/dashboard/child/parcel/courier'
import hereMap from '@/components/dashboard/child/parcel/hereMap'
import manage from '@/components/dashboard/child/parcel/manage'
import * as types from '@/store/types'

export default {
  name: 'parcel',
  data: function () {
    return {
      components: {
        parcel: {
          search: {
            shipment: {
            }
          },
          activeEl: {
            tabs: {
              tabId: 1,
              value: 'Pridelené'
            },
            parcels: {
              parcelId: 0
            }
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
    'components.parcel.activeEl.parcels.parcelId': function (newValue, oldValue) {
      if (newValue <= 0) {
        this.components.parcel.search.shipment = {}
      } else {
        return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {parcelId: newValue})
          .then(result => {
            this.components.parcel.search.shipment = Object.values(result).pop()
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
  div#parcel div#main-content,
  div#parcel div#content {
    width: 100%;
    height: 98vh;
  }

  div#parcel div#content {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#parcel div#main-content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    padding: 0;
    height: 98vh;
  }

  @media (max-width: 992px) {
    div#parcel div#main-content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
