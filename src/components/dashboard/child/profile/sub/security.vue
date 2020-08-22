<template>
  <div id="security">
    <h1>Poloha</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="country">Štát</label>
          <input
            v-model="components.appSecurity.form.values.country"
            @input="$v.components.appSecurity.form.values.country.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.country.$error && $v.components.appSecurity.form.values.country.$dirty, invalid: $v.components.appSecurity.form.values.country.$error}"
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
            v-model="components.appSecurity.form.values.region"
            @input="$v.components.appSecurity.form.values.region.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.region.$error && $v.components.appSecurity.form.values.region.$dirty, invalid: $v.components.appSecurity.form.values.region.$error}"
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
            v-model="components.appSecurity.form.values.district"
            @input="$v.components.appSecurity.form.values.district.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.district.$error && $v.components.appSecurity.form.values.district.$dirty, invalid: $v.components.appSecurity.form.values.district.$error}"
            autocomplete="off"
            type="text"
            name="district"
            placeholder="Názov okresu"
            id="district" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="place">Mesto</label>
          <input
            v-model="components.appSecurity.form.values.place"
            @input="$v.components.appSecurity.form.values.place.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.place.$error && $v.components.appSecurity.form.values.place.$dirty, invalid: $v.components.appSecurity.form.values.place.$error}"
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
            v-model="components.appSecurity.form.values.street"
            @input="$v.components.appSecurity.form.values.street.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.street.$error && $v.components.appSecurity.form.values.street.$dirty, invalid: $v.components.appSecurity.form.values.street.$error}"
            autocomplete="off"
            type="text"
            name="street"
            placeholder="Ulica"
            id="street" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="zip">PSČ</label>
          <input
            v-model="components.appSecurity.form.values.zip"
            @input="$v.components.appSecurity.form.values.zip.$touch()"
            :class="{valid: !$v.components.appSecurity.form.values.zip.$error && $v.components.appSecurity.form.values.zip.$dirty, invalid: $v.components.appSecurity.form.values.zip.$error}"
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
            autocomplete="off"
            type="password"
            name="new-password"
            value=""
            id="new-password" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="confirm-new-password">Potvrdenie nového hesla</label>
          <input
            autocomplete="off"
            type="password"
            name="confirm-new-password"
            value=""
            id="confirm-new-password" />
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import {required, numeric} from 'vuelidate/lib/validators'

export default {
  created: function () {
    this.components.appSecurity.form.values = {...this.userProfile.places}
  },
  name: 'security',
  data: function () {
    return {
      components: {
        appSecurity: {
          form: {
            values: {
              country: null,
              region: null,
              district: null,
              place: null,
              street: null,
              zip: null
            }
          }
        }
      }
    }
  },
  validations: {
    components: {
      appSecurity: {
        form: {
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
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      userProfile: types.GETTER_USER_DATA_GET,
      genders: types.GETTER_GENDER_DATA_GET_ALL
    })
  },
  methods: {
    onCreate: function () {

    }
  }
}
</script>

<style scoped>
  ::placeholder {
    color: #000000;
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
    color: #a5a3a5;
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
