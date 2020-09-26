<template>
  <div id="forgetpass">
    <div id="wrapper">
      <h1>Zabudnuté heslo</h1>
      <form>
        <div class="form-group">
          <label
            for="email">
            Zadajte Vašu emailová adresu
          </label>
          <input
            autofocus
            autocomplete="off"
            type="email"
            class="form-control" id="email"
            placeholder="Emailová adresa"
            v-model="appForgetPassword.form.values.email"
            @input="$v.appForgetPassword.form.values.email.$touch()"
            :class="{valid: !$v.appForgetPassword.form.values.email.$error && $v.appForgetPassword.form.values.email.$dirty, invalid: $v.appForgetPassword.form.values.email.$error}">
          <a
            href="/sign-in"
            @click.prevent="onLoadComponent({name: 'welcome', path: 'sign-in'})">
            Späť na prihlásenie
          </a>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="onSubmit"
          :disabled="$v.$invalid">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="!forgetPasswordDone">
          </span>&nbsp;Odoslať
        </button>
      </form>
      <div class="alert-wrapper">
        <app-alert
          :condition="appForgetPassword.alert.condition"
          :type="appForgetPassword.alert.type"
          :text="appForgetPassword.alert.text"/>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  import alert from '@/components/common/alert'

  import {required, email} from 'vuelidate/lib/validators'

  export default {
    created: function () {
      if (this.$route.params.key) return this.onPageLoad()
    },
    name: 'forgetpass',
    props: ['appForgetPassword', 'activeEl'],
    data: function () {
      return {}
    },
    validations: {
      appForgetPassword: {
        form: {
          values: {
            email: {
              required,
              email
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
        forgetPasswordDone: types.GETTER_FORGET_PASSWORD_DONE,
        forgetPasswordError: types.GETTER_FORGET_PASSWORD_ERROR
      })
    },
    methods: {
      showAlertModal: function (condition, type, text) {
        this.appForgetPassword.alert.condition = condition
        this.appForgetPassword.alert.type = type
        this.appForgetPassword.alert.text = text
      },
      onPageLoad: function () {
        return this.$store.dispatch(types.ACTION_ACCOUNT_RECOVER, {
          id: this.appForgetPassword.url.url.values.id,
          key: this.appForgetPassword.url.url.values.key
        })
          .then(result => this.showAlertModal([result !== null], ['alert-success'], [result.message]))
          .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
      },
      onLoadComponent: function ($event) {
        return this.$router.push($event)
      },
      onSubmit: function () {
        this.forgetPasswordError.message = null
        this.forgetPasswordError.is = false

        return this.$store.dispatch(types.ACTION_FORGET_PASSWORD, {email: this.appForgetPassword.form.values.email})
          .then(result => this.showAlertModal([result !== null], ['alert-success'], [result.message]))
          .catch(err => this.showAlertModal([err !== null], ['alert-danger'], [err.message]))
      }
    }
  }
</script>

<style scoped>
  div#forgetpass {
    padding: 2rem;
    height: 98vh;
    display: flex;
    align-items: center;
  }

  div#forgetpass div#wrapper {
    width: 100%;
  }

  div#forgetpass h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div#forgetpass a {
    display: block;
    float: right;
    margin-top: 0.5rem;
    color: #176c9d;
  }

  div#forgetpass a:hover {
    color: #1796dc;
  }

  div#forgetpass form {
    padding: 3rem;
  }

  div#forgetpass button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 2rem;
  }

  div#forgetpass button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#forgetpass button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#forgetpass input[type="email"] {
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

  div#forgetpass div input.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#forgetpass div input.valid {
    border-bottom: 0.1rem solid #008000;
  }

  div#forgetpass .spinner-border {
    margin-bottom: 0.3rem;
  }

  @media (max-width: 1200px) {
    div#forgetpass input[type="email"] {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#forgetpass div#wrapper {
      height: auto;
    }

    div#forgetpass div#forgetpass {
      height: 100vh;
    }
  }

  @media (max-width: 576px) {
    div#forgetpass div#forgetpass {
      padding: 0;
    }
  }
</style>
