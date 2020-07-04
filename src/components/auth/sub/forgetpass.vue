<template>
  <div id="forgetpass">
    <div id="wrapper">
      <h1>Zabudnuté heslo</h1>
      <form>
        <div class="form-group">
          <label for="email">Zadajte Vašu emailová adresu</label>
          <input type="email" class="form-control" id="email" placeholder="Emailová adresa" v-model="account.value" @focus="clearMessages" @input="$v.account.$touch()" :class="{valid: !$v.account.$error && $v.account.$dirty, invalid: $v.account.$error}">
          <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
        </div>
        <button type="submit" class="btn btn-primary" @keyup.enter="recoverPassword" @click.prevent="recoverPassword" :disabled="$v.$invalid">Odoslať</button>
      </form>
      <app-alert
        :alertType="[
            recoveredAccountProperties.dangerMessage !== null || account.dangerMessage !== null ? 'alert-danger' : 'alert-success']"
        :condition="[
            recoveredAccountProperties.dangerMessage !== null,
            recoveredAccountProperties.successMessage !== null,
            account.dangerMessage !== null,
            account.successMessage !== null]"
        :content="[
            recoveredAccountProperties.dangerMessage,
            recoveredAccountProperties.successMessage,
            account.dangerMessage,
            account.successMessage]"/>
    </div>
  </div>
</template>

<script>
import alert from '@/components/common/alert'
import {required, email} from 'vuelidate/lib/validators'

export default {
  name: 'forgetpass',
  created: function () {
    if (this.$route.params.key) this.verifyRecoverToken()
  },
  data: function () {
    return {
      resource: null,
      account: {
        value: '',
        dangerMessage: null,
        successMessage: null
      },
      recoveredAccountProperties: {
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
    clearMessages () {
      this.account.dangerMessage = null
      this.account.successMessage = null
    },
    verifyRecoverToken () {
      this.resource = this.$resource('{service}/forgetpassword/{account}/{id}/{token}/{key}', {}, {verifyRecoverToken: {method: 'GET'}})
      this.resource.verifyRecoverToken({service: 'authorization-server', account: 'account', id: this.recoveredAccountProperties.values.account, token: 'token', key: this.recoveredAccountProperties.values.token})
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          if (!parsed.error) {
            this.recoveredAccountProperties.dangerMessage = null
            this.recoveredAccountProperties.successMessage = parsed.message
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (parsed.error) {
              this.recoveredAccountProperties.successMessage = null
              this.recoveredAccountProperties.dangerMessage = parsed.message
            }
          })
        })
    },
    recoverPassword () {
      this.resource = this.$resource('{service}/forgetpassword', {}, {recoverPassword: {method: 'POST'}})
      this.resource.recoverPassword({service: 'authorization-server'}, {email: this.account.value})
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          if (!parsed.error) {
            this.account.dangerMessage = null
            this.account.successMessage = parsed.message
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (parsed.error) {
              this.account.successMessage = null
              this.account.dangerMessage = parsed.message
            }
          })
        })
    }
  },
  validations: {
    account: {
      value: {
        required,
        email
      }
    }
  }
}
</script>

<style scoped>
  div#wrapper {
    width: 100%;
  }

  div#forgetpass {
    padding: 2rem;
    height: 100vh;
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

  input[type="email"] {
    font-size: 1.3em;
    width: 100%;
    height: 3rem;
    display: block;
    box-shadow: none;
    border: none;
    outline: 0;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div input.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div input.valid {
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 1200px) {
    input[type="email"] {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#forgetpass {
      height: auto;
    }
  }
</style>
