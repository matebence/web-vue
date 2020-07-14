<template>
  <div id="signup">
    <div id="wrapper">
      <h1>Registrácia</h1>
      <form>
        <div class="form-group">
          <label for="username">Zadajte použivatelské meno</label>
          <input
            aria-describedby="userNameInvalid"
            type="text" class="form-control"
            id="username"
            v-model="form.values.userName"
            placeholder="Použivatelské meno"
            @input="$v.form.values.userName.$touch()"
            :class="{
               valid: !$v.form.values.userName.$error && $v.form.values.userName.$dirty,
               invalid: $v.form.values.userName.$error}">
          <small
            id="userNameInvalid"
            class="form-text text-muted"
            v-show="signUp.error.reason.userName !== null">{{signUp.error.reason.userName}}</small>
        </div>
        <div class="form-group">
          <label for="email">Zadajte emailovú adresu</label>
          <input
            aria-describedby="emailInvalid"
            type="email" class="form-control"
            id="email"
            v-model="form.values.email"
            placeholder="Emailová adresa"
            @input="$v.form.values.email.$touch()"
            :class="{
                valid: !$v.form.values.email.$error && $v.form.values.email.$dirty,
                invalid: $v.form.values.email.$error}">
          <small
            id="emailInvalid"
            class="form-text text-muted"
            v-show="signUp.error.reason.email !== null">{{signUp.error.reason.email}}</small>
        </div>
        <div class="form-group">
          <label for="password">Zadajte heslo</label>
          <input
            aria-describedby="passwordInvalid"
            type="password"
            class="form-control"
            id="password"
            v-model="form.values.password"
            placeholder="Heslo"
            @input="$v.form.values.password.$touch()"
            :class="{
                valid: !$v.form.values.password.$error && $v.form.values.password.$dirty,
                invalid: $v.form.values.password.$error}">
          <small
            id="passwordInvalid"
            class="form-text text-muted"
            v-show="signUp.error.reason.password !== null">{{signUp.error.reason.password}}</small>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Potvrďte heslo</label>
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
            v-show="signUp.error.reason.password !== null">{{signUp.error.reason.password}}</small>
        </div>
        <div class="form-group">
          <label for="selectedRole">Chcem sa stať</label>
          <select
            class="form-control"
            v-model="form.values.roles"
            id="selectedRole"
            @change="$v.form.values.roles.$touch()"
            :class="{
                valid: !$v.form.values.roles.$error && $v.form.values.roles.$dirty,
               invalid: $v.form.values.roles.$error}">
            <option value="{}" disabled selected>Vyberte z možností</option>
            <option value='{"roleId": 3, "name": "ROLE_CLIENT"}'>Klientom</option>
            <option value='{"roleId": 4, "name": "ROLE_COURIER"}'>Kuriérom</option>
          </select>
          <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @keyup.enter="onSignUp" @click.prevent="onSignUp">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="!signUp.done"></span>&nbsp;Registrovať sa
        </button>
      </form>
      <app-alert
        :type="[signUp.error.is || activationToken.error.is ? 'alert-danger' : 'alert-success']"
        :condition="[signUp.error.message !== null, activationToken.error.message !== null]"
        :content="[signUp.error.message, activationToken.error.message]"/>
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
    if (this.$route.params.key) this.onPageLoad()
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
      signUp: types.GETTER_SIGN_UP_DEFAULT,
      activationToken: types.GETTER_ACCOUNT_ACTIVATION_DEFAULT
    })
  },
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    onPageLoad () {
      this.$store.dispatch(types.ACTION_ACCOUNT_ACTIVATION, {
        id: this.url.values.id,
        key: this.url.values.key})
    },
    onSignUp () {
      this.signUp.error.message = this.activationToken.error.message = null
      this.signUp.error.is = this.activationToken.error.is = false

      this.$store.dispatch(types.ACTION_SIGN_UP, {
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
  div#wrapper {
    width: 100%;
  }

  div#signup {
    padding: 2rem;
    height: 98vh;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  a {
    display: block;
    float: right;
    margin-top: 0.5rem;
    color: #176c9d;
  }

  a:hover {
    color: #1796dc;
  }

  form {
    padding: 3rem;
  }

  a {
    color: #176c9d;
    float: right;
  }

  button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 2rem;
  }

  button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  select {
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

  select:focus {
    background: #fcfcfc;
  }

  input[type="text"], input[type="password"], input[type="email"] {
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

  option {
    background: #fcfcfc;
  }

  small, .text-muted {
    color: #ff0000 !important;
  }

  div input.invalid, div select.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div input.valid, div select.valid  {
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 1200px) {
    input[type="text"], input[type="password"], select {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#wrapper {
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
