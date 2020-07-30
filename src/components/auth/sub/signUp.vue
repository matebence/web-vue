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
            aria-describedby="userNameInvalid"
            type="text" class="form-control"
            id="username"
            v-model="form.values.userName"
            placeholder="Použivatelské meno"
            @input="$v.form.values.userName.$touch()"
            :class="{valid: !$v.form.values.userName.$error && $v.form.values.userName.$dirty, invalid: $v.form.values.userName.$error}">
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
            aria-describedby="emailInvalid"
            type="email" class="form-control"
            id="email"
            v-model="form.values.email"
            placeholder="Emailová adresa"
            @input="$v.form.values.email.$touch()"
            :class="{valid: !$v.form.values.email.$error && $v.form.values.email.$dirty, invalid: $v.form.values.email.$error}">
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
            aria-describedby="passwordInvalid"
            type="password"
            class="form-control"
            id="password"
            v-model="form.values.password"
            placeholder="Heslo"
            @input="$v.form.values.password.$touch()"
            :class="{valid: !$v.form.values.password.$error && $v.form.values.password.$dirty, invalid: $v.form.values.password.$error}">
          <small
            id="passwordInvalid"
            class="form-text text-muted"
            v-show="signUpError.reason.password !== null">{{signUpError.reason.password}}</small>
        </div>
        <div class="form-group">
          <label
            for="confirmPassword">Potvrďte heslo</label>
          <input
            aria-describedby="confirmPasswordInvalid"
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="form.values.confirmPassword"
            placeholder="Potvrdenie hesla"
            @input="$v.form.values.confirmPassword.$touch()"
            :class="{
                valid: !$v.form.values.confirmPassword.$error && $v.form.values.confirmPassword.$dirty,
                invalid: $v.form.values.confirmPassword.$error}">
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
            v-model="form.values.roles"
            id="selectedRole"
            @change="$v.form.values.roles.$touch()"
            :class="{valid: !$v.form.values.roles.$error && $v.form.values.roles.$dirty, invalid: $v.form.values.roles.$error}">
            <option value="{}" disabled selected>Vyberte z možností</option>
            <option value='{"roleId": 3, "name": "ROLE_CLIENT"}'>Klientom</option>
            <option value='{"roleId": 4, "name": "ROLE_COURIER"}'>Kuriérom</option>
          </select>
          <a
            href="#"
            @click.prevent="loadComponent('app-sign-in')">
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
      <app-alert
        :type="[signUpError.is || activationTokenError.is ? 'alert-danger' : 'alert-success']"
        :condition="[signUpError.message !== null, activationTokenError.message !== null]"
        :content="[signUpError.message, activationTokenError.message]"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required, email, alphaNum, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'signup',
  created: function () {
    if (this.$route.params.key) return this.onPageLoad()
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_SIGN_UP_ERRORS, {})
  },
  data: function () {
    return {
      form: {
        values: {
          userName: null,
          email: null,
          password: null,
          confirmPassword: null,
          roles: '{}'
        }
      },
      url: {
        values: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      }
    }
  },
  validations: {
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
  },
  components: {
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      signUpError: types.GETTER_SIGN_UP_ERROR,
      signUpDone: types.GETTER_SIGN_UP_DONE,
      activationTokenError: types.GETTER_ACCOUNT_ACTIVATION_ERROR,
      activationTokenDone: types.GETTER_ACCOUNT_ACTIVATION_DONE
    })
  },
  methods: {
    loadComponent: function ($event) {
      this.$emit('loadComponent', $event)
      return this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    onPageLoad: function () {
      return this.$store.dispatch(types.ACTION_ACCOUNT_ACTIVATION, {
        id: this.url.values.id,
        key: this.url.values.key})
    },
    onSignUp: function () {
      this.signUpError.message = this.activationTokenError.message = null
      this.signUpError.is = this.activationTokenError.is = false

      return this.$store.dispatch(types.ACTION_SIGN_UP, {
        userName: this.form.values.userName,
        email: this.form.values.email,
        password: this.form.values.password,
        confirmPassword: this.form.values.confirmPassword,
        roles: JSON.parse(this.form.values.roles)})
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
