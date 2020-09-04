<template>
  <div id="manage">
    <h1>Klienti</h1>
    <div
      v-show="isSelected"
      id="modify">
      <button
      @click.prevent="activeEl.shipmentId = 0">
        <font-awesome-icon
          :icon="['fas', 'ban']"/>
      </button>
      <button
        v-show="isNewRequeste"
        @click.prevent="onAcceptShipment">
        <font-awesome-icon
          :icon="['fas', 'check']"/>
      </button>
    </div>
    <app-vertical-list
      :activeEl="activeEl"
      :shipment="shipment" />
  </div>
</template>

<script>
import * as types from '@/store/types'
import verticalList from '@/components/dashboard/child/client/sub/verticalList'

export default {
  name: 'manage',
  props: ['activeEl', 'shipment'],
  components: {
    appVerticalList: verticalList
  },
  computed: {
    isSelected: function () {
      return this.activeEl.shipmentId !== 0
    },
    isNewRequeste: function () {
      return this.activeEl.itemId === 1
    }
  },
  methods: {
    onAcceptShipment: function () {
      const data = Object.values(this.shipment.search).filter(e => e._id === this.activeEl.shipmentId).pop()
      return this.$store.dispatch(types.ACTION_SHIPMENT_UPDATE, {_id: data._id, courier: data.courier.courierId, parcelId: data.parcelId, from: data.from, to: data.to, status: process.env.PARCEL_ACCEPTED_STATUS_ID, price: data.price, express: data.express})
        .then(result => {
          this.activeEl.itemId = 2
          this.activeEl.shipmentId = 0
        })
        .catch(err => console.warn(err.message))
    }
  }
}
</script>

<style scoped>
  div#manage h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#manage div#modify {
    display: inline;
    float: right;
    margin-top: 1rem;
  }

  div#manage div#modify button {
    display: inline;
    text-align: right;
    margin-top: 1.3rem;
    margin-right: 0.5rem;
    background: #176c9d;
    border: none;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.3rem;
    text-align: center;
    font-size: 0.9em;
  }

  div#manage div#modify button:hover {
    background: #187fb1;
  }

  div#manage div#modify button:focus {
    outline: 0;
  }

  div#manage div#modify button svg {
    font-size: 0.8em;
    color: #ffffff;
  }

  @media (max-width: 1290px){
    div#manage div#modify button {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.7em;
      margin-top: 1.3rem;
      margin-right: 0.5em;
    }
  }

  @media (max-width: 1200px) {
    div#manage div#modify button {
      width: 1.8rem;
      height: 1.8rem;
      font-size: 0.9em;
      margin-top: 1.3rem;
      margin-right: 0.5rem;
    }
  }
</style>
