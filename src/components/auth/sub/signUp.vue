<template>
  <div id="signup">
    <div id="wrapper">
      <h1>Registrácia</h1>
      <form>
        <div class="form-group">
          <label
            for="username">
            Zadajte použivatelské meno
          </label>
          <input
            autofocus
            autocomplete="off"
            aria-describedby="userNameInvalid"
            type="text" class="form-control"
            id="username"
            v-model="components.appSignUp.form.values.userName"
            placeholder="Použivatelské meno"
            @input="$v.components.appSignUp.form.values.userName.$touch()"
            :class="{valid: !$v.components.appSignUp.form.values.userName.$error && $v.components.appSignUp.form.values.userName.$dirty, invalid: $v.components.appSignUp.form.values.userName.$error}">
          <small
            id="userNameInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.userName !== null">{{signUpError.reason.userName}}</small>
        </div>
        <div class="form-group">
          <label
            for="email">
            Zadajte emailovú adresu
          </label>
          <input
            autocomplete="off"
            aria-describedby="emailInvalid"
            type="email" class="form-control"
            id="email"
            v-model="components.appSignUp.form.values.email"
            placeholder="Emailová adresa"
            @input="$v.components.appSignUp.form.values.email.$touch()"
            :class="{valid: !$v.components.appSignUp.form.values.email.$error && $v.components.appSignUp.form.values.email.$dirty, invalid: $v.components.appSignUp.form.values.email.$error}">
          <small
            id="emailInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.email !== null">{{signUpError.reason.email}}</small>
        </div>
        <div class="form-group">
          <label
            for="password">
            Zadajte heslo
          </label>
          <input
            autocomplete="off"
            aria-describedby="passwordInvalid"
            type="password"
            class="form-control"
            id="password"
            v-model="components.appSignUp.form.values.password"
            placeholder="Heslo"
            @input="$v.components.appSignUp.form.values.password.$touch()"
            :class="{valid: !$v.components.appSignUp.form.values.password.$error && $v.components.appSignUp.form.values.password.$dirty, invalid: $v.components.appSignUp.form.values.password.$error}">
          <small
            id="passwordInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.password !== null">{{signUpError.reason.password}}</small>
        </div>
        <div class="form-group">
          <label
            for="confirmPassword">Potvrďte heslo</label>
          <input
            autocomplete="off"
            aria-describedby="confirmPasswordInvalid"
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="components.appSignUp.form.values.confirmPassword"
            placeholder="Potvrdenie hesla"
            @input="$v.components.appSignUp.form.values.confirmPassword.$touch()"
            :class="{
                valid: !$v.components.appSignUp.form.values.confirmPassword.$error && $v.components.appSignUp.form.values.confirmPassword.$dirty,
                invalid: $v.components.appSignUp.form.values.confirmPassword.$error}">
          <small
            id="confirmPasswordInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.password !== null">{{signUpError.reason.password}}</small>
        </div>
        <div class="form-group">
          <label
            for="selectedRole">
            Chcem sa stať
          </label>
          <select
            class="form-control"
            v-model="components.appSignUp.form.values.roles"
            id="selectedRole"
            @change="$v.components.appSignUp.form.values.roles.$touch()"
            :class="{valid: !$v.components.appSignUp.form.values.roles.$error && $v.components.appSignUp.form.values.roles.$dirty, invalid: $v.components.appSignUp.form.values.roles.$error}">
            <option value="{}" disabled selected>Vyberte z možností</option>
            <option value='{"roleId": 3, "name": "ROLE_CLIENT"}'>Klientom</option>
            <option value='{"roleId": 4, "name": "ROLE_COURIER"}'>Kuriérom</option>
          </select>
          <a
            href="#"
            @click.prevent="activeEl.component='app-sign-in'">
            Späť na prihlásenie
          </a>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSignUp">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="!signUpDone">
          </span>&nbsp;Registrovať sa
        </button>
      </form>
      <div class="alert-wrapper">
        <app-alert
          :condition="components.appAlert.condition"
          :type="components.appAlert.type"
          :text="components.appAlert.text"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required, email, alphaNum, sameAs} from 'vuelidate/lib/validators'

export default {
  created: function () {
    if (this.$route.params.key) return this.onPageLoad()
  },
  props: ['activeEl'],
  name: 'signup',
  data: function () {
    return {
      components: {
        appSignUp: {
          form: {
            values: {
              userName: null,
              email: null,
              password: null,
              confirmPassword: null,
              roles: '{}'
            }
          }
        },
        appUrl: {
          url: {
            values: {
              id: this.$route.params.id,
              key: this.$route.params.key
            }
          }
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
      appSignUp: {
        form: {
          values: {
            userName: {
              required,
              alphaNum
            },
            email: {
              required,
              email
            },
            confirmPassword: {
              required,
              sameAs: sameAs(vm => {
                return vm.password
              })
            },
            password: {
              required,
              contains: value => new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})/g).test(value)
            },
            roles: {
              required,
              allowed: value => value === '{"roleId": 3, "name": "ROLE_CLIENT"}' || value === '{"roleId": 4, "name": "ROLE_COURIER"}'
            }
          }
        }
      }
    }
  },
  components: {
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      signUpError: types.GETTER_SIGN_UP_ERROR,
      signUpDone: types.GETTER_SIGN_UP_DONE,
      activationTokenError: types.GETTER_ACCOUNT_ACTIVATION_ERROR
    })
  },
  methods: {
    showAlertModal: function (condition, type, text) {
      this.components.appAlert.condition = condition
      this.components.appAlert.type = type
      this.components.appAlert.text = text
    },
    onPageLoad: function () {
      return this.$store.dispatch(types.ACTION_ACCOUNT_ACTIVATION, {id: this.components.appUrl.url.values.id, key: this.components.appUrl.url.values.key})
        .then(result => this.showAlertModal([result !== null], ['alert-success'], [result.message]))
        .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
    },
    onSignUp: function () {
      this.signUpError.message = this.activationTokenError.message = null
      this.signUpError.is = this.activationTokenError.is = false

      return this.$store.dispatch(types.ACTION_SIGN_UP, {userName: this.components.appSignUp.form.values.userName, email: this.components.appSignUp.form.values.email, password: this.components.appSignUp.form.values.password, confirmPassword: this.components.appSignUp.form.values.confirmPassword, roles: JSON.parse(this.components.appSignUp.form.values.roles)})
        .then(result => this.showAlertModal([result !== null], ['alert-success'], [result.message]))
        .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
    }
  }
}
</script>

<style scoped>
  div#signup {
    padding: 2rem;
    height: 98vh;
    display: flex;
    align-items: center;
  }

  div#signup div#wrapper {
    width: 100%;
  }

  div#signup h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div#signup a {
    display: block;
    float: right;
    margin-top: 0.5rem;
    color: #176c9d;
  }

  div#signup a:hover {
    color: #1796dc;
  }

  div#signup form {
    padding: 3rem;
  }

  div#signup a {
    color: #176c9d;
    float: right;
  }

  div#signup button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 2rem;
  }

  div#signup button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#signup button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#signup select {
    background: #fcfcfc;
    font-size: 1.3em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #6c757d;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#signup select:focus {
    background: #fcfcfc;
  }

  div#signup input[type="text"], div#signup input[type="password"], div#signup input[type="email"] {
    font-size: 1.3em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#signup option {
    background: #fcfcfc;
  }

  div#signup small, .text-muted {
    color: #ff0000 !important;
  }

  div#signup div input.invalid, div#signup div select.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#signup div input.valid, div#signup div select.valid  {
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 1200px) {
    div#signup input[type="text"], div#signup input[type="password"], div#signup select {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#signup div#wrapper {
      height: auto;
    }

    div#signup {
      height: 100vh;
    }
  }

  @media (max-width: 576px) {
    div#signup {
      padding: 0;
    }
  }
</style>
