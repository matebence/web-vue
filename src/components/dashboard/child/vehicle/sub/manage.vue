<template>
  <div id="manage">
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
        :is="activeEl.component"
        :activeEl="activeEl"
        :form="appManage.crud.form"
        @crud="
          activeEl.component = $event.component;
          activeEl.icon = $event.icon"/>
    </keep-alive>
    <div class="modal-wrapper">
      <app-modal
        :modalId="'vehicleAlert'"
        :text="appManage.modal.text"
        :title="appManage.modal.title"
        :button="appManage.modal.button"/>
    </div>
    <div class="apply-wrapper">
      <app-apply
        @applied="removeVehicle($event)"
        :applyId="'vehicleApply'"
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
  import crud from '@/components/dashboard/child/vehicle/sub/crud'
  import verticalList from '@/components/dashboard/child/vehicle/sub/verticalList'

  export default {
    created: function () {
      return this.$store.dispatch(types.ACTION_VEHICLE_SEARCH, {courier: this.signIn.accountId})
        .catch(err => console.warn(err.message))
    },
    name: 'manage',
    props: ['appManage', 'vehicleData', 'activeEl'],
    data: function () {
      return {}
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
        signIn: types.GETTER_SIGN_IN_DATA
      })
    },
    methods: {
      manageComponenets: function () {
        if (this.activeEl.component === this.appManage.crud.name) {
          this.appManage.crud.form.values = {courier: null, name: null, type: null}
          this.activeEl.icon = this.appManage.list.icon
          return this.appManage.list.name
        }
        if (this.activeEl.component === this.appManage.list.name) {
          this.activeEl.icon = this.appManage.crud.icon
          this.appManage.crud.form.values._id = undefined
          return this.appManage.crud.name
        }
      },
      showAlertModal: function (title, text, button) {
        this.appManage.modal.title = title
        this.appManage.modal.text = text
        this.appManage.modal.button = button
        return bootstrap('#vehicleAlert').modal('show')
      },
      showAppliedModal: function (title, text) {
        this.appManage.apply.title = title
        this.appManage.apply.text = text
        this.appManage.apply.positiveButton = 'Odstrániť'
        this.appManage.apply.negativeButton = 'Zrušiť'
        return bootstrap('#vehicleApply').modal('show')
      },
      editVehicle: function () {
        const data = Object.values(this.vehicleData).filter(e => e._id === this.activeEl.vehicleId)
        this.activeEl.component = this.manageComponenets()
        this.activeEl.vehicleId = 0
        this.appManage.crud.form.values = {...data.pop()}
      },
      removeVehicle: function (applied) {
        if (applied) {
          const data = Object.values(this.vehicleData).filter(e => e._id !== this.activeEl.vehicleId)
          this.$store.dispatch(types.ACTION_VEHICLE_DELETE, {data: data, _id: this.activeEl.vehicleId})
            .catch(err => console.warn(err.message))
          this.activeEl.vehicleId = 0
        } else {
          return this.showAppliedModal('Odstránenie', 'Naozaj chcete odstrániť vozidlo?')
        }
      }
    }
  }
</script>

<style scoped>
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

  @media (max-width: 1290px) {
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
