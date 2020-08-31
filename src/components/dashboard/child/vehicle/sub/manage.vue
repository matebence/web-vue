<template>
  <div id="manage">
    <h1>Vozidlá</h1>
    <div
      v-show="!isSelected"
      id="new">
      <button
        @click.prevent="selectedComponent = manageComponenets()">
        <font-awesome-icon
          :icon="['fas', selectedIcon]"/>
      </button>
    </div>
    <div
      v-show="isSelected"
      id="modify">
      <button
        @click.prevent="activeEl.vehicleId = 0">
        <font-awesome-icon
          :icon="['fas', 'ban']"/>
      </button>
      <button
        @click.prevent="editVehicle()">
        <font-awesome-icon
          :icon="['fas', 'pen']"/>
      </button>
      <button
        @click.prevent="removeVehicle(false)">
        <font-awesome-icon
          :icon="['fas', 'trash']"/>
      </button>
    </div>
    <keep-alive>
      <component
        :is="selectedComponent"
        :activeEl="activeEl"
        :form="components.appCreate.form"
        @crud="
          selectedComponent = $event.component;
          selectedIcon = $event.icon"/>
    </keep-alive>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'vehicleAlert'"
        :text="components.appModal.text"
        :title="components.appModal.title"
        :button="components.appModal.button"/>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="removeVehicle($event)"
        :applyId="'vehicleApply'"
        :text="components.appApply.text"
        :title="components.appApply.title"
        :positiveButton="components.appApply.positiveButton"
        :negativeButton="components.appApply.negativeButton"/>
    </div>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

import modal from '@/components/common/modal'
import apply from '@/components/common/apply'
import crud from '@/components/dashboard/child/vehicle/sub/crud'
import verticalList from '@/components/dashboard/child/vehicle/sub/verticalList'

export default {
  created: function () {
    return this.$store.dispatch(types.ACTION_VEHICLE_SEARCH, {courier: this.signIn.accountId})
      .catch(err => console.warn(err.message))
  },
  name: 'manage',
  props: ['activeEl'],
  data: function () {
    return {
      selectedComponent: 'app-vertical-list',
      selectedIcon: 'plus',
      components: {
        appList: {
          name: 'app-vertical-list',
          icon: 'plus'
        },
        appCreate: {
          name: 'app-crud',
          icon: 'angle-left',
          form: {
            values: {
              courier: null,
              name: null,
              type: null
            }
          }
        },
        appModal: {
          text: null,
          title: null,
          button: null
        },
        appApply: {
          text: null,
          title: null,
          positiveButton: null,
          negativeButton: null
        }
      }
    }
  },
  components: {
    appCrud: crud,
    appModal: modal,
    appApply: apply,
    appVerticalList: verticalList
  },
  computed: {
    isSelected: function () {
      return this.activeEl.vehicleId !== 0
    },
    ...mapGetters({
      vehicleSearch: types.GETTER_VEHICLE_DATA_SEARCH,
      vehicleData: types.GETTER_VEHICLE_DATA,
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    manageComponenets: function () {
      if (this.selectedComponent === this.components.appCreate.name) {
        this.components.appCreate.form.values = {courier: null, name: null, type: null}
        this.selectedIcon = this.components.appList.icon
        return this.components.appList.name
      }
      if (this.selectedComponent === this.components.appList.name) {
        this.selectedIcon = this.components.appCreate.icon
        this.components.appCreate.form.values._id = undefined
        return this.components.appCreate.name
      }
    },
    showAlertModal: function (title, text, button) {
      this.components.appModal.title = title
      this.components.appModal.text = text
      this.components.appModal.button = button
      return bootstrap('#vehicleAlert').modal('show')
    },
    showAppliedModal: function (title, text) {
      this.components.appApply.title = title
      this.components.appApply.text = text
      this.components.appApply.positiveButton = 'Odstrániť'
      this.components.appApply.negativeButton = 'Zrušiť'
      return bootstrap('#vehicleApply').modal('show')
    },
    editVehicle: function () {
      const data = Object.values(this.vehicleSearch).filter(e => e._id === this.activeEl.vehicleId)
      this.selectedComponent = this.manageComponenets()
      this.activeEl.vehicleId = 0
      this.components.appCreate.form.values = {...data.pop()}
    },
    removeVehicle: function (applied) {
      if (applied) {
        const data = Object.values(this.vehicleSearch).filter(e => e._id !== this.activeEl.vehicleId)
        this.$store.commit(types.MUTATION_VEHICLE_DATA, {
          data: {
            ...this.vehicleData,
            create: data
          }
        })
        this.activeEl.vehicleId = 0
      } else {
        return this.showAppliedModal('Odstránenie', 'Naozaj chcete odstrániť vozidlo?')
      }
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

  div#manage div#new, div#manage div#modify {
    display: inline;
    float: right;
    margin-top: 1rem;
  }

  div#manage div#new button,
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

  div#manage div#new button:hover,
  div#manage div#modify button:hover {
    background: #187fb1;
  }

  div#manage div#new button:focus,
  div#manage div#modify button:focus {
    outline: 0;
  }

  div#manage div#new button svg,
  div#manage div#modify button svg {
    font-size: 0.8em;
    color: #ffffff;
  }

  @media (max-width: 1290px){
    div#manage div#new button,
    div#manage div#modify button {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.7em;
      margin-top: 1.3rem;
      margin-right: 0.5em;
    }
  }

  @media (max-width: 1200px) {
    div#manage div#new button,
    div#manage div#modify button {
      width: 1.8rem;
      height: 1.8rem;
      font-size: 0.9em;
      margin-top: 1.3rem;
      margin-right: 0.5rem;
    }
  }
</style>
