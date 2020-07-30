<template>
  <div id="parcel">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          @selectedParcel="parcel.parcelId = $event"/>
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-courier
          :parcel="parcel"/>
        <app-here-map />
      </div>
    </div>
  </div>
</template>

<script>
import courier from '@/components/dashboard/child/parcel/courier'
import manage from '@/components/dashboard/child/parcel/manage'
import hereMap from '@/components/dashboard/child/parcel/hereMap'

export default {
  name: 'parcel',
  data: function () {
    return {
      parcel: {
        parcelId: 0,
        shipment: {
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
    'parcel.parcelId': function (newValue, oldValue) {
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
