<template>
  <div id="profile">
    <h1>{{getUser}}</h1>
    <div class="container-fluid">
      <div class="row header">
        <div class="col-sm-12">
          <div class="profile-image" :data-letters="getAvatar ? getAvatar : 'XX'"></div>
          <div>
            <h2>Aktualný zostatok na účte: {{getBalance}}€</h2>
            <h2>Poloha: {{getPosition}}</h2>
          </div>
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="username">Používateľské meno</label>
          <input
            disabled
            v-model="components.appProfile.form.values.userName"
            @input="$v.components.appProfile.form.values.userName.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.userName.$error && $v.components.appProfile.form.values.userName.$dirty, invalid: $v.components.appProfile.form.values.userName.$error}"
            autofocus
            autocomplete="off"
            type="text"
            placeholder="Vaše používateľské meno"
            name="username"
            id="username" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="email">Email</label>
          <input
            disabled
            v-model="components.appProfile.form.values.email"
            @input="$v.components.appProfile.form.values.email.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.email.$error && $v.components.appProfile.form.values.email.$dirty, invalid: $v.components.appProfile.form.values.email.$error}"
            autocomplete="off"
            type="email"
            placeholder="Vaša emailová adresa"
            name="email"
            id="email" />
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="firstname">Meno</label>
          <input
            v-model="components.appProfile.form.values.firstName"
            @input="$v.components.appProfile.form.values.firstName.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.firstName.$error && $v.components.appProfile.form.values.firstName.$dirty, invalid: $v.components.appProfile.form.values.firstName.$error}"
            autocomplete="off"
            type="text"
            placeholder="Vaše meno"
            name="firstname"
            id="firstname" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="lastname">Priezvisko</label>
          <input
            v-model="components.appProfile.form.values.lastName"
            @input="$v.components.appProfile.form.values.lastName.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.lastName.$error && $v.components.appProfile.form.values.lastName.$dirty, invalid: $v.components.appProfile.form.values.lastName.$error}"
            autocomplete="off"
            type="text"
            placeholder="Vaše priezvisko"
            name="lastname"
            id="lastname" />
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="tel">Telefonné číslo</label>
          <input
            v-model="components.appProfile.form.values.tel"
            @input="$v.components.appProfile.form.values.tel.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.tel.$error && $v.components.appProfile.form.values.tel.$dirty, invalid: $v.components.appProfile.form.values.tel.$error}"
            autocomplete="off"
            placeholder="Vaše telefonné číslo"
            type="text"
            name="tel"
            id="tel" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="gender">Pohlavie</label>
          <select
            v-model="components.appProfile.form.values.gender"
            @change="$v.components.appProfile.form.values.gender.$touch()"
            :class="{valid: !$v.components.appProfile.form.values.gender.$error && $v.components.appProfile.form.values.gender.$dirty, invalid: $v.components.appProfile.form.values.gender.$error}"
            class="form-control"
            id="gender">
            <option value="undefined" disabled selected>Vyberte z možností</option>
            <option v-for="gender in genders" :value="gender.name" :key="gender.genderId">{{gender.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <button
      @click.prevent="onUpdate(false)"
      :disabled="$v.$invalid"
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
    <div id="confirm-wrapper">
      <app-confirm
        @confirmed="onUpdate($event)"
        :confirmId="'profileConfirm'"
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
import {required, email} from 'vuelidate/lib/validators'

export default {
  created: function () {
    return Promise.all([this.$store.dispatch(types.ACTION_GENDER_GET_ALL, {}), this.$store.dispatch(types.ACTION_USER_GET, this.signIn.accountId)])
      .catch(err => console.warn(err.message))
  },
  beforeMount: function () {
    this.components.appProfile.form.values = {...this.userProfile}
  },
  name: 'profile',
  data: function () {
    return {
      components: {
        appProfile: {
          form: {
            values: {
              userName: null,
              email: null,
              firstName: null,
              lastName: null,
              tel: null,
              gender: null
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
      appProfile: {
        form: {
          values: {
            userName: {
              required,
              username: value => new RegExp(/^[a-z.]+$/).test(value)
            },
            email: {
              required,
              email
            },
            firstName: {
              required,
              alpha: value => new RegExp(/^[\D ]+$/).test(value)
            },
            lastName: {
              required,
              alpha: value => new RegExp(/^[\D ]+$/).test(value)
            },
            tel: {
              required,
              telNumber: value => new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[-. ]?)?((?:\(?\d{1,}\)?[-. ]?){0,})(?:[-. ]?(?:#|ext\.?|extension|x)[-. ]?(\d+))?$/).test(value)
            },
            gender: {
              required,
              alpha: value => new RegExp(/^[\D ]+$/).test(value)
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
    getBalance: function () {
      if (!this.userProfile.balance) return Number.parseFloat(0.00).toFixed(2)
      return this.userProfile.balance.toFixed(2)
    },
    getPosition: function () {
      if (!this.userProfile.places || !this.userProfile.places.country || !this.userProfile.places.region || !this.userProfile.places.district || !this.userProfile.places.place) return 'Poloha nie je známa alebo nie je nastavená'
      return `${this.userProfile.places.country}, ${this.userProfile.places.region}, ${this.userProfile.places.district}, ${this.userProfile.places.place}`
    },
    getUser: function () {
      if (!this.userProfile.firstName || !this.userProfile.lastName) return 'Používateľ'
      return `${this.userProfile.firstName} ${this.userProfile.lastName}`
    },
    getAvatar: function () {
      return localStorage.getItem('avatar')
    },
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA,
      userError: types.GETTER_USER_ERROR,
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
      return bootstrap('#profileConfirm').modal('show')
    },
    showAlertModal: function (condition, type, text) {
      this.components.appAlert.condition = condition
      this.components.appAlert.type = type
      this.components.appAlert.text = text
    },
    onUpdate: function ($event) {
      if ($event) {
        const data = {accountId: this.userProfile.accountId, places: {country: this.userProfile.places.country, region: this.userProfile.places.region, district: this.userProfile.places.district, place: this.userProfile.places.place, street: this.userProfile.places.street, zip: this.userProfile.places.zip, code: this.userProfile.places.code}, firstName: this.components.appProfile.form.values.firstName, lastName: this.components.appProfile.form.values.lastName, gender: this.components.appProfile.form.values.gender, balance: this.userProfile.balance, tel: this.components.appProfile.form.values.tel}
        return this.$store.dispatch(types.ACTION_USER_UPDATE, data)
          .then(result => {
            this.showAlertModal([result !== null], ['alert-success'], ['Údaje sa úspešne aktualizovali'])
            bootstrap('#profileConfirm').modal('hide')
          })
          .catch(err => {
            this.showAlertModal([err !== null], ['alert-danger'], [err.message])
            bootstrap('#profileConfirm').modal('hide')
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

  div#profile {
    overflow: auto;
    height: 100%;
  }

  div#profile h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    margin-bottom: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#profile div.header div.profile-image {
    width: 9rem;
    line-height: 9rem;
    border-radius: 50%;
    text-align: center;
    font-size: 3.5em;
    background-color: #176c9d;
    display: inline-block;
  }

  div#profile div.header div.profile-image:before {
    color: #ffffff;
    font-family: Palanquin-Regular, sans-serif;
    content: attr(data-letters);
  }

  div#profile div.body {
    margin-top: 2rem;
  }

  div#profile div.body label,
  div#profile h2 {
    font-size: 1.2em;
    font-weight: 900;
    color: #979797;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  div#profile h2 {
    color: #6b6b6b;
  }

  div#profile div.body input[type="text"],
  div#profile div.body input[type="email"] {
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

  div#profile div.body input[type="text"]:disabled,
  div#profile div.body input[type="email"]:disabled {
    color: #115176;
  }

  div#profile div.body select {
    background: #ffffff;
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 2rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #000000;
    padding: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#profile div.body select:focus {
    background: #ffffff;
  }

  div#profile div.body option {
    height: 2rem;
    background: #ffffff;
  }

  div#profile div#alert-wrapper {
    width: 30rem;
    position: relative;
    margin: 0 auto;
    margin-top: 3rem;
  }

  div#profile button {
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

  div#profile button:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#profile button:disabled {
    opacity: .65;
    background: #095174;
  }

  div#profile div.body input.invalid,
  div#profile div.body select.invalid{
    border-bottom: 0.1rem solid #ff0000;
  }

  div#profile div.body input.valid,
  div#profile div.body select.valid{
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 768px) {
    div#profile button {
      margin-top: 2rem;
      margin-left: 1rem;
      position: static;
    }
  }
</style>
