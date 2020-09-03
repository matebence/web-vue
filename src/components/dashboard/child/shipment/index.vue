<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <h1>Zásielky</h1>
        <div
          v-show="isSelected"
          id="modify">
          <button
            @click.prevent="components.appShipment.activeEl.shipmentId = 0">
            <font-awesome-icon
              :icon="['fas', 'ban']"/>
          </button>
        </div>
        <app-vertical-list
          :activeEl="components.appShipment.activeEl"
          :shipment="components.appShipment.shipment.search" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-properties
          :activeEl="components.appShipment.activeEl"
          :shipment="selectedItem" />
        <app-rating
          :shipment="selectedItem"
          :activeEl="components.appShipment.activeEl" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import rating from '@/components/dashboard/child/shipment/sub/rating'
import properties from '@/components/dashboard/child/shipment/sub/properties'
import verticalList from '@/components/dashboard/child/shipment/sub/verticalList'

export default {
  created: function () {
    this.onFetchShipments({sender: this.signIn.accountId})
  },
  beforeMount: function () {
    this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_ERRORS, {})
    this.$store.commit(types.MUTATIONS_CLEAR_RATING_ERRORS, {})
  },
  name: 'index',
  data: function () {
    return {
      components: {
        appShipment: {
          parcel: {
            search: {
            }
          },
          shipment: {
            search: {
            }
          },
          activeEl: {
            itemId: 1,
            shipmentId: 0
          }
        }
      }
    }
  },
  components: {
    appRating: rating,
    appProperties: properties,
    appVerticalList: verticalList
  },
  watch: {
    'components.appShipment.activeEl.value': function (newValue, oldValue) {
      this.components.appShipment.shipment.search = {}

      if (newValue === 'Vlastné' || newValue === 'Všetky') {
        this.onFetchShipments({sender: this.signIn.accountId})
      }
      if (newValue === 'Ostatné' || newValue === 'Všetky') {
        this.onFetchShipments({receiver: this.signIn.accountId})
      }
    }
  },
  computed: {
    isSelected: function () {
      return this.components.appShipment.activeEl.shipmentId !== 0
    },
    selectedItem: function () {
      if (this.components.appShipment.activeEl.shipmentId === 0) return
      const shipment = Object.values(this.components.appShipment.shipment.search).filter(e => e._id === this.components.appShipment.activeEl.shipmentId).pop()
      const parcel = Object.values(this.components.appShipment.parcel.search).filter(e => e.id === shipment.parcelId).pop()
      return {...shipment, ...parcel}
    },
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    onFetchShipments: function (obj) {
      return this.$store.dispatch(types.ACTION_PARCEL_SEARCH, obj)
        .then(result => {
          this.components.appShipment.parcel.search = result
          return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {parcelId: Object.values(result).map(e => e.id)})
        })
        .then(result => {
          this.components.appShipment.shipment.search = result
        })
        .catch(err => console.warn(err.message))
    }
  }
}
</script>

<style scoped>
  div#index h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#index div#modify {
    display: inline;
    float: right;
    margin-top: 1rem;
  }

  div#index div#modify button {
    display: inline;
    text-align: right;
    margin-top: 1.3rem;
    margin-right: 0.5rem;
    background: #176c9d;
    border: none;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.3rem;
    text-align: center;
    font-size: 0.9em;
  }

  div#index div#modify button:hover {
    background: #187fb1;
  }

  div#index div#modify button:focus {
    outline: 0;
  }

  div#index div#modify button svg {
    font-size: 0.8em;
    color: #ffffff;
  }

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
