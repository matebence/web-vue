<template>
  <div id="hereMap">
    <div id="map" ref="map">
      <div id="done">
        <button
          type="submit"
          class="btn btn-primary"><font-awesome-icon :icon="['fas', 'box']"/></button>
      </div>
    </div>
  </div>
</template>

<script>
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-mapevents'

import * as types from '@/store/types'
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
        return this.reverseGeoCode()
      })
      .catch(err => console.warn(err.message))
  },
  name: 'hereMap',
  data: function () {
    return {
      components: {
        appHereMap: {
        }
      },
      here: {
        map: {
        },
        platform: {
        },
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
  methods: {
    geoCode: function (coordinates) {
      const searchService = this.here.platform.getSearchService()
      let isLast = Object.keys(this.components.appHereMap.form).length
      for (const item in this.components.appHereMap.form) {
        const geocodingParameters = {q: this.components.appHereMap.form[item].value}
        searchService.geocode(geocodingParameters, onSuccess => {
          const position = onSuccess.items.pop().position
          this.components.appHereMap.form[item].geo = {...position}
          if (!--isLast) coordinates(this.components.appHereMap.form)
        }, onError => { console.warn(onError) })
      }
    },
    reverseGeoCode: function () {
      if (localStorage.getItem('position') === null) return
      const searchService = this.here.platform.getSearchService()
      const reverseGeocodingParameters = {at: localStorage.getItem('position'), limit: '1'}
      return searchService.reverseGeocode(reverseGeocodingParameters, onSuccess => {
        const place = Object.values(onSuccess.items).pop()
        this.components.appHereMap.form.from.value = `${this.here.country.name}, ${place.address.city}`
      }, onError => { console.warn(onError) })
    },
    visualizeOnMap: function () {
      if (this.components.appHereMap.form.from.value.length > 2 && this.components.appHereMap.form.to.value.length > 2) {
        return this.geoCode(coordinates => {
          this.here.routingConfiguration = {
            ...this.here.routingConfiguration,
            origin: `${coordinates.from.geo.lat},${coordinates.from.geo.lng}`,
            destination: `${coordinates.to.geo.lat},${coordinates.to.geo.lng}`
          }
          const router = this.here.platform.getRoutingService(null, 8)
          router.calculateRoute(this.here.routingConfiguration, this.drawRoute, onError => { console.warn(onError) })
        })
      }
    },
    drawRoute: function (result) {
      if (result.routes.length) {
        let travelSummary = null
        const group = new H.map.Group()
        const markerIcon = new H.map.Icon(bleskMarker)

        result = result.routes.pop()
        this.here.map.getObjects().forEach(e => this.here.map.removeObject(e))

        result.sections.forEach(section => {
          const polyline = H.geo.LineString.fromFlexiblePolyline(section.polyline)

          const start = new H.map.Marker(section.departure.place.location, {icon: markerIcon})
          const destination = new H.map.Marker(section.arrival.place.location, {icon: markerIcon})

          const outline = new H.map.Polyline(polyline, {...this.here.outline})
          const arrows = new H.map.Polyline(polyline, {...this.here.arrows})

          this.here.map.addObjects([group, start, destination])
          group.addObjects([outline, arrows])
          travelSummary = section.travelSummary
        })
        this.components.appHereMap.summary.values.time = Number(travelSummary.duration)
        this.components.appHereMap.summary.values.length = Number(travelSummary.length)
        return this.here.map.getViewModel().setLookAtData({bounds: group.getBoundingBox()}, true)
      }
    }
  }
}
</script>

<style scoped>
  div#hereMap {
    border-bottom-left-radius: 3rem;
    overflow: hidden;
    height: 510px;
    border-top: solid 0.08rem black;
  }

  div#hereMap div#map {
    width: 100%;
    height: inherit;
    position: relative;
  }

  div#hereMap div.autocomplete ul {
    position: absolute;
    width: calc(100%);
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
    bottom: 2rem;
    right: 2rem;
  }

  div#hereMap div#map div#done button {
    width: 3rem;
    height: 3rem;
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

  @media (max-width: 1100px) {
    div#hereMap {
      border: none;
      border-top: solid 0.08rem black;
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
  }

  @media (max-width: 430px) {
    div#hereMap div#map div#done {
      bottom: 5rem;
    }
  }

  @media (max-width: 300px) {
    div#hereMap div#map div#done {
      bottom: 7.5rem;
    }
  }
</style>
