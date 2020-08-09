<template>
  <div id="list">
    <ul class="couriers">
      <li
        v-bind:key="user.accountId"
        v-for="user in courier.user"
        @click.prevent="selectedCourier(user)"
        :class="{active: courier.activeEl.courierId === user.accountId && activeEl.parcels.parcelId !== 0}">
        <ul class="courier">
          <li><i :data-letters="`${user.firstName.substr(0, 1)}${user.lastName.substr(0, 1)}`"></i></li>
          <li><p>{{user.firstName}} {{user.lastName}}</p></li>
        </ul>
      </li>
    </ul>
    <app-modal
      :modalId="'courierAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button"/>
  </div>
</template>

<script>
import bootstrap from 'jquery'

import modal from '@/components/common/modal'

export default {
  name: 'list',
  props: ['courier', 'parcel', 'activeEl'],
  data: function () {
    return {
      components: {
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
    'parcel.shipment.courier.courierId': function (newValue, oldValue) {
      this.courier.activeEl.courierId = newValue
    },
    'activeEl.parcels.parcelId': function (newValue, oldValue) {
      if (newValue <= 0) this.courier.activeEl.courierId = 0
    }
  },
  methods: {
    showAlertModal: function (title, text, button) {
      this.components.appModal.title = title
      this.components.appModal.text = text
      this.components.appModal.button = button
      return bootstrap('#courierAlert').modal('show')
    },
    selectedCourier: function (el) {
      if (this.activeEl.parcels.parcelId > 0) return
      if (this.activeEl.parcels.parcelId === 0) return this.showAlertModal('Upozornenie', 'Nemáte zvolený balík.', 'Zatvoriť')
      this.courier.activeEl.courierId = el.accountId
    }
  }
}
</script>

<style scoped>
  div#list ul.couriers {
    margin-top: 2rem;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
    overflow: auto;
    height: 7rem;
  }

  div#list ul.couriers li {
    margin-right: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
  }

  div#list ul.couriers li:hover, #dashboard ul.couriers li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#list ul.couriers li ul.courier li [data-letters]:before {
    content: attr(data-letters);
    border: solid 0.1rem #ffffff;
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 50%;
    border: solid 0.1rem #176c9d;
    background: transparent;
    color: #176c9d;
  }
</style>
