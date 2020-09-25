<template>
  <div id="hereMap">
    <div id="map" ref="map">
      <form>
        <div class="form-group">
          <input
            autocomplete="off"
            v-model="appHereMap.form.from.value"
            :disabled="parcelData.parcel.search.parcelId > 0 || activeEl.parcelId === 0"
            type="text"
            class="form-control"
            id="from"
            placeholder="Odkiaľ"
            @input="onAutoCompletePlace($event)">
          <div class="autocomplete">
            <ul>
              <li v-for="place in appHereMap.form.from.autoComplete" :key="place.id" data-element="from"
                  @click.prevent="onSelectPlace($event.target)">{{here.country.name}}, {{place.fullName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="form-group">
          <input
            autocomplete="off"
            v-model="appHereMap.form.to.value"
            :disabled="parcelData.parcel.search.parcelId > 0 || activeEl.parcelId === 0"
            type="text"
            class="form-control"
            id="to"
            placeholder="Kam"
            @input="onAutoCompletePlace($event)">
          <div class="autocomplete">
            <ul>
              <li v-for="place in appHereMap.form.to.autoComplete" :key="place.id" data-element="to"
                  @click.prevent="onSelectPlace($event.target)">{{here.country.name}}, {{place.fullName}}
              </li>
            </ul>
          </div>
        </div>
        <button
          @click.prevent="onCalculate"
          type="submit"
          :disabled="(parcelData.parcel.search.parcelId > 0) || (appHereMap.form.from.value.length < 3 || appHereMap.form.to.value.length < 3)"
          class="btn btn-primary">Hľadať
        </button>
      </form>
      <div id="summary">
        <ul>
          <li><span>Dľžka:</span> {{formatDistance(appHereMap.summary.values.length)}}</li>
          <li><span>Čas:</span> {{formatDuration(appHereMap.summary.values.time)}}</li>
          <li><span>Cena:</span>
            {{formatPrice(appHereMap.summary.values.length, appHereMap.profit.courier, appHereMap.profit.company)}}
          </li>
        </ul>
      </div>
      <div id="finish">
        <button
          type="submit"
          :disabled="(activeEl.courierId === 0) || (parcelData.parcel.search.parcelId > 0) || (appHereMap.form.from.value.length < 3 || appHereMap.form.to.value.length < 3)"
          @click.prevent="onCreate(false)"
          class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'check']"/>
        </button>
      </div>
    </div>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'hereMapAlert'"
        :text="appHereMap.modal.text"
        :title="appHereMap.modal.title"
        :button="appHereMap.modal.button"/>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="onCreate($event)"
        :applyId="'hereParcelMapApply'"
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
  import {mapGetters} from 'vuex'

  import bleskMarker from '@/assets/img/blesk-marker.png'
  import apply from '@/components/common/apply'
  import modal from '@/components/common/modal'

  export default {
    created: function () {
      this.here.platform = new H.service.Platform({'apikey': process.env.HERE_JS_SDK_API})
    },
    beforeMount: function () {
      return Promise.all([
        this.$store.dispatch(types.ACTION_LOCATION_GET),
        this.$store.dispatch(types.ACTION_PRICE_GET, process.env.COMPANY_PRICE_PROFIT_ID)
      ])
        .then(results => {
          if (results.length < 2) return
          const profit = results.pop()
          const location = results.pop()

          this.here.country.name = location.country
          this.appHereMap.profit.company = Number(profit.price)
          this.here.country.value.center = {lng: location.lon, lat: location.lat}

          return this.here.country.value
        })
        .then(result => {
          const defaultLayers = this.here.platform.createDefaultLayers().raster.normal.map
          this.here.map = new H.Map(this.$refs.map, defaultLayers, {...result})
          return this.here.map
        })
        .then(result => {
          new H.mapevents.Behavior(new H.mapevents.MapEvents(result))
          return this.onReverseGeoCode()
        })
        .catch(err => console.warn(err.message))
    },
    name: 'hereMap',
    props: ['appHereMap', 'parcelData', 'activeEl'],
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
      appApply: apply,
      appModal: modal
    },
    watch: {
      'parcelData.parcel.search.parcelId': function (newValue, oldValue) {
        if (newValue === undefined) return this.onRemoveRoutes()

        this.appHereMap.form.from.value = this.parcelData.parcel.search.from
        this.appHereMap.form.to.value = this.parcelData.parcel.search.to
        this.appHereMap.summary.isSet = true
        return this.onVisualize()
      },
      'activeEl.parcelId': function (newValue, oldValue) {
        if (newValue === 0) return this.onRemoveRoutes()
      },
      'activeEl.courierId': function (newValue, oldValue) {
        if (newValue > 0 && !this.appHereMap.summary.isSet) return this.onCalculate()
      }
    },
    computed: {
      ...mapGetters({
        parcelCreate: types.GETTER_PARCEL_DATA_CREATE
      })
    },
    methods: {
      onGeoCode: function (coordinates) {
        const searchService = this.here.platform.getSearchService()
        let isLast = Object.keys(this.appHereMap.form).length
        for (const item in this.appHereMap.form) {
          const geocodingParameters = {q: this.appHereMap.form[item].value}
          searchService.geocode(geocodingParameters, onSuccess => {
            const position = onSuccess.items.pop().position
            this.appHereMap.form[item].geo = {...position}
            if (!--isLast) coordinates(this.appHereMap.form)
          }, onError => {
            console.warn(onError)
          })
        }
      },
      onReverseGeoCode: function () {
        const browserData = JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE_BROWSER_DATA))
        if (browserData.position === undefined) return
        const searchService = this.here.platform.getSearchService()
        const reverseGeocodingParameters = {
          at: `${browserData.position.latitude},${browserData.position.longitude},${browserData.position.accuracy}`,
          limit: '1'
        }
        return searchService.reverseonGeoCode(reverseGeocodingParameters, onSuccess => {
          const place = Object.values(onSuccess.items).pop()
          this.appHereMap.form.from.value = `${this.here.country.name}, ${place.address.city}`
        }, onError => {
          console.warn(onError)
        })
      },
      onVisualize: function () {
        if (this.appHereMap.form.from.value.length > 2 && this.appHereMap.form.to.value.length > 2) {
          return this.onGeoCode(coordinates => {
            this.here.routingConfiguration = {
              ...this.here.routingConfiguration,
              origin: `${coordinates.from.geo.lat},${coordinates.from.geo.lng}`,
              destination: `${coordinates.to.geo.lat},${coordinates.to.geo.lng}`
            }
            const router = this.here.platform.getRoutingService(null, 8)
            router.calculateRoute(this.here.routingConfiguration, this.onDrawRoute, onError => {
              console.warn(onError)
            })
          })
        }
      },
      onDrawRoute: function (result) {
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
          this.appHereMap.summary.values.time = Number(travelSummary.duration)
          this.appHereMap.summary.values.length = Number(travelSummary.length)
          return this.here.map.getViewModel().setLookAtData({bounds: group.getBoundingBox()}, true)
        }
      },
      onRemoveRoutes: function () {
        this.appHereMap.summary.isSet = false

        this.appHereMap.summary.values.length = 0
        this.appHereMap.summary.values.time = 0
        this.appHereMap.summary.values.price = 0

        this.appHereMap.form.from.value = ''
        this.appHereMap.form.to.value = ''

        return this.here.map.getObjects().forEach(e => this.here.map.removeObject(e))
      },
      onCalculate: function () {
        if (this.activeEl.courierId === 0) return this.showAlertModal('Upozornenie', 'Nemáte zvolené kuriéra.', 'Zatvoriť')
        const courier = Object.values(this.parcelData.courier.search.user).filter(e => e.accountId === this.activeEl.courierId).pop()
        this.$store.dispatch(types.ACTION_PREFERENCE_SEARCH, {
          accountId: courier.accountId,
          name: 'Cena prepravy (eur/1km)'
        })
          .then(result => {
            this.appHereMap.profit.courier = Object.values(result).pop().value
            return this.onVisualize()
          })
          .catch(err => console.warn(err.message))
      },
      formatPrice: function (distance, price, profit) {
        const formatter = new Intl.NumberFormat('sk-SK', {style: 'currency', currency: 'EUR'})
        if (!this.appHereMap.summary.isSet) {
          const total = parseFloat(distance / 1000 * price) + profit
          return total > profit ? formatter.format(total) : formatter.format(0)
        } else if (this.parcelData.parcel.search.price === undefined && this.appHereMap.summary.isSet) {
          return formatter.format(0)
        } else {
          return formatter.format(this.parcelData.parcel.search.price)
        }
      },
      formatDuration: function (duration) {
        return `${Math.floor(duration / 60)}min ${(duration % 60)}sec`
      },
      formatDistance: function (distance) {
        return (`${parseFloat(distance / 1000).toFixed(2)}km`)
      },
      showAlertModal: function (title, text, button) {
        this.appHereMap.modal.title = title
        this.appHereMap.modal.text = text
        this.appHereMap.modal.button = button
        return bootstrap('#hereMapAlert').modal('show')
      },
      showAppliedModal: function (title, text) {
        this.appHereMap.apply.title = title
        this.appHereMap.apply.text = text
        this.appHereMap.apply.positiveButton = 'Áno, vytvoriť'
        this.appHereMap.apply.negativeButton = 'Zrušiť'
        return bootstrap('#hereParcelMapApply').modal('show')
      },
      onAutoCompletePlace: function ($event) {
        if ($event.target.value.length < 3 && $event.target.id === 'from') {
          this.appHereMap.form.from.autoComplete = {}
        } else if ($event.target.value.length < 3 && $event.target.id === 'to') {
          this.appHereMap.form.to.autoComplete = {}
        } else {
          return this.$store.dispatch(types.ACTION_PLACE_SEARCH, {fullName: $event.target.value})
            .then(result => {
              if ($event.target.id === 'from') this.appHereMap.form.from.autoComplete = Object.values(result)
              if ($event.target.id === 'to') this.appHereMap.form.to.autoComplete = Object.values(result)
            })
            .catch(err => console.warn(err.message))
        }
      },
      onSelectPlace: function ($event) {
        if ($event.dataset.element === 'from') {
          this.appHereMap.form.from.value = $event.textContent
          this.appHereMap.form.from.autoComplete = {}
        } else if ($event.dataset.element === 'to') {
          this.appHereMap.form.to.value = $event.textContent
          this.appHereMap.form.to.autoComplete = {}
        }
      },
      onCreate: function (applied) {
        if (this.appHereMap.summary.values.time === 0 || this.appHereMap.summary.values.length === 0) {
          return this.showAlertModal('Upozornenie', 'Dľžka cesty nie je známa.', 'Zatvoriť')
        } else if (Number(parseFloat(this.appHereMap.summary.values.length / 1000 * this.appHereMap.profit.courier).toFixed(2)) > JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE_ACCOUNT_DATA)).balance) {
          return this.showAlertModal('Upozornenie', 'Nemáte dostatok penazí na účte.', 'Zatvoriť')
        } else {
          if (applied) {
            const data = Object.values(this.parcelCreate).filter(e => e.id === this.activeEl.parcelId).pop()
            let payload = {
              id: this.activeEl.parcelId,
              data: {
                sender: Number(data.sender.senderId),
                receiver: Number(data.receiver.accountId),
                categoryId: data.category.id,
                length: Number(data.length),
                width: Number(data.width),
                height: Number(data.height),
                weight: Number(data.weight),
                note: data.note
              }
            }

            this.$store.dispatch(types.ACTION_PARCEL_CREATE, payload)
              .then(result => {
                payload = {
                  shipments: [{
                    courier: this.activeEl.courierId,
                    parcelId: result.id,
                    from: this.appHereMap.form.from.value,
                    to: this.appHereMap.form.to.value,
                    status: process.env.PARCEL_NEW_STATUS_ID,
                    price: Number(parseFloat(this.appHereMap.summary.values.length / 1000 * this.appHereMap.profit.courier).toFixed(2))
                  }]
                }
                return this.$store.dispatch(types.ACTION_SHIPMENT_CREATE, payload)
              })
              .then(result => {
                this.activeEl.itemId = 1
                this.activeEl.value = 'Pridelené'
              })
              .catch(err => {
                return this.showAlertModal('Chyba', err.message, 'Zatvoriť')
              })
          } else {
            return this.showAppliedModal('Upozornenie', 'Po vytvorenie zásielky, zmena už nebude možná!')
          }
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

  div#hereMap div.autocomplete {
    width: 100%;
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

  div#hereMap div#map form button,
  div#hereMap div#map div#finish button {
    background: #176c9d;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
    z-index: 999;
  }

  div#hereMap div#map form button:hover,
  div#hereMap div#map div#finish button:hover {
    background: #187fb1;
  }

  div#hereMap div#map form button:disabled,
  div#hereMap div#map div#finish button:disabled {
    background: #095174;
  }

  div#hereMap div#map form div.form-group input {
    border: 0.13rem solid #176c9d;
    font-size: 0.8em;
    border-radius: 0.4rem;
    outline: none;
  }

  div#hereMap div#map div#finish {
    z-index: 2;
    position: absolute;
    bottom: 1rem;
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

    div#hereMap div#map div#finish {
      bottom: 3rem;
    }
  }

  @media (max-width: 430px) {
    div#hereMap div#map div#finish {
      bottom: 5rem;
    }
  }

  @media (max-width: 300px) {
    div#hereMap div#map div#finish {
      bottom: 7.5rem;
    }
  }
</style>
