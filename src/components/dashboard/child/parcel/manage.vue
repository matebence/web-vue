<template>
  <div id="manage">
    <h1>Balíky</h1>
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
        @click.prevent="deselectParcel()">
        <font-awesome-icon
          :icon="['fas', 'ban']"/>
      </button>
      <button
        @click.prevent="editParcel()">
        <font-awesome-icon
          :icon="['fas', 'pen']"/>
      </button>
      <button
        @click.prevent="removeParcel(false)">
        <font-awesome-icon
          :icon="['fas', 'trash']"/>
      </button>
    </div>
    <keep-alive>
      <component
        :is="selectedComponent"
        :activeEl="components.activeEl"
        :form="components.appCreate.form"
        @createOrUpdate="
          selectedComponent = $event.component;
          selectedIcon = $event.icon;
          components.activeEl.tabs.tabId = $event.nav.id;
          components.activeEl.tabs.value = $event.nav.value;">
      </component>
    </keep-alive>
    <app-modal
      :modalId="'parcelAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button">
    </app-modal>
    <app-confirm
      @confirmed="removeParcel($event)"
      :confirmId="'parcelConfirm'"
      :text="components.appConfirm.text"
      :title="components.appConfirm.title"
      :positiveButton="components.appConfirm.positiveButton"
      :negativeButton="components.appConfirm.negativeButton">
    </app-confirm>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

import modal from '@/components/common/modal'
import confirm from '@/components/common/confirm'
import parcelList from '@/components/dashboard/sub/parcel/parcelList'
import createUpdate from '@/components/dashboard/sub/parcel/createUpdate'

export default {
  name: 'manage',
  data: function () {
    return {
      selectedComponent: 'app-parcel-list',
      selectedIcon: 'plus',
      components: {
        appList: {
          name: 'app-parcel-list',
          icon: 'plus'
        },
        appCreate: {
          name: 'app-create-update',
          icon: 'angle-left',
          form: {
            values: {
              receiver: {
                name: null,
                userId: null
              },
              category: null,
              note: null,
              length: null,
              width: null,
              height: null,
              weight: null
            }
          }
        },
        appModal: {
          text: null,
          title: null,
          button: null
        },
        appConfirm: {
          text: null,
          title: null,
          positiveButton: null,
          negativeButton: null
        },
        activeEl: {
          tabs: {
            tabId: 1,
            value: 'Pridelené'
          },
          parcels: {
            parcelId: 0
          }
        }
      }
    }
  },
  components: {
    appConfirm: confirm,
    appCreateUpdate: createUpdate,
    appModal: modal,
    appParcelList: parcelList
  },
  watch: {
    'components.activeEl.parcels.parcelId': function (newValue, oldValue) {
      this.$emit('selectedParcel', newValue)
    }
  },
  computed: {
    isSelected: function () {
      return this.components.activeEl.parcels.parcelId !== 0
    },
    ...mapGetters({
      parcel: types.GETTER_PARCEL_DEFAULT
    })
  },
  methods: {
    manageComponenets: function () {
      if (this.selectedComponent === this.components.appCreate.name) {
        this.selectedIcon = this.components.appList.icon
        return this.components.appList.name
      }
      if (this.selectedComponent === this.components.appList.name) {
        this.selectedIcon = this.components.appCreate.icon
        this.components.appCreate.form.values.id = undefined
        return this.components.appCreate.name
      }
    },
    showAlertModal: function (title, text, button) {
      this.components.appModal.title = title
      this.components.appModal.text = text
      this.components.appModal.button = button
      return bootstrap('#parcelAlert').modal('show')
    },
    showConfirmModal: function (title, text) {
      this.components.appConfirm.title = title
      this.components.appConfirm.text = text
      this.components.appConfirm.positiveButton = 'Áno'
      this.components.appConfirm.negativeButton = 'Nie'
      return bootstrap('#parcelConfirm').modal('show')
    },
    deselectParcel: function () {
      this.components.activeEl.parcels.parcelId = 0
    },
    editParcel: function () {
      if (this.components.activeEl.parcels.parcelId > 0) {
        return this.showAlertModal('Editovanie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné editovať.', 'Zatvoriť')
      } else {
        const data = this.parcel.data.create.filter(e => e.id === this.components.activeEl.parcels.parcelId)
        this.selectedComponent = this.manageComponenets()
        this.deselectParcel()
        this.components.appCreate.form.values = {...data.pop()}
      }
    },
    removeParcel: function (confirmed) {
      if (this.components.activeEl.parcels.parcelId > 0) {
        return this.showAlertModal('Odstránenie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné odstrániť.', 'Zatvoriť')
      } else {
        if (confirmed) {
          const data = this.parcel.data.create.filter(e => e.id !== this.components.activeEl.parcels.parcelId)
          this.$store.commit(types.MUTATION_PARCEL_DATA, {
            data: {
              ...this.parcel.data,
              create: [...data]
            }
          })
          return this.deselectParcel()
        }
        return this.showConfirmModal('Odstránenie', 'Naozaj chcete odstrániť balík?')
      }
    }
  }
}
</script>

<style scoped>
  div#manage h1 {
    margin-top: 1em;
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
