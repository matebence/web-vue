<template>
  <div id="map" style="width: 100%; height: 100%;">
  </div>
</template>

<script>
export default {
  created: function () {
    const platform = new H.service.Platform({'apikey': process.ENV.HERE_JS_SDK_API})
    const targetElement = document.getElementById('mapContainer')
    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map, {zoom: 10, center: { lat: 52.51, lng: 13.4 }})
  },
  name: 'map'
}
</script>

<style scoped>
</style>
