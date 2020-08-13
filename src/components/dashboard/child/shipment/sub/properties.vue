<template>
  <div id="properties">
    <h1>Podrobnosti</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <h2>Odkiaľ</h2>
          <p>{{components.shipment.properties.from}}</p>
        </div>
        <div class="col-sm-6">
          <h2>Kam</h2>
          <p>{{components.shipment.properties.to}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <h2>Kuriér</h2>
          <p>{{components.shipment.properties.courier}}</p>
        </div>
        <div class="col-sm-6">
          <h2>Stav</h2>
          <p>{{components.shipment.properties.from}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <h2>Identifikačné číslo</h2>
          <p>{{components.shipment.properties.id}}</p>
        </div>
        <div class="col-sm-6">
          <h2>Faktúra</h2>
          <a
            href="invoice/download"
            @click.prevent="onDownload"
          >{{components.shipment.properties.invoice.name}}</a>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <h2>Odosielateľ</h2>
          <p>{{components.shipment.properties.sender}}</p>
        </div>
        <div class="col-sm-6">
          <h2>Prijímateľ</h2>
          <p>{{components.shipment.properties.receiver}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types'

export default {
  name: 'properties',
  props: ['activeEl', 'shipment', 'parcel'],
  data: function () {
    return {
      components: {
        shipment: {
          properties: {
            from: 'Mesto vyzdivnutia zásielky',
            to: 'Mesto odovzdania zásielky',
            courier: 'Meno kuriéra',
            status: 'Stav zásielky',
            id: 'Identifikačné číslo zásielky',
            sender: 'Meno odosielatela',
            receiver: 'Meno prijímatela',
            invoice: {
              name: 'Faktúra vo forme .pdf',
              id: null
            }
          }
        }
      }
    }
  },
  watch: {
    'activeEl.shipments.shipmentId': function (newValue, oldValue) {
      if (this.activeEl.shipments.shipmentId === 0) return Object.assign(this.$data, this.$options.data.apply(this))
      const shipment = Object.values(this.shipment).filter(e => e._id === this.activeEl.shipments.shipmentId).pop()
      const parcel = Object.values(this.parcel).filter(e => e.id === shipment.parcelId).pop()
      this.components.shipment.properties = {from: shipment.from, to: shipment.to, courier: shipment.courier.userName, status: shipment.status.name, id: shipment._id, invoice: {name: shipment.invoice.invoice, id: shipment.invoice._id}, sender: parcel.sender.name, receiver: parcel.receiver.name}
    }
  },
  methods: {
    onDownload: function () {
      this.$store.dispatch(types.ACTION_INVOICE_DOWNLOAD, this.components.shipment.properties.invoice.id)
    }
  }
}
</script>

<style scoped>
  div#properties h1 {
    margin-top: 1em;
    margin-left: 0.5em;
    font-size: 2em;
    display: inline-block;
  }

  div#properties h2 {
    font-size: 1.3em;
    font-weight: 900;
    color: #a5a3a5;
    margin-top: 1.5em;
    margin-bottom: 0.3em;
  }

  div#properties p, div#properties a {
    color: #000000;
    font-size: 1em;
    font-weight: 900;
  }

  div#properties a:hover{
    color: #616161;
  }
</style>
