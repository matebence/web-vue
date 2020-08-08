<template>
  <div id="manage">
    <h1>Zásielky</h1>
    <app-shipment-list
      :activeEl="activeEl"/>
  </div>
</template>

<script>
import shipmentList from '@/components/dashboard/sub/shipment/shipmentList'

export default {
  name: 'manage',
  props: ['activeEl'],
  components: {
    appShipmentList: shipmentList
  }
}
</script>

<style scoped>
  div#manage h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }
</style>
