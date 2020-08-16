<template>
  <div id="properties">
    <h1>Podrobnosti</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Odkiaľ</h2>
          <p>{{components.shipment.properties.from}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Kam</h2>
          <p>{{components.shipment.properties.to}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Kuriér</h2>
          <p>{{components.shipment.properties.courier}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Stav</h2>
          <p>{{components.shipment.properties.status}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo</h2>
          <p>{{components.shipment.properties.id}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Faktúra</h2>
          <a
            href="invoice/download"
            @click.prevent="onDownload"
          >{{components.shipment.properties.invoice.name}}</a>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Odosielateľ</h2>
          <p>{{components.shipment.properties.sender}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Prijímateľ</h2>
          <p>{{components.shipment.properties.receiver}}</p>
        </div>
      </div>
    </div>
    <app-modal
      :modalId="'propertiesAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button"/>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import * as types from '@/store/types'
import modal from '@/components/common/modal'

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
        },
        appModal: {
          text: null,
          title: null,
          button: null
        }
      }
    }
  },
  components: {
    appModal: modal
  },
  watch: {
    'activeEl.shipmentId': function (newValue, oldValue) {
      if (this.activeEl.shipmentId === 0) return Object.assign(this.$data, this.$options.data.apply(this))
      this.components.shipment.properties = {from: this.shipment.from, to: this.shipment.to, courier: this.shipment.courier.userName, status: this.shipment.status.name, id: this.shipment._id, invoice: {name: this.shipment.invoice.invoice, id: this.shipment.invoice._id}, sender: this.shipment.sender.name, receiver: this.shipment.receiver.name}
    }
  },
  methods: {
    onDownload: function () {
      if (this.activeEl.shipmentId === 0) return this.showAlertModal('Upozornenie', 'Nemáte zvolenú zásielku.', 'Zatvoriť')
      this.$store.dispatch(types.ACTION_INVOICE_DOWNLOAD, this.components.shipment.properties.invoice.id)
        .catch(err => this.showAlertModal('Informácia', err.message, 'Zatvoriť'))
    },
    showAlertModal: function (title, text, button) {
      this.components.appModal.title = title
      this.components.appModal.text = text
      this.components.appModal.button = button
      return bootstrap('#propertiesAlert').modal('show')
    }
  }
}
</script>

<style scoped>
  div#properties {
    height: 370px;
  }

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
    word-break: break-all;
  }

  div#properties a:hover{
    color: #616161;
  }

  @media (max-width: 765px) {
    div#properties {
      height: 670px;
    }
  }
</style>
