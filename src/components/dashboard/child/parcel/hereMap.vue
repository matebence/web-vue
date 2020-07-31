<template>
  <div id="hereMap">
    <div id="map" ref="map">
      <form>
        <div class="form-group">
          <input
            v-model="navigator.form.from.value"
            :disabled="parcel.shipment.parcelId > 0 || parcel.parcelId === 0"
            type="text"
            class="form-control"
            id="from"
            placeholder="Odkiaľ">
        </div>
        <div class="form-group">
          <input
            v-model="navigator.form.to.value"
            :disabled="parcel.shipment.parcelId > 0 || parcel.parcelId === 0"
            type="text"
            class="form-control"
            id="to"
            placeholder="Kam">
        </div>
        <button
          @click.prevent="calculatePriceByDistance"
          type="submit"
          :disabled="(parcel.shipment.parcelId > 0) || (navigator.form.from.value.length < 3 || navigator.form.to.value.length < 3)"
          class="btn btn-primary">Hľadať</button>
      </form>
      <div id="summary">
        <ul>
          <li><span>Dľžka:</span> {{navigator.summary.length}}</li>
          <li><span>Čas:</span> {{navigator.summary.time}}</li>
          <li><span>Cena:</span> {{navigator.summary.price}}</li>
        </ul>
      </div>
      <div id="finish">
        <button
          type="submit"
          :disabled="(parcel.shipment.parcelId > 0) || (navigator.form.from.value.length < 3 || navigator.form.to.value.length < 3)"
          class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
      </div>
    </div>
  </div>
</template>

<script>
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-mapevents'
import bleskMarker from '@/assets/img/blesk-marker.png'
import * as types from '@/store/types'

export default {
  created: function () {
    this.here.platform = new H.service.Platform({
      'apikey': process.env.HERE_JS_SDK_API
    })
  },
  mounted: function () {
    const defaultLayers = this.here.platform.createDefaultLayers().raster.normal.map
    this.here.map = new H.Map(this.$refs.map, defaultLayers, {...this.here.slovakia})
    return new H.mapevents.Behavior(new H.mapevents.MapEvents(this.here.map))
  },
  name: 'hereMap',
  props: ['parcel', 'courier'],
  data: function () {
    return {
      navigator: {
        form: {
          from: {
            value: '',
            geo: {
              lat: 0,
              lng: 0
            }
          },
          to: {
            value: '',
            geo: {
              lat: 0,
              lng: 0
            }
          }
        },
        summary: {
          length: '0km',
          time: '0m 0s',
          price: '0,00 €'
        },
        courier: {
          price: 0.00
        }
      },
      here: {
        map: {
        },
        platform: {
        },
        slovakia: {
          zoom: 8,
          center: {
            lng: 19.7508084,
            lat: 48.62366
          }
        },
        routingConfiguration: {
          routingMode: 'fast',
          transportMode: 'car',
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
  watch: {
    'parcel.shipment.parcelId': function (newValue, oldValue) {
      if (newValue === undefined) {
        this.navigator.summary.length = '0km'
        this.navigator.summary.time = '0m 0s'
        this.navigator.summary.price = '0,00 €'

        this.navigator.form.from.value = ''
        this.navigator.form.to.value = ''

        return this.removePreviousRoutes()
      } else {
        const formatter = new Intl.NumberFormat('sk-SK', {style: 'currency', currency: 'EUR'})
        this.navigator.form.from.value = this.parcel.shipment.from
        this.navigator.form.to.value = this.parcel.shipment.to
        this.navigator.summary.price = formatter.format(this.parcel.shipment.price)

        return this.visualizeOnMap()
      }
    }
  },
  methods: {
    calculatePriceByDistance: function () {
      const courier = Object.values(this.courier.search.user).filter(e => e.accountId === this.courier.search.activeEl.courierId).pop()
      this.$store.dispatch(types.ACTION_PREFERENCES_SEARCH, {accountId: courier.accountId, name: 'Cena prepravy (eur/1km)'}).then(result => {
        this.navigator.courier.price = Object.values(result).pop().value
        return this.visualizeOnMap()
      })
    },
    geoCode: function (coordinates) {
      const searchService = this.here.platform.getSearchService()
      let isLast = Object.keys(this.navigator.form).length
      for (const item in this.navigator.form) {
        const geocodingParameters = {q: this.navigator.form[item].value}
        searchService.geocode(geocodingParameters, onSuccess => {
          const position = onSuccess.items.pop().position
          this.navigator.form[item].geo = {...position}
          if (!--isLast) coordinates(this.navigator.form)
        }, onError => { console.log(onError) })
      }
    },
    visualizeOnMap: function () {
      if (this.navigator.form.from.value.length > 2 && this.navigator.form.to.value.length > 2) {
        return this.geoCode(coordinates => {
          this.here.routingConfiguration = {
            ...this.here.routingConfiguration,
            origin: `${coordinates.from.geo.lat},${coordinates.from.geo.lng}`,
            destination: `${coordinates.to.geo.lat},${coordinates.to.geo.lng}`
          }
          const router = this.here.platform.getRoutingService(null, 8)
          router.calculateRoute(this.here.routingConfiguration, this.drawRoute, onError => { console.log(onError) })
        })
      }
    },
    drawRoute: function (result) {
      if (result.routes.length) {
        const group = new H.map.Group()
        const markerIcon = new H.map.Icon(bleskMarker)

        result = result.routes.pop()
        this.removePreviousRoutes()

        result.sections.forEach(section => {
          const polyline = H.geo.LineString.fromFlexiblePolyline(section.polyline)

          const start = new H.map.Marker(section.departure.place.location, {icon: markerIcon})
          const destination = new H.map.Marker(section.arrival.place.location, {icon: markerIcon})

          const outline = new H.map.Polyline(polyline, {...this.here.outline})
          const arrows = new H.map.Polyline(polyline, {...this.here.arrows})

          this.here.map.addObjects([group, start, destination])
          group.addObjects([outline, arrows])

          this.calculateSummury(section)
          return this.here.map.getViewModel().setLookAtData({bounds: group.getBoundingBox()}, true)
        })
      }
    },
    removePreviousRoutes: function () {
      return this.here.map.getObjects().forEach(e => this.here.map.removeObject(e))
    },
    calculateSummury: function (result) {
      const formatter = new Intl.NumberFormat('sk-SK', {style: 'currency', currency: 'EUR'})
      this.navigator.summary.time = `${Math.floor(Number(result.travelSummary.duration) / 60)}min ${(Number(result.travelSummary.duration) % 60)}sec`
      this.navigator.summary.length = (`${parseFloat(Number(result.travelSummary.length) / 1000).toFixed(2)}km`)
      this.navigator.summary.price = formatter.format(parseFloat(Number(result.travelSummary.length) / 1000) * Number(this.navigator.courier.price))
    }
  }
}
</script>

<style scoped>
  div#hereMap {
    border-bottom-left-radius: 3rem;
    overflow: hidden;
    height: 67vh;
    border-top: solid 0.08rem black;
  }

  div#hereMap div#map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  div#hereMap div#map form {
    z-index: 2;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 70%;
    text-align: center;
    background: #ffffff;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    border-left: solid 0.08rem black;
    border-right: solid 0.08rem black;
    border-bottom: solid 0.08rem black;
  }

  div#hereMap div#map form div.form-group {
    display: inline-block;
    margin-top: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  div#hereMap div#map form button, div#hereMap div#map div#finish button {
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
  }

  div#hereMap div#map form button:hover, div#hereMap div#map div#finish button:hover {
    background: #187fb1;
  }

  div#hereMap div#map form button:disabled, div#hereMap div#map div#finish button:disabled {
    background: #095174;
  }

  div#hereMap div#map form div.form-group input {
    border: 0.13rem solid #176c9d;
    font-size: 0.8em;
    border-radius: 3rem;
    outline: none;
  }

  div#hereMap div#map div#finish {
    z-index: 2;
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }

  div#hereMap div#map div#finish button {
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

  @media (max-width: 1500px) {
    div#hereMap {
      height: 62vh;
    }
  }

  @media (max-width: 1400px) {
    div#hereMap div#map form {
      width: 80%;
    }

    div#hereMap div#map div#summary {
      width: 58%;
    }
  }

  @media (max-width: 1240px) {
    div#hereMap div#map form {
      width: 98%;
    }

    div#hereMap div#map div#summary {
      width: 65%;
    }
  }

  @media (max-width: 1100px) {
    div#hereMap {
      border: none;
      border-top: solid 0.08rem black;
    }

    div#hereMap div#map form {
      width: 100%;
      border: none;
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

  @media (max-width: 640px) {
    div#hereMap div#map form div.form-group {
      display: block;
    }

    div#hereMap div#map form button {
      margin-bottom: 1rem;
    }

    div#hereMap div#map form div.form-group input {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media (max-width: 600px) {
    div#hereMap div#map div#summary {
      width: 95%;
    }
  }

  @media (max-width: 400px) {
    div#hereMap {
      height: 55vh;
    }
  }
</style>
