<template>
  <div id="signup">
    <div id="wrapper">
      <h1>Registrácia</h1>
      <form>
        <div class="form-group">
          <label for="username">Zadajte použivatelské meno</label>
          <input aria-describedby="userNameInvalid" type="text" class="form-control" id="username" v-model="account.values.userName" placeholder="Použivatelské meno" @input="$v.account.values.userName.$touch()" :class="{valid: !$v.account.values.userName.$error && $v.account.values.userName.$dirty, invalid: $v.account.values.userName.$error}">
          <small id="userNameInvalid" class="form-text text-muted" v-show="account.server.validation.userName !== null">{{account.server.validation.userName}}</small>
        </div>
        <div class="form-group">
          <label for="email">Zadajte emailovú adresu</label>
          <input aria-describedby="emailInvalid" type="email" class="form-control" id="email" v-model="account.values.email" placeholder="Emailová adresa" @input="$v.account.values.email.$touch()" :class="{valid: !$v.account.values.email.$error && $v.account.values.email.$dirty, invalid: $v.account.values.email.$error}">
          <small id="emailInvalid" class="form-text text-muted" v-show="account.server.validation.email !== null">{{account.server.validation.email}}</small>
        </div>
        <div class="form-group">
          <label for="password">Zadajte heslo</label>
          <input aria-describedby="passwordInvalid" type="password" class="form-control" id="password" v-model="account.values.password" placeholder="Heslo" @input="$v.account.values.password.$touch()" :class="{valid: !$v.account.values.password.$error && $v.account.values.password.$dirty, invalid: $v.account.values.password.$error}">
          <small id="passwordInvalid" class="form-text text-muted" v-show="account.server.validation.password !== null">{{account.server.validation.password}}</small>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Potvrďte heslo</label>
          <input aria-describedby="confirmPasswordInvalid" type="password" class="form-control" id="confirmPassword" v-model="account.values.confirmPassword" placeholder="Potvrdenie hesla" @input="$v.account.values.confirmPassword.$touch()" :class="{valid: !$v.account.values.confirmPassword.$error && $v.account.values.confirmPassword.$dirty, invalid: $v.account.values.confirmPassword.$error}">
          <small id="confirmPasswordInvalid" class="form-text text-muted" v-show="account.server.validation.password !== null">{{account.server.validation.password}}</small>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Chcem sa stať</label>
          <select class="form-control" v-model="account.values.roles" id="selectedRole" @change="$v.account.values.roles.$touch()" :class="{valid: !$v.account.values.roles.$error && $v.account.values.roles.$dirty, invalid: $v.account.values.roles.$error}">
            <option value="{}" disabled selected>Vyberte z možností</option>
            <option value='{"roleId": 3, "name": "ROLE_CLIENT"}'>Klientom</option>
            <option value='{"roleId": 4, "name": "ROLE_COURIER"}'>Kuriérom</option>
          </select>
          <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @keyup.enter="performSignUp" @click.prevent="performSignUp">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="account.loading"></span>
          Registrovať sa
        </button>
      </form>
      <app-alert
        :alertType="[
            activateAccountProperties.dangerMessage !== null || account.dangerMessage !== null ? 'alert-danger' : 'alert-success']"
        :condition="[
            activateAccountProperties.dangerMessage !== null,
            activateAccountProperties.successMessage !== null,
            account.dangerMessage !== null,
            account.successMessage !== null]"
        :content="[
            activateAccountProperties.dangerMessage,
            activateAccountProperties.successMessage,
            account.dangerMessage,
            account.successMessage]"/>
    </div>
  </div>
</template>

<script>
import alert from '@/components/common/alert'
import {required, email, alphaNum, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'signup',
  created: function () {
    if (this.$route.params.key) this.verifyActivationToken()
  },
  data: function () {
    return {
      resource: null,
      account: {
        values: {
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
          roles: '{}'
        },
        server: {
          validation: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }
        },
        loading: false,
        dangerMessage: null,
        successMessage: null
      },
      activateAccountProperties: {
        values: {
          token: this.$route.params.key,
          account: this.$route.params.id
        },
        dangerMessage: null,
        successMessage: null
      }
    }
  },
  components: {
    appAlert: alert
  },
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    performSignUp () {
      this.account.loading = true
      this.resource = this.$resource('{service}/signup', {}, {performSignUp: {method: 'POST'}})
      this.resource.performSignUp({service: 'authorization-server'}, {userName: this.account.values.userName, email: this.account.values.email, password: this.account.values.password, confirmPassword: this.account.values.confirmPassword, accountRoles: [{roles: JSON.parse(this.account.values.roles)}]})
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          if (!parsed.error) {
            this.account.dangerMessage = null
            this.account.successMessage = parsed.message
            Object.keys(this.account.server.validation).forEach((e) => { this.account.server.validation[e] = null })
            this.account.loading = false
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (!parsed.error) return
            this.account.successMessage = null
            this.account.dangerMessage = parsed.message
            if (!('reason' in parsed)) return
            this.account.server.validation = parsed.reason
            this.account.loading = false
          })
        })
    },
    verifyActivationToken () {
      this.resource = this.$resource('{service}/signup/{account}/{id}/{token}/{key}', {}, {verifyActivationToken: {method: 'GET'}})
      this.resource.verifyActivationToken({service: 'authorization-server', account: 'account', id: this.activateAccountProperties.values.account, token: 'token', key: this.activateAccountProperties.values.token})
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          if (!parsed.error) {
            this.activateAccountProperties.dangerMessage = null
            this.activateAccountProperties.successMessage = parsed.message
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (parsed.error) {
              this.activateAccountProperties.successMessage = null
              this.activateAccountProperties.dangerMessage = parsed.message
            }
          })
        })
    }
  },
  validations: {
    account: {
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
</script>

<style scoped>
  div#wrapper {
    width: 100%;
  }

  div#signup {
    padding: 2rem;
    height: 100vh;
    display: flex;
    align-items: center;
  }

  span.spinner-border{
    margin-bottom: 0.3rem;
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

  div input.invalid {
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
    div#signup {
      height: auto;
    }
  }
</style>
