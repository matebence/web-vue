<template>
  <div id="security">
    <h1>Poloha</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="country">Štát</label>
          <input
            v-model="components.appSecurity.form.place.values.country"
            @input="$v.components.appSecurity.form.place.values.country.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.country.$error && $v.components.appSecurity.form.place.values.country.$dirty, invalid: $v.components.appSecurity.form.place.values.country.$error}"
            autofocus
            placeholder="Názov štátu"
            autocomplete="off"
            type="text"
            name="country"
            id="country" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="region">Kraj</label>
          <input
            v-model="components.appSecurity.form.place.values.region"
            @input="$v.components.appSecurity.form.place.values.region.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.region.$error && $v.components.appSecurity.form.place.values.region.$dirty, invalid: $v.components.appSecurity.form.place.values.region.$error}"
            autocomplete="off"
            type="text"
            name="region"
            placeholder="Názov kraja"
            id="region" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="district">Okres</label>
          <input
            v-model="components.appSecurity.form.place.values.district"
            @input="$v.components.appSecurity.form.place.values.district.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.district.$error && $v.components.appSecurity.form.place.values.district.$dirty, invalid: $v.components.appSecurity.form.place.values.district.$error}"
            autocomplete="off"
            type="text"
            name="district"
            placeholder="Názov okresu"
            id="district" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="place">Mesto</label>
          <input
            v-model="components.appSecurity.form.place.values.place"
            @input="$v.components.appSecurity.form.place.values.place.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.place.$error && $v.components.appSecurity.form.place.values.place.$dirty, invalid: $v.components.appSecurity.form.place.values.place.$error}"
            autocomplete="off"
            type="text"
            name="place"
            placeholder="Názov mesta"
            id="place" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="street">Adresa</label>
          <input
            v-model="components.appSecurity.form.place.values.street"
            @input="$v.components.appSecurity.form.place.values.street.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.street.$error && $v.components.appSecurity.form.place.values.street.$dirty, invalid: $v.components.appSecurity.form.place.values.street.$error}"
            autocomplete="off"
            type="text"
            name="street"
            placeholder="Ulica"
            id="street" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="zip">PSČ</label>
          <input
            v-model="components.appSecurity.form.place.values.zip"
            @input="$v.components.appSecurity.form.place.values.zip.$touch()"
            :class="{valid: !$v.components.appSecurity.form.place.values.zip.$error && $v.components.appSecurity.form.place.values.zip.$dirty, invalid: $v.components.appSecurity.form.place.values.zip.$error}"
            autocomplete="off"
            type="number"
            name="zip"
            placeholder="PSČ"
            id="zip" />
        </div>
      </div>
    </div>
    <h1>Heslo</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="new-password">Nové heslo</label>
          <input
            v-model="components.appSecurity.form.credentials.values.password"
            @input="$v.components.appSecurity.form.credentials.values.password.$touch()"
            :class="{valid: !$v.components.appSecurity.form.credentials.values.password.$error && $v.components.appSecurity.form.credentials.values.password.$dirty, invalid: $v.components.appSecurity.form.credentials.values.password.$error}"
            autocomplete="off"
            type="password"
            name="new-password"
            value=""
            id="new-password" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="confirm-new-password">Potvrdenie nového hesla</label>
          <input
            v-model="components.appSecurity.form.credentials.values.confirmPassword"
            @input="$v.components.appSecurity.form.credentials.values.confirmPassword.$touch()"
            :class="{valid: !$v.components.appSecurity.form.credentials.values.confirmPassword.$error && $v.components.appSecurity.form.credentials.values.confirmPassword.$dirty, invalid: $v.components.appSecurity.form.credentials.values.confirmPassword.$error}"
            autocomplete="off"
            type="password"
            name="confirm-new-password"
            value=""
            id="confirm-new-password" />
        </div>
      </div>
    </div>
    <button
      :disabled="$v.components.appSecurity.form.place.values.zip.$invalid || $v.components.appSecurity.form.place.values.street.$invalid || $v.components.appSecurity.form.place.values.place.$invalid || $v.components.appSecurity.form.place.values.district.$invalid || $v.components.appSecurity.form.place.values.region.$invalid || $v.components.appSecurity.form.place.values.country.$invalid "
      @click.prevent="onUpdate(false)"
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
    <div id="confirm-wrapper">
      <app-confirm
        @confirmed="onUpdate($event)"
        :confirmId="'securityConfirm'"
        :text="components.appConfirm.text"
        :title="components.appConfirm.title"
        :positiveButton="components.appConfirm.positiveButton"
        :negativeButton="components.appConfirm.negativeButton"/>
    </div>
    <div id="alert-wrapper">
      <app-alert
        :condition="components.appAlert.condition"
        :type="components.appAlert.type"
        :text="components.appAlert.text"/>
    </div>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import confirm from '@/components/common/confirm'
import {required, numeric, sameAs} from 'vuelidate/lib/validators'

export default {
  created: function () {
    this.components.appSecurity.form.place.values = {...this.userProfile.places}
  },
  name: 'security',
  data: function () {
    return {
      components: {
        appSecurity: {
          form: {
            place: {
              values: {
                country: null,
                region: null,
                district: null,
                place: null,
                street: null,
                zip: null
              }
            },
            credentials: {
              values: {
                confirmPassword: null,
                password: null
              }
            }
          }
        },
        appConfirm: {
          text: null,
          title: null,
          button: null
        },
        appAlert: {
          condition: [],
          type: [],
          text: []
        }
      }
    }
  },
  validations: {
    components: {
      appSecurity: {
        form: {
          place: {
            values: {
              country: {
                required,
                alpha: value => new RegExp(/^[\D ]+$/).test(value)
              },
              region: {
                required,
                alpha: value => new RegExp(/^[\D ]+$/).test(value)
              },
              district: {
                required,
                alpha: value => new RegExp(/^[\D ]+$/).test(value)
              },
              place: {
                required,
                alpha: value => new RegExp(/^[\D ]+$/).test(value)
              },
              street: {
                required,
                alpha: value => new RegExp(/^[\D ]+[0-9]*$/).test(value)
              },
              zip: {
                required,
                numeric
              }
            }
          },
          credentials: {
            values: {
              confirmPassword: {
                required,
                sameAs: sameAs(vm => {
                  return vm.password
                })
              },
              password: {
                required,
                contains: value => new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})/g).test(value)
              }
            }
          }
        }
      }
    }
  },
  components: {
    appConfirm: confirm,
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      userProfile: types.GETTER_USER_DATA_GET,
      genders: types.GETTER_GENDER_DATA_GET_ALL
    })
  },
  methods: {
    showConfirmedModal: function (title, text) {
      this.components.appConfirm.title = title
      this.components.appConfirm.text = text
      this.components.appConfirm.positiveButton = 'Potvrdiť'
      this.components.appConfirm.negativeButton = 'Zrušiť'
      return bootstrap('#securityConfirm').modal('show')
    },
    showAlertModal: function (condition, type, text) {
      this.components.appAlert.condition = condition
      this.components.appAlert.type = type
      this.components.appAlert.text = text
    },
    onUpdate: function ($event) {
      if ($event) {
        let promises = []
        if (this.$v.components.appSecurity.form.place.values.zip.$dirty || this.$v.components.appSecurity.form.place.values.street.$dirty || this.$v.components.appSecurity.form.place.values.place.$dirty || this.$v.components.appSecurity.form.place.values.district.$dirty || this.$v.components.appSecurity.form.place.values.region.$dirty || this.$v.components.appSecurity.form.place.values.country.$dirty) {
          const placeData = {accountId: this.userProfile.accountId, places: {country: this.components.appSecurity.form.place.values.country, region: this.components.appSecurity.form.place.values.region, district: this.components.appSecurity.form.place.values.district, place: this.components.appSecurity.form.place.values.place, street: this.components.appSecurity.form.place.values.street, zip: this.components.appSecurity.form.place.values.zip, code: this.userProfile.places.code}, firstName: this.userProfile.firstName, lastName: this.userProfile.lastName, gender: this.userProfile.gender, balance: this.userProfile.balance, tel: this.userProfile.tel}
          promises.push(this.$store.dispatch(types.ACTION_USER_UPDATE, placeData))
        }
        if (!this.$v.components.appSecurity.form.credentials.values.confirmPassword.$invalid || !this.$v.components.appSecurity.form.credentials.values.confirmPassword.$invalid) {
          const accountData = {accountId: this.userProfile.accountId, userName: this.userProfile.userName, email: this.userProfile.email, ...this.components.appSecurity.form.credentials.values}
          promises.push(this.$store.dispatch(types.ACTION_ACCOUNT_UPDATE, accountData))
        }
        Promise.all(promises)
          .then(result => {
            this.showAlertModal([result !== null], ['alert-success'], ['Údaje sa úspešne aktualizovali'])
            bootstrap('#securityConfirm').modal('hide')
          })
          .catch(err => {
            this.showAlertModal([err !== null], ['alert-danger'], [err.message])
            bootstrap('#securityConfirm').modal('hide')
          })
      }
      return this.showConfirmedModal('Potvrdenie', 'Pre uplatnenie zmien prosím zadajte Vaše heslo:')
    }
  }
}
</script>

<style scoped>
  ::placeholder {
    color: #dcdcdc;
  }

  div#security {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem;
  }

  div#security h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#security label {
    font-size: 1.2em;
    font-weight: 900;
    color: #979797;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  div#security div.row {
    margin-top: 2rem;
  }

  div#security input[type="text"],
  div#security input[type="number"],
  div#security input[type="password"] {
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 2rem;
    display: block;
    border: none;
    color: #000000;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#security input[type="text"]:disabled,
  div#security input[type="number"]:disabled,
  div#security input[type="password"]:disabled {
    color: #115176;
  }

  div#security select {
    background: #ffffff;
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 3rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #000000;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#security select:focus {
    background: #ffffff;
  }

  div#security option {
    background: #ffffff;
  }

  div#security button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
    width: 3rem;
    height: 3rem;
    z-index: 999;
  }

  div#security button:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#security button:disabled {
    opacity: .65;
    background: #095174;
  }

  div#security div#alert-wrapper {
    width: 30rem;
    position: relative;
    margin: 0 auto;
    margin-top: 3rem;
  }

  div#security input.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#security input.valid {
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 768px) {
    div#security button {
      margin-top: 2rem;
      margin-left: 1rem;
      position: static;
    }
  }
</style>
