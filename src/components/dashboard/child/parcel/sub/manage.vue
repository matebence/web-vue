<template>
  <div id="manage">
    <h1>Balíky</h1>
    <div
      v-show="!isSelected"
      id="new">
      <button
        @click.prevent="activeEl.component = manageComponenets()">
        <font-awesome-icon
          :icon="['fas', activeEl.icon]"/>
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
        :activeEl="activeEl"
        :is="activeEl.component"
        :form="appManage.crud.form"
        :appVerticalList="appVerticalList"
        @crud="
          activeEl.component = $event.component;
          activeEl.icon = $event.icon;
          activeEl.itemId = $event.nav.id;
          activeEl.value = $event.nav.value;"/>
    </keep-alive>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'parcelAlert'"
        :text="appManage.modal.text"
        :title="appManage.modal.title"
        :button="appManage.modal.button"/>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="removeParcel($event)"
        :applyId="'parcelApply'"
        :text="appManage.apply.text"
        :title="appManage.apply.title"
        :positiveButton="appManage.apply.positiveButton"
        :negativeButton="appManage.apply.negativeButton"/>
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
  props: ['appVerticalList', 'appManage', 'activeEl'],
  data: function () {
    return {
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
      if (this.activeEl.component === this.appManage.crud.name) {
        this.appManage.crud.form.values = {receiver: {name: null, accountId: null}, category: null, note: null, length: null, width: null, height: null, weight: null}
        this.activeEl.icon = this.appManage.list.icon
        return this.appManage.list.name
      }
      if (this.activeEl.component === this.appManage.list.name) {
        this.activeEl.icon = this.appManage.crud.icon
        this.appManage.crud.form.values.id = undefined
        return this.appManage.crud.name
      }
    },
    showAlertModal: function (title, text, button) {
      this.appManage.modal.title = title
      this.appManage.modal.text = text
      this.appManage.modal.button = button
      return bootstrap('#parcelAlert').modal('show')
    },
    showAppliedModal: function (title, text) {
      this.appManage.apply.title = title
      this.appManage.apply.text = text
      this.appManage.apply.positiveButton = 'Odstrániť'
      this.appManage.apply.negativeButton = 'Zrušiť'
      return bootstrap('#parcelApply').modal('show')
    },
    editParcel: function () {
      if (this.activeEl.parcelId > 0) {
        return this.showAlertModal('Editovanie', 'Ľutujeme, ale balíky pripravené na expedovanie nie je možné editovať.', 'Zatvoriť')
      } else {
        const data = this.parcelCreate.filter(e => e.id === this.activeEl.parcelId)
        this.activeEl.component = this.manageComponenets()
        this.activeEl.parcelId = 0
        this.appManage.crud.form.values = data.pop()
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
              create: data
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
