<template>
  <div id="signin">
    <div id="wrapper">
      <h1>Prihlásenie</h1>
      <form>
        <div class="form-group">
          <label
            for="username">
            Zadajte použivatelské meno
          </label>
          <input
            autofocus
            autocomplete="off"
            type="text"
            class="form-control"
            id="username"
            placeholder="Použivatelské meno"
            v-model="appSignIn.form.values.userName">
        </div>
        <div class="form-group">
          <label for="password">
            Zadajte heslo
          </label>
          <input
            autocomplete="off"
            type="password"
            class="form-control"
            id="password"
            placeholder="Heslo"
            v-model="appSignIn.form.values.password">
        </div>
        <div class="form-group">
          <label
            class="form-check-label"
            for="stayLoggedIn">
            Zostať prihlásený
          </label>
          <input
            type="checkbox"
            class="form-check-input"
            id="stayLoggedIn"
            v-model="appSignIn.form.values.stayLoggedIn">
          <a
            href="#"
            @click.prevent="onLoadComponent('forget-password')"
            id="forgetPassword">
            Zabudli ste heslo?
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
            v-show="!signInDone">
          </span>&nbsp;Prihlásiť sa
        </button>
      </form>
      <p
        class="text-center">
        Nemáte ešte použivatelské konto?
      </p>
      <a
        class="text-center signup"
        href="#"
        @click.prevent="onLoadComponent('sign-up')">
        Zaregistrovať sa teraz
      </a>
      <div class="alert-wrapper">
        <app-alert
          :condition="appSignIn.alert.condition"
          :type="appSignIn.alert.type"
          :text="appSignIn.alert.text"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  import alert from '@/components/common/alert'

  import {required} from 'vuelidate/lib/validators'

  export default {
    created: function () {
      return this.$store.dispatch(types.ACTION_AUTO_SIGN_IN)
        .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
    },
    beforeMount: function () {
      this.showAlertModal([this.signOutError.message !== null], [this.signOutError.is ? 'alert-danger' : 'alert-success'], [this.signOutError.message])
    },
    name: 'signin',
    props: ['appSignIn', 'activeEl'],
    data: function () {
      return {}
    },
    validations: {
      appSignIn: {
        form: {
          values: {
            userName: {
              required
            },
            password: {
              required
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
        signInDone: types.GETTER_SIGN_IN_DONE,
        signInError: types.GETTER_SIGN_IN_ERROR,
        signOutError: types.GETTER_SIGN_OUT_ERROR
      })
    },
    methods: {
      showAlertModal: function (condition, type, text) {
        this.appSignIn.alert.condition = condition
        this.appSignIn.alert.type = type
        this.appSignIn.alert.text = text
      },
      onLoadComponent: function ($event) {
        return this.$router.push({path: $event})
      },
      onSubmit: function () {
        this.signInError.message = this.signOutError.message = null
        this.signInError.is = this.signOutError.is = false

        return this.$store.dispatch(types.ACTION_SIGN_IN, {
          grantType: process.env.GRANT_TYPE_PASSWORD,
          userName: this.appSignIn.form.values.userName,
          password: this.appSignIn.form.values.password,
          stayLoggedIn: this.appSignIn.form.values.stayLoggedIn
        })
          .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
      }
    }
  }
</script>

<style scoped>
  div#signin {
    padding: 2rem;
    height: 98vh;
    display: flex;
    align-items: center;
  }

  div#signin div#wrapper {
    width: 100%;
  }

  div#signin h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div#signin p, div#signin a {
    display: block;
  }

  div#signin p {
    margin-bottom: 0.3rem;
  }

  div#signin a {
    color: #176c9d;
  }

  div#signin a#forgetPassword {
    display: inline;
    float: right;
  }

  div#signin a.signup {
    margin-bottom: 1rem;
  }

  div#signin a:hover {
    color: #1796dc;
  }

  div#signin form {
    padding: 3rem;
  }

  div#signin a {
    color: #176c9d;
    text-align: right;
  }

  div#signin button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 3rem;
  }

  div#signin button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#signin button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#signin input[type="text"], div#signin input[type="password"] {
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

  div#signin input[type="checkbox"].form-check-input {
    position: relative;
    display: inline;
    margin-left: 0.3rem;
  }

  @media (max-width: 1200px) {
    div#signin input[type="text"], div#signin input[type="password"] {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#signin div#wrapper {
      height: auto;
    }

    div#signin div#signin {
      height: 100vh;
    }
  }

  @media (max-width: 600px) {
    div#signin div#signin {
      padding: 0;
    }

    div#signin a#forgetPassword {
      display: flex;
      float: none;
      margin-top: 0.5rem;
    }
  }
</style>
