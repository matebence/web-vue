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
        @click.prevent="activeEl.parcelId = 0">
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
        :activeEl="activeEl"
        :form="components.appCreate.form"
        @crud="
          selectedComponent = $event.component;
          selectedIcon = $event.icon;
          activeEl.itemId = $event.nav.id;
          activeEl.value = $event.nav.value;"/>
    </keep-alive>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'parcelAlert'"
        :text="components.appModal.text"
        :title="components.appModal.title"
        :button="components.appModal.button"/>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="removeParcel($event)"
        :applyId="'parcelApply'"
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
import crud from '@/components/dashboard/child/parcel/sub/crud'
import verticalList from '@/components/dashboard/child/parcel/sub/verticalList'

export default {
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
              receiver: {
                name: null,
                accountId: null
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
  watch: {
    'activeEl.parcelId': function (newValue, oldValue) {
      this.$emit('selectedParcel', newValue)
    }
  },
  computed: {
    isSelected: function () {
      return this.activeEl.parcelId !== 0
    },
    ...mapGetters({
      parcelCreate: types.GETTER_PARCEL_DATA_CREATE,
      parcelData: types.GETTER_PARCEL_DATA,
      signIn: types.GETTER_SIGN_IN_DATA
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
    showAppliedModal: function (title, text) {
      this.components.appApply.title = title
      this.components.appApply.text = text
      this.components.appApply.positiveButton = 'Odstrániť'
      this.components.appApply.negativeButton = 'Zrušiť'
      return bootstrap('#parcelApply').modal('show')
    },
    editParcel: function () {
      if (this.activeEl.parcelId > 0) {
        return this.showAlertModal('Editovanie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné editovať.', 'Zatvoriť')
      } else {
        const data = this.parcelCreate.filter(e => e.id === this.activeEl.parcelId)
        this.selectedComponent = this.manageComponenets()
        this.activeEl.parcelId = 0
        this.components.appCreate.form.values = {...data.pop()}
      }
    },
    removeParcel: function (applied) {
      if (this.activeEl.parcelId > 0) {
        return this.showAlertModal('Odstránenie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné odstrániť.', 'Zatvoriť')
      } else {
        if (applied) {
          const data = this.parcelCreate.filter(e => e.id !== this.activeEl.parcelId)
          this.$store.commit(types.MUTATION_PARCEL_DATA, {
            data: {
              ...this.parcelData,
              create: [...data]
            }
          })
          this.activeEl.parcelId = 0
        } else {
          return this.showAppliedModal('Odstránenie', 'Naozaj chcete odstrániť balík?')
        }
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
