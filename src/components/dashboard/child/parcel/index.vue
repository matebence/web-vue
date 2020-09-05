<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          :activeEl="components.appParcel.activeEl"
          :appManage="components.appParcel.sub.appManage"
          :appVerticalList="components.appParcel.sub.appVerticalList" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-courier
          :parcelData="components.appParcel.data"
          :activeEl="components.appParcel.activeEl"
          :appHorizontalList="components.appParcel.sub.appHorizontalList" />
        <app-here-map
          :parcelData="components.appParcel.data"
          :activeEl="components.appParcel.activeEl"
          :appHereMap="components.appParcel.sub.appHereMap"/>
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
    this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_DATA, {})
    return this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_ERRORS, {})
  },
  name: 'index',
  data: function () {
    return {
      components: {
        appParcel: {
          sub: {
            appHorizontalList: {
              modal: {
                text: null,
                title: null,
                button: null
              }
            },
            appHereMap: {
              form: {
                from: {
                  value: '',
                  autoComplete: {
                  },
                  geo: {
                    lat: 0,
                    lng: 0
                  }
                },
                to: {
                  value: '',
                  autoComplete: {
                  },
                  geo: {
                    lat: 0,
                    lng: 0
                  }
                }
              },
              summary: {
                isSet: false,
                values: {
                  length: 0,
                  time: 0,
                  price: 0
                }
              },
              profit: {
                company: 0.00,
                courier: 0.00
              },
              modal: {
                text: null,
                title: null,
                button: null
              },
              apply: {
                text: null,
                title: null,
                positiveButton: null,
                negativeButton: null
              }
            },
            appManage: {
              list: {
                name: 'app-vertical-list',
                icon: 'plus'
              },
              crud: {
                name: 'app-crud',
                icon: 'angle-left',
                form: {
                  values: {
                    receiver: {
                      name: null,
                      accountId: null
                    },
                    category: null,
                    note: null,
                    length: null,
                    width: null,
                    height: null,
                    weight: null
                  }
                }
              },
              modal: {
                text: null,
                title: null,
                button: null
              },
              apply: {
                text: null,
                title: null,
                positiveButton: null,
                negativeButton: null
              }
            },
            appVerticalList: {
              items: [
                {
                  itemId: 1,
                  value: 'Pridelené'
                },
                {
                  itemId: 2,
                  value: 'Nepridelené'
                },
                {
                  itemId: 3,
                  value: 'Všetky'
                }
              ]
            }
          },
          data: {
            parcel: {
              search: {
              }
            },
            courier: {
              search: {
                user: {
                }
              }
            }
          },
          activeEl: {
            itemId: 1,
            parcelId: 0,
            courierId: 0,
            icon: 'plus',
            component: 'app-vertical-list'
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
    'components.appParcel.activeEl.parcelId': function (newValue, oldValue) {
      if (newValue <= 0) {
        this.components.appParcel.data.parcel.search = {}
      } else {
        return this.$store.dispatch(types.ACTION_SHIPMENT_SEARCH, {parcelId: newValue})
          .then(result => {
            this.components.appParcel.data.parcel.search = Object.values(result).pop()
          })
          .catch(err => console.warn(err.message))
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
