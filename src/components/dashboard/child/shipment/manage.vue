<template>
  <div id="manage">
    <h1>Zásielky</h1>
    <app-vertical-list
      :activeEl="activeEl"
      :shipment="shipment" />
  </div>
</template>

<script>
import verticalList from '@/components/dashboard/child/shipment/sub/verticalList'

export default {
  name: 'manage',
  props: ['activeEl', 'shipment'],
  components: {
    appVerticalList: verticalList
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
