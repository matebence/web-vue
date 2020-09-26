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
            v-model="appSignUp.form.values.userName"
            placeholder="Použivatelské meno"
            @input="$v.appSignUp.form.values.userName.$touch()"
            :class="{valid: !$v.appSignUp.form.values.userName.$error && $v.appSignUp.form.values.userName.$dirty, invalid: $v.appSignUp.form.values.userName.$error}">
          <small
            id="userNameInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.userName !== null">{{signUpError.reason.userName}}
          </small>
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
            v-model="appSignUp.form.values.email"
            placeholder="Emailová adresa"
            @input="$v.appSignUp.form.values.email.$touch()"
            :class="{valid: !$v.appSignUp.form.values.email.$error && $v.appSignUp.form.values.email.$dirty, invalid: $v.appSignUp.form.values.email.$error}">
          <small
            id="emailInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.email !== null">{{signUpError.reason.email}}
          </small>
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
            v-model="appSignUp.form.values.password"
            placeholder="Heslo"
            @input="$v.appSignUp.form.values.password.$touch()"
            :class="{valid: !$v.appSignUp.form.values.password.$error && $v.appSignUp.form.values.password.$dirty, invalid: $v.appSignUp.form.values.password.$error}">
          <small
            id="passwordInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.password !== null">{{signUpError.reason.password}}
          </small>
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
            v-model="appSignUp.form.values.confirmPassword"
            placeholder="Potvrdenie hesla"
            @input="$v.appSignUp.form.values.confirmPassword.$touch()"
            :class="{
                valid: !$v.appSignUp.form.values.confirmPassword.$error && $v.appSignUp.form.values.confirmPassword.$dirty,
                invalid: $v.appSignUp.form.values.confirmPassword.$error}">
          <small
            id="confirmPasswordInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.password !== null">{{signUpError.reason.password}}
          </small>
        </div>
        <div class="form-group">
          <label
            for="selectedRole">
            Chcem sa stať
          </label>
          <select
            class="form-control"
            v-model="appSignUp.form.values.roles"
            id="selectedRole"
            @change="$v.appSignUp.form.values.roles.$touch()"
            :class="{valid: !$v.appSignUp.form.values.roles.$error && $v.appSignUp.form.values.roles.$dirty, invalid: $v.appSignUp.form.values.roles.$error}">
            <option value="{}" disabled selected>Vyberte z možností</option>
            <option value='{"roleId": 3, "name": "ROLE_CLIENT"}'>Klientom</option>
            <option value='{"roleId": 4, "name": "ROLE_COURIER"}'>Kuriérom</option>
          </select>
          <a
            href="/sign-in"
            @click.prevent="onLoadComponent({name: 'welcome', path: 'sign-in'})">
            Späť na prihlásenie
          </a>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
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
          :condition="appSignUp.alert.condition"
          :type="appSignUp.alert.type"
          :text="appSignUp.alert.text"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  import alert from '@/components/common/alert'

  import {required, email, alphaNum, sameAs} from 'vuelidate/lib/validators'

  export default {
    created: function () {
      if (this.$route.params.key) return this.onPageLoad()
    },
    name: 'signup',
    props: ['appSignUp', 'activeEl'],
    data: function () {
      return {}
    },
    validations: {
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
    },
    components: {
      appAlert: alert
    },
    computed: {
      ...mapGetters({
        signUpDone: types.GETTER_SIGN_UP_DONE,
        signUpError: types.GETTER_SIGN_UP_ERROR,
        activationTokenError: types.GETTER_ACCOUNT_ACTIVATION_ERROR
      })
    },
    methods: {
      showAlertModal: function (condition, type, text) {
        this.appSignUp.alert.condition = condition
        this.appSignUp.alert.type = type
        this.appSignUp.alert.text = text
      },
      onPageLoad: function () {
        return this.$store.dispatch(types.ACTION_ACCOUNT_ACTIVATION, {
          id: this.appSignUp.url.url.values.id,
          key: this.appSignUp.url.url.values.key
        })
          .then(result => this.showAlertModal([result !== null], ['alert-success'], [result.message]))
          .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
      },
      onLoadComponent: function ($event) {
        return this.$router.push($event)
      },
      onSubmit: function () {
        this.signUpError.message = this.activationTokenError.message = null
        this.signUpError.is = this.activationTokenError.is = false

        return this.$store.dispatch(types.ACTION_SIGN_UP, {
          userName: this.appSignUp.form.values.userName,
          email: this.appSignUp.form.values.email,
          password: this.appSignUp.form.values.password,
          confirmPassword: this.appSignUp.form.values.confirmPassword,
          roles: JSON.parse(this.appSignUp.form.values.roles)
        })
          .then(result => {
            this.showAlertModal([result !== null], ['alert-success'], [result.message])
          })
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

  div#signup div input.valid, div#signup div select.valid {
    border-bottom: 0.1rem solid #008000;
  }

  div#signup .spinner-border {
    margin-bottom: 0.3rem;
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
