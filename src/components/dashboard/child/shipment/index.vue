<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
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
          :shipmentData="components.appShipment.data"
          :appVerticalList="components.appShipment.sub.appVerticalList"/>
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-properties
          :shipmentData="filteredShipmentData"
          :activeEl="components.appShipment.activeEl"
          :appProperties="components.appShipment.sub.appProperties"/>
        <app-rating
          :shipmentData="filteredShipmentData"
          :activeEl="components.appShipment.activeEl"
          :appRating="components.appShipment.sub.appRating"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  import verticalList from '@/components/dashboard/child/shipment/sub/verticalList'
  import properties from '@/components/dashboard/child/shipment/sub/properties'
  import rating from '@/components/dashboard/child/shipment/sub/rating'

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
            sub: {
              appVerticalList: {
                items: [
                  {
                    itemId: 1,
                    value: 'Vlastné'
                  },
                  {
                    itemId: 2,
                    value: 'Ostatné'
                  },
                  {
                    itemId: 3,
                    value: 'Všetky'
                  }
                ]
              },
              appRating: {
                form: {
                  values: {
                    status: [{
                      id: 1,
                      name: 'Balík bol doručený'
                    }],
                    description: null,
                    rating: null,
                    image: {
                      name: null,
                      base64: null
                    },
                    parcelId: 0
                  }
                },
                modal: {
                  text: null,
                  title: null,
                  button: null
                }
              },
              appProperties: {
                form: {
                  values: {
                    from: 'Mesto vyzdivnutia zásielky',
                    to: 'Mesto odovzdania zásielky',
                    courier: 'Meno kuriéra',
                    status: 'Stav zásielky',
                    _id: 'Identifikačné číslo zásielky',
                    sender: 'Meno odosielatela',
                    receiver: 'Meno prijímatela',
                    invoice: {
                      name: 'Faktúra vo forme .pdf',
                      _id: null
                    }
                  }
                },
                modal: {
                  text: null,
                  title: null,
                  button: null
                }
              }
            },
            data: {
              parcel: {
                search: {}
              },
              shipment: {
                search: {}
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
      'components.appShipment.activeEl.itemId': function (newValue, oldValue) {
        this.components.appShipment.data.shipment.search = {}

        if (newValue === 1 || newValue === 3) {
          this.onFetchShipments({sender: this.signIn.accountId})
        }
        if (newValue === 2 || newValue === 3) {
          this.onFetchShipments({receiver: this.signIn.accountId})
        }
      }
    },
    computed: {
      isSelected: function () {
        return this.components.appShipment.activeEl.shipmentId !== 0
      },
      filteredShipmentData: function () {
        if (this.components.appShipment.activeEl.shipmentId === 0) return
        const shipment = Object.values(this.components.appShipment.data.shipment.search).filter(e => e._id === this.components.appShipment.activeEl.shipmentId).pop()
        const parcel = Object.values(this.components.appShipment.data.parcel.search).filter(e => e.id === shipment.parcelId).pop()
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
            this.components.appShipment.data.parcel.search = result
            return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {parcelId: Object.values(result).map(e => e.id)})
          })
          .then(result => {
            this.components.appShipment.data.shipment.search = result
          })
          .catch(err => console.warn(err.message))
      }
    }
  }
</script>

<style scoped>
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
