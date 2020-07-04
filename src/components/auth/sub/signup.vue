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
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @keyup.enter="performSignUp" @click.prevent="performSignUp">Registrovať sa</button>
      </form>
      <transition
        mode="out-in"
        type="animation"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-success" role="alert" v-show="account.dangerMessage === null && account.successMessage !== null">
          <p color="text-center">{{ account.successMessage }}</p>
        </div>
      </transition>
      <transition
        mode="out-in"
        type="animation"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-danger" role="alert" v-show="account.successMessage === null && account.dangerMessage !== null">
          <p class="text-center">{{ account.dangerMessage }}</p>
        </div>
      </transition>
      <transition
        mode="out-in"
        type="animation"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-success" role="alert" v-show="activateAccountProperties.dangerMessage === null && activateAccountProperties.successMessage !== null">
          <p color="text-center">{{ activateAccountProperties.successMessage }}</p>
        </div>
      </transition>
      <transition
        mode="out-in"
        type="animation"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-danger" role="alert" v-show="activateAccountProperties.successMessage === null && activateAccountProperties.dangerMessage !== null">
          <p class="text-center">{{ activateAccountProperties.dangerMessage }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
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
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    performSignUp () {
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
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (!parsed.error) return
            this.account.successMessage = null
            this.account.dangerMessage = parsed.message
            if (!('reason' in parsed)) return
            this.account.server.validation = parsed.reason
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
        password: {
          required,
          contains: value => new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})/g).test(value)
        },
        confirmPassword: {
          required,
          sameAs: sameAs(vm => {
            return vm.password
          })
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

  div.alert {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 50%;
    width: 75%;
    transform: translateX(-50%);
  }

  div h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div a {
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

  form a {
    color: #176c9d;
    float: right;
  }

  form button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 2rem;
  }

  form button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  form button[disabled] {
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

  option {
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
