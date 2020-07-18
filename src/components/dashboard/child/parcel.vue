<template>
  <div id="parcel">
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
        @parcelCreated="
          selectedComponent = $event.component;
          selectedIcon = $event.icon;
          components.activeEl.tabs.id = $event.nav.id;
          components.activeEl.tabs.value = $event.nav.value;">
      </component>
    </keep-alive>
    <app-modal
      :id="'modalAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button">
    </app-modal>
    <app-confirm
      @confirmed="removeParcel($event)"
      :id="'modalConfirm'"
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
import list from '@/components/dashboard/sub/parcel/list'
import create from '@/components/dashboard/sub/parcel/create'

export default {
  name: 'parcel',
  data: function () {
    return {
      selectedComponent: 'app-list',
      selectedIcon: 'plus',
      components: {
        appList: {
          name: 'app-list',
          icon: 'plus'
        },
        appCreate: {
          name: 'app-create',
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
            id: 1,
            value: 'Pridelené'
          },
          parcels: {
            id: 0
          }
        }
      }
    }
  },
  components: {
    appConfirm: confirm,
    appCreate: create,
    appModal: modal,
    appList: list
  },
  computed: {
    isSelected () {
      return this.components.activeEl.parcels.id !== 0
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
      return bootstrap('#modalAlert').modal('show')
    },
    showConfirmModal: function (title, text) {
      this.components.appConfirm.title = title
      this.components.appConfirm.text = text
      this.components.appConfirm.positiveButton = 'Áno'
      this.components.appConfirm.negativeButton = 'Nie'
      return bootstrap('#modalConfirm').modal('show')
    },
    deselectParcel: function () {
      this.components.activeEl.parcels.id = 0
    },
    editParcel: function () {
      if (this.components.activeEl.parcels.id > 0) {
        return this.showAlertModal('Editovanie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné editovať.', 'Zatvoriť')
      } else {
        const data = this.parcel.data.create.filter(e => e.id === this.components.activeEl.parcels.id)
        this.selectedComponent = this.manageComponenets()
        this.deselectParcel()
        this.components.appCreate.form.values = {...data.pop()}
      }
    },
    removeParcel: function (confirmed) {
      if (this.components.activeEl.parcels.id > 0) {
        return this.showAlertModal('Odstránenie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné odstrániť.', 'Zatvoriť')
      } else {
        if (confirmed) {
          const data = this.parcel.data.create.filter(e => e.id !== this.components.activeEl.parcels.id)
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
  div#parcel h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }

  div#parcel div#new, div#parcel div#modify {
    display: inline;
    float: right;
    margin-top: 1rem;
  }

  div#parcel div#new button,
  div#parcel div#modify button {
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

  div#parcel div#new button:hover,
  div#parcel div#modify button:hover {
    background: #187fb1;
  }

  div#parcel div#new button:focus,
  div#parcel div#modify button:focus {
    outline: 0;
  }

  div#parcel div#new button svg,
  div#parcel div#modify button svg {
    font-size: 0.8em;
    color: #ffffff;
  }

  @media (max-width: 1290px){
    div#parcel div#new button,
    div#parcel div#modify button {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.7em;
      margin-top: 1.3rem;
      margin-right: 0.5em;
    }
  }

  @media (max-width: 1200px) {
    div#parcel div#new button,
    div#parcel div#modify button {
      width: 1.8rem;
      height: 1.8rem;
      font-size: 0.9em;
      margin-top: 1.3rem;
      margin-right: 0.5rem;
    }
  }
</style>
