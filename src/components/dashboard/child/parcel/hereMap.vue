<template>
  <div id="hereMap">
    <div id="map" ref="map" style="width: 100%; height: 100%">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" id="from" placeholder="Odkiaľ">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="to" placeholder="Kam">
        </div>
        <button type="submit" class="btn btn-primary">Potvrdiť</button>
      </form>
      <div id="summary">
        <ul>
          <li><span>Dľžka:</span> 90km</li>
          <li><span>Čas:</span> 1h41m</li>
          <li><span>Cena:</span> 10,50€</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-mapevents'
import bleskMarker from '@/assets/img/blesk-marker.png'

export default {
  created: function () {
    this.platform = new H.service.Platform({
      'apikey': process.env.HERE_JS_SDK_API
    })
  },
  mounted: function () {
    this.map = new H.Map(
      this.$refs.map,
      this.platform.createDefaultLayers().raster.normal.map, {zoom: 8, center: {lng: 19.7508084, lat: 48.62366}}
    )
    const mapEvents = new H.mapevents.MapEvents(this.map)
    new H.mapevents.Behavior(mapEvents)

    function geocode(platform) {
      var geocoder = platform.getSearchService(),
        geocodingParameters = {
          q: 'Nitra'
        };

      geocoder.geocode(
        geocodingParameters,
        onSuccess,
        onError
      );
    }
    function onError(error) {
      alert('Can\'t reach the remote server');
    }

    function onSuccess(result) {
      var locations = result.items;
      console.log(locations)
      /*
       * The styling of the geocoding response on the map is entirely under the developer's control.
       * A representitive styling can be found the full JS + HTML code of this example
       * in the functions below:
       */
      // ... etc.
    }

    geocode(this.platform)
      const routingParameters = {
      routingMode: 'fast',
      transportMode: 'car',
      origin: '48.134650,17.112390',
      destination: '48.308647,18.053315',
      return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
    }

    const onResult = (result) => {
      if (result.routes.length) {
        var route = result.routes[0]
        let duration = 0,
          distance = 0;
        route.sections.forEach((section) => {
          distance += section.travelSummary.length;
          duration += section.travelSummary.duration;
        });
        console.log(duration)
        console.log(distance)

        result.routes[0].sections.forEach(section => {
          let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline)
          const routeLine = new H.map.Group()
          const pngIcon = new H.map.Icon(bleskMarker)
          const startMarker = new H.map.Marker(section.departure.place.location, {
            icon: pngIcon
          })
          let endMarker = new H.map.Marker(section.arrival.place.location, {
            icon: pngIcon
          })

          const routeOutline = new H.map.Polyline(linestring, {
            style: {
              lineWidth: 10,
              strokeColor: 'rgb(23, 108, 157)',
              lineTailCap: 'arrow-tail',
              lineHeadCap: 'arrow-head'
            }
          })

          const routeArrows = new H.map.Polyline(linestring, {
            style: {
              lineWidth: 10,
              fillColor: 'white',
              strokeColor: 'rgb(255, 255, 255, 1)',
              lineDash: [0, 2],
              lineTailCap: 'arrow-tail',
              lineHeadCap: 'arrow-head'
            }
          })

          this.map.addObjects([routeLine, startMarker, endMarker])
          routeLine.addObjects([routeOutline, routeArrows])
          this.map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()})
        })
      }
    }

    const router = this.platform.getRoutingService(null, 8)
    router.calculateRoute(routingParameters, onResult, function (error) { console.log(error) })
    router.calculateRoute(routingParameters, function (success) { console.log(success) })
  },
  name: 'hereMap',
  data: function () {
    return {
      map: {},
      platform: {}
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

  div#hereMap div#map form button {
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
  }

  div#hereMap div#map form button:hover {
    background: #187fb1;
  }

  div#hereMap div#map form div.form-group input {
    border: 0.13rem solid #176c9d;
    font-size: 0.8em;
    border-radius: 3rem;
    outline: none;
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

  @media (max-width: 1440px) {
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
    }

    div#hereMap form {
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
    div#hereMap div#map form {
      width: 70%;
    }

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
