<template>
  <div id="hereMap">
    <div id="map" ref="map">
      <div id="summary">
        <ul>
          <li><span>Dľžka:</span> {{formatDistance(appHereMap.summary.values.length)}}</li>
          <li><span>Čas:</span> {{formatDuration(appHereMap.summary.values.time)}}</li>
          <li><span>Cena:</span> {{formatPrice(appHereMap.summary.values.price)}}</li>
        </ul>
      </div>
      <div id="done">
        <button
          type="submit"
          :disabled="this.activeEl.itemId !== 2 || this.activeEl.shipmentId === 0"
          @click.prevent="onCreate(false)"
          class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'box']"/>
        </button>
      </div>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="onCreate($event)"
        :applyId="'hereClientMapApply'"
        :text="appHereMap.apply.text"
        :title="appHereMap.apply.title"
        :positiveButton="appHereMap.apply.positiveButton"
        :negativeButton="appHereMap.apply.negativeButton"/>
    </div>
  </div>
</template>

<script>
  import bootstrap from 'jquery'
  import 'here-js-api/scripts/mapsjs-core'
  import 'here-js-api/scripts/mapsjs-service'
  import 'here-js-api/scripts/mapsjs-mapevents'

  import * as types from '@/store/types'

  import apply from '@/components/common/apply'
  import bleskMarker from '@/assets/img/blesk-marker.png'

  export default {
    created: function () {
      this.here.platform = new H.service.Platform({'apikey': process.env.HERE_JS_SDK_API})
    },
    beforeMount: function () {
      return this.$store.dispatch(types.ACTION_LOCATION_GET)
        .then(results => {
          this.here.country.name = results.country
          this.here.country.value.center = {lng: results.lon, lat: results.lat}

          return this.here.country.value
        })
        .then(result => {
          const defaultLayers = this.here.platform.createDefaultLayers().raster.normal.map
          this.here.map = new H.Map(this.$refs.map, defaultLayers, {...result})
          return this.here.map
        })
        .then(result => {
          new H.mapevents.Behavior(new H.mapevents.MapEvents(result))
        })
        .catch(err => console.warn(err.message))
    },
    name: 'hereMap',
    props: ['appHereMap', 'shipmentData', 'activeEl'],
    data: function () {
      return {
        here: {
          map: {},
          platform: {},
          country: {
            name: '',
            value: {
              zoom: 8,
              center: {
                lng: 0.00,
                lat: 0.00
              }
            }
          },
          routingConfiguration: {
            routingMode: 'fast',
            transportMode: 'car',
            lang: 'sk-SK',
            return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
          },
          outline: {
            style: {
              lineWidth: 10,
              strokeColor: 'rgb(23, 108, 157)',
              lineTailCap: 'arrow-tail',
              lineHeadCap: 'arrow-head'
            }
          },
          arrows: {
            style: {
              lineWidth: 10,
              fillColor: 'white',
              strokeColor: 'rgb(255, 255, 255, 1)',
              lineDash: [0, 2],
              lineTailCap: 'arrow-tail',
              lineHeadCap: 'arrow-head'
            }
          }
        }
      }
    },
    components: {
      appApply: apply
    },
    watch: {
      'activeEl.shipmentId': function (newValue, oldValue) {
        if (this.activeEl.itemId !== 2 || this.activeEl.shipmentId === 0) return this.removePreviousRoutes()
        this.removePreviousRoutes()

        const data = Object.values(this.shipmentData.search).filter(e => e._id === newValue).pop()
        this.appHereMap.summary.values.price = data.price

        return this.visualizeOnMap({from: data.from, to: data.to})
      }
    },
    methods: {
      geoCode: function (points, coordinates) {
        let isLast = Object.keys(points).length
        const searchService = this.here.platform.getSearchService()
        for (const item in points) {
          const geocodingParameters = {q: points[item]}
          searchService.geocode(geocodingParameters, onSuccess => {
            const position = onSuccess.items.pop().position
            this.appHereMap.points[item].geo = {...position}
            if (!--isLast) coordinates(this.appHereMap.points)
          }, onError => {
            console.warn(onError)
          })
        }
      },
      visualizeOnMap: function (points) {
        return this.geoCode(points, coordinates => {
          this.here.routingConfiguration = {
            ...this.here.routingConfiguration,
            origin: `${coordinates.from.geo.lat},${coordinates.from.geo.lng}`,
            destination: `${coordinates.to.geo.lat},${coordinates.to.geo.lng}`
          }
          const router = this.here.platform.getRoutingService(null, 8)
          router.calculateRoute(this.here.routingConfiguration, this.drawRoute, onError => {
            console.warn(onError)
          })
        })
      },
      removePreviousRoutes: function () {
        this.appHereMap.summary.values.time = null
        this.appHereMap.summary.values.price = null
        this.appHereMap.summary.values.length = null
        return this.here.map.getObjects().forEach(e => this.here.map.removeObject(e))
      },
      drawRoute: function (result) {
        if (result.routes.length) {
          const group = new H.map.Group()
          const markerIcon = new H.map.Icon(bleskMarker)

          result = result.routes.pop().sections.pop()

          this.shipmentData.action = result.actions

          const polyline = H.geo.LineString.fromFlexiblePolyline(result.polyline)
          const start = new H.map.Marker(result.departure.place.location, {icon: markerIcon})
          const destination = new H.map.Marker(result.arrival.place.location, {icon: markerIcon})

          const outline = new H.map.Polyline(polyline, {...this.here.outline})
          const arrows = new H.map.Polyline(polyline, {...this.here.arrows})

          this.here.map.addObjects([group, start, destination])
          group.addObjects([outline, arrows])

          const travelSummary = result.travelSummary
          this.appHereMap.summary.values.time = Number(travelSummary.duration)
          this.appHereMap.summary.values.length = Number(travelSummary.length)

          return this.here.map.getViewModel().setLookAtData({bounds: group.getBoundingBox()}, true)
        }
      },
      formatPrice: function (price) {
        const formatter = new Intl.NumberFormat('sk-SK', {style: 'currency', currency: 'EUR'})
        return formatter.format(price)
      },
      formatDuration: function (duration) {
        return `${Math.floor(duration / 60)}min ${(duration % 60)}sec`
      },
      formatDistance: function (distance) {
        return (`${parseFloat(distance / 1000).toFixed(2)}km`)
      },
      showAppliedModal: function (title, text) {
        this.appHereMap.apply.title = title
        this.appHereMap.apply.text = text
        this.appHereMap.apply.positiveButton = 'Áno, odovzdať'
        this.appHereMap.apply.negativeButton = 'Zrušiť'
        return bootstrap('#hereClientMapApply').modal('show')
      },
      onCreate: function (applied) {
        if (applied) {
          const data = Object.values(this.shipmentData.search).filter(e => e._id === this.activeEl.shipmentId).pop()
          return this.$store.dispatch(types.ACTION_SHIPMENT_UPDATE, {
            _id: data._id,
            courier: data.courier.courierId,
            parcelId: data.parcelId,
            from: data.from,
            to: data.to,
            status: process.env.PARCEL_DONE_STATUS_ID,
            price: data.price,
            express: data.express
          })
            .then(result => {
              this.activeEl.itemId = 3
              this.activeEl.shipmentId = 0
            })
            .catch(err => console.warn(err.message))
        } else {
          return this.showAppliedModal('Upozornenie', 'Chystáte sa odovzdať zásielku prijmateľovi po odovzdaní zásielky, zmena už nebude možná!')
        }
      }
    }
  }
</script>

<style scoped>
  div#hereMap {
    border-bottom-left-radius: 3rem;
    overflow: hidden;
    height: 620px;
    border-top: solid 0.08rem black;
  }

  div#hereMap div#map {
    width: 100%;
    height: inherit;
    position: relative;
  }

  div#hereMap div.autocomplete ul {
    position: absolute;
    width: 100%;
    background: #ffffff;
    max-height: 15rem;
    overflow: auto;
  }

  div#hereMap div.autocomplete ul li {
    font-size: 0.9em;
    text-align: left;
    padding: 0.6rem;
    border: solid 0.01rem #dbdbdb;
  }

  div#hereMap div.autocomplete ul li:hover {
    cursor: pointer;
    background: #f1f1f1;
  }

  div#hereMap div#map div#done button {
    background: #176c9d;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
    z-index: 999;
  }

  div#hereMap div#map div#done button:hover {
    background: #187fb1;
  }

  div#hereMap div#map div#done button:disabled {
    background: #095174;
  }

  div#hereMap div#map div#done {
    z-index: 2;
    position: absolute;
    bottom: 1rem;
    right: 2rem;
  }

  div#hereMap div#map div#done button {
    width: 3rem;
    height: 3rem;
  }

  div#hereMap div#map div#summary {
    z-index: 2;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    bottom: 0;
    right: 0;
    width: 50%;
    text-align: center;
    background: #ffffff;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    border-left: solid 0.08rem black;
    border-right: solid 0.08rem black;
    border-top: solid 0.08rem black;
  }

  div#hereMap div#map div#summary ul li {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-left: 1rem;
    font-size: 1em;
    display: inline-block;
  }

  div#hereMap div#map div#summary ul li span {
    font-weight: 700;
    font-size: 1.3em;
  }

  div#hereMap div#map div#summary ul li {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-left: 1rem;
    font-size: 1em;
    display: inline-block;
  }

  div#hereMap div#map div#summary ul li span {
    font-weight: 700;
    font-size: 1.3em;
  }

  @media (max-width: 1400px) {
    div#hereMap div#map div#summary {
      width: 58%;
    }
  }

  @media (max-width: 1240px) {
    div#hereMap div#map div#summary {
      width: 65%;
    }
  }

  @media (max-width: 1100px) {
    div#hereMap {
      border: none;
      border-top: solid 0.08rem black;
    }

    div#hereMap div#map div#summary {
      width: 78%;
    }
  }

  @media (max-width: 992px) {
    div#hereMap {
      border-radius: 0;
    }
  }

  @media (max-width: 600px) {
    div#hereMap div#map div#done {
      bottom: 3rem;
    }

    div#hereMap div#map div#summary {
      width: 95%;
    }
  }

  @media (max-width: 428px) {
    div#hereMap div#map div#done {
      bottom: 5rem;
    }
  }

  @media (max-width: 290px) {
    div#hereMap div#map div#done {
      bottom: 8rem;
    }
  }
</style>
