<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-manage
          :activeEl="components.appClient.activeEl"
          :appVerticalList="components.appClient.sub.appVerticalList"
          :shipmentData="components.appClient.data.shipment" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-horizontal-list
          :activeEl="components.appClient.activeEl"
          :shipmentData="components.appClient.data.shipment"/>
        <app-here-map
          :activeEl="components.appClient.activeEl"
          :appHereMap="components.appClient.sub.appHereMap"
          :shipmentData="components.appClient.data.shipment" />
      </div>
    </div>
  </div>
</template>

<script>
import manage from '@/components/dashboard/child/client/sub/manage'
import hereMap from '@/components/dashboard/child/client/sub/hereMap'
import horizontalList from '@/components/dashboard/child/client/sub/horizontalList'

export default {
  name: 'index',
  data: function () {
    return {
      components: {
        appClient: {
          sub: {
            appHereMap: {
              points: {
                from: {
                  geo: {
                  }
                },
                to: {
                  geo: {
                  }
                }
              },
              summary: {
                values: {
                  length: 0,
                  time: 0,
                  price: 0
                }
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
                  value: 'Požiadavky',
                  id: process.env.PARCEL_NEW_STATUS_ID
                },
                {
                  itemId: 2,
                  value: 'Nevybavené',
                  id: process.env.PARCEL_ACCEPTED_STATUS_ID
                },
                {
                  itemId: 3,
                  value: 'Vybavené',
                  id: process.env.PARCEL_DONE_STATUS_ID
                }
              ]
            }
          },
          data: {
            shipment: {
              search: {
              },
              action: {
              }
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
    appManage: manage,
    appHereMap: hereMap,
    appHorizontalList: horizontalList
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
