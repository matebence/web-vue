<template>
  <div id="properties">
    <h1>Podrobnosti</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Odkiaľ</h2>
          <p>{{appProperties.form.values.from}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Kam</h2>
          <p>{{appProperties.form.values.to}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Kuriér</h2>
          <p>{{appProperties.form.values.courier}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Stav</h2>
          <p>{{appProperties.form.values.status}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Identifikačné číslo</h2>
          <p>{{appProperties.form.values.id}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Faktúra</h2>
          <a
            href="invoice/download"
            @click.prevent="onDownload"
          >{{appProperties.form.values.invoice.name}}</a>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Odosielateľ</h2>
          <p>{{appProperties.form.values.sender}}</p>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Prijímateľ</h2>
          <p>{{appProperties.form.values.receiver}}</p>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'propertiesAlert'"
        :text="appProperties.modal.text"
        :title="appProperties.modal.title"
        :button="appProperties.modal.button"/>
    </div>
  </div>
</template>

<script>
  import bootstrap from 'jquery'

  import * as types from '@/store/types'

  import modal from '@/components/common/modal'

  export default {
    name: 'properties',
    props: ['appProperties', 'shipmentData', 'activeEl'],
    data: function () {
      return {}
    },
    components: {
      appModal: modal
    },
    watch: {
      'activeEl.shipmentId': function (newValue, oldValue) {
        if (this.activeEl.shipmentId === 0) return Object.assign(this.$data, this.$options.data.apply(this))
        this.appProperties.form.values = {
          from: this.shipmentData.from,
          to: this.shipmentData.to,
          courier: this.shipmentData.courier.userName,
          status: this.shipmentData.status.name,
          id: this.shipmentData._id,
          invoice: {name: this.shipmentData.invoice.invoice, id: this.shipmentData.invoice._id},
          sender: this.shipmentData.sender.name,
          receiver: this.shipmentData.receiver.name
        }
      }
    },
    methods: {
      onDownload: function () {
        if (this.activeEl.shipmentId === 0) return this.showAlertModal('Upozornenie', 'Nemáte zvolenú zásielku.', 'Zatvoriť')
        this.$store.dispatch(types.ACTION_INVOICE_DOWNLOAD, this.appProperties.form.values.invoice.id)
          .catch(err => this.showAlertModal('Informácia', err.message, 'Zatvoriť'))
      },
      showAlertModal: function (title, text, button) {
        this.appProperties.modal.title = title
        this.appProperties.modal.text = text
        this.appProperties.modal.button = button
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
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#properties h2 {
    font-size: 1.3em;
    font-weight: 900;
    color: #979797;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  div#properties p,
  div#properties a {
    color: #000000;
    font-size: 1em;
    font-weight: 900;
    word-break: break-all;
  }

  div#properties a:hover {
    color: #616161;
  }

  @media (max-width: 765px) {
    div#properties {
      height: 670px;
    }
  }
</style>
