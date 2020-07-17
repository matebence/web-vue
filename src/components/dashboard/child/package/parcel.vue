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
        @click.prevent="removeParcel()">
        <font-awesome-icon
          :icon="['fas', 'trash']"/>
      </button>
    </div>
    <keep-alive>
      <component
        :is="selectedComponent"
        :navigation="navigation"
        @parcelCreated="
          selectedComponent = $event.component;
          selectedIcon = $event.icon;
          navigation.activeEl.tabs.id = $event.nav.id;
          navigation.activeEl.tabs.value = $event.nav.value;">
      </component>
    </keep-alive>
    <app-modal
      :id="'modalAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button">
    </app-modal>
  </div>
</template>

<script>
import bootstrap from 'jquery'

import modal from '@/components/common/modal'
import list from '@/components/dashboard/sub/package/list'
import create from '@/components/dashboard/sub/package/create'

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
          icon: 'angle-left'
        },
        appModal: {
          text: null,
          title: null,
          button: null
        }
      },
      navigation: {
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
    appCreate: create,
    appModal: modal,
    appList: list
  },
  computed: {
    isSelected () {
      return this.navigation.activeEl.parcels.id !== 0
    }
  },
  methods: {
    manageComponenets: function () {
      if (this.selectedComponent === this.components.appCreate.name) {
        this.selectedIcon = this.components.appList.icon
        return this.components.appList.name
      }
      if (this.selectedComponent === this.components.appList.name) {
        this.selectedIcon = this.components.appCreate.icon
        return this.components.appCreate.name
      }
    },
    deselectParcel: function () {
      this.navigation.activeEl.parcels.id = 0
    },
    editParcel: function () {
      if (this.navigation.activeEl.parcels.id > 0) {
        this.components.appModal.title = 'Editovanie'
        this.components.appModal.text = 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné editovať'
        this.components.appModal.button = 'Zatvoriť'
        return bootstrap('#modalAlert').modal('show')
      }
    },
    removeParcel: function () {
      if (this.navigation.activeEl.parcels.id > 0) {
        this.components.appModal.title = 'Odstránenie'
        this.components.appModal.text = 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné odstrániť'
        this.components.appModal.button = 'Zatvoriť'
        return bootstrap('#modalAlert').modal('show')
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
