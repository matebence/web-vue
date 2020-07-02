<template>
  <div id="forgetpass">
    <div id="wrapper">
      <h1>Zabudnuté heslo</h1>
      <form>
        <div class="form-group">
          <label for="email">Zadajte Vašu emailová adresu</label>
          <input type="email" class="form-control" id="email" placeholder="Emailová adresa" v-model="email.value" @focus="clearMessages" @input="$v.email.$touch()" :class="{valid: !$v.email.$error && $v.email.$dirty, invalid: $v.email.$error}">
          <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="send" :disabled="$v.$invalid">Odoslať</button>
      </form>
      <transition mode="out-in"
                  type="animation"
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-success" role="alert" v-show="email.dangerMessage === null && email.successMessage !== null">
          <p color="text-center">{{ email.successMessage }}</p>
        </div>
      </transition>
      <transition mode="out-in"
                  type="animation"
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-danger" role="alert" v-show="email.successMessage === null && email.dangerMessage !== null">
          <p class="text-center">{{ email.dangerMessage }}</p>
        </div>
      </transition>
      <transition mode="out-in"
                  type="animation"
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-success" role="alert" v-show="recoveredAccountProperties.dangerMessage === null && recoveredAccountProperties.successMessage !== null">
          <p color="text-center">{{ recoveredAccountProperties.successMessage }}</p>
        </div>
      </transition>
      <transition mode="out-in"
                  type="animation"
                  appear
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div class="alert alert-danger" role="alert" v-show="recoveredAccountProperties.successMessage === null && recoveredAccountProperties.dangerMessage !== null">
          <p class="text-center">{{ recoveredAccountProperties.dangerMessage }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'

export default {
  name: 'forgetpass',
  beforeMount: function () {
    if (this.$route.params.key) this.recoverAccount()
  },
  created: function () {
    this.resource = this.$resource('{service}/forgetpassword/{account}/{id}/{token}/{key}', {},
      {
        recoverPassword: {method: 'POST'},
        verifyRecoverToken: {method: 'GET'}
      })
  },
  data: function () {
    return {
      resource: null,
      email: {
        value: '',
        dangerMessage: null,
        successMessage: null
      },
      recoveredAccountProperties: {
        token: this.$route.params.key,
        account: this.$route.params.id,
        dangerMessage: null,
        successMessage: null
      }
    }
  },
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    },
    clearMessages () {
      this.email.dangerMessage = null
      this.email.successMessage = null
    },
    recoverAccount () {
      this.resource.verifyRecoverToken({service: 'authorization-server', account: 'account', id: this.recoveredAccountProperties.account, token: 'token', key: this.recoveredAccountProperties.token}, {email: this.email.value})
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
    send () {
      this.resource.recoverPassword({service: 'authorization-server', account: '', id: '', token: '', key: ''}, {email: this.email.value})
        .then(response => {
          return response.json()
        })
        .then(parsed => {
          if (!parsed.error) {
            this.email.dangerMessage = null
            this.email.successMessage = parsed.message
          }
        })
        .catch(err => {
          err.json().then(parsed => {
            if (parsed.error) {
              this.email.successMessage = null
              this.email.dangerMessage = parsed.message
            }
          })
        })
    }
  },
  validations: {
    email: {
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
</style>
