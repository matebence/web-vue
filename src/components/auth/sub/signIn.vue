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
            type="text"
            class="form-control"
            id="username"
            placeholder="Použivatelské meno"
            v-model="form.values.userName">
        </div>
        <div class="form-group">
          <label for="password">
            Zadajte heslo
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Heslo"
            v-model="form.values.password">
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
            v-model="form.values.stayLoggedIn">
          <a
            href="#"
            @click.prevent="loadComponent('app-forget-password')"
            id="forgetPassword">
            Zabudli ste heslo?
          </a>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="$v.$invalid"
          @keyup.enter="onSignIn"
          @click.prevent="onSignIn">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="!signIn.done">
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
        @click.prevent="loadComponent('app-sign-up')">
        Zaregistrovať sa teraz
      </a>
      <app-alert
        :type="[signIn.error.is || signOut.error.is ? 'alert-danger' : 'alert-success']"
        :condition="[signIn.error.message !== null, signOut.error.message !== null]"
        :content="[signIn.error.message, signOut.error.message]"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'signin',
  created: function () {
    this.$store.dispatch(types.ACTION_AUTO_SIGN_IN)
  },
  data: function () {
    return {
      form: {
        values: {
          userName: null,
          password: null,
          stayLoggedIn: false
        }
      }
    }
  },
  validations: {
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
  },
  components: {
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DEFAULT,
      signOut: types.GETTER_SIGN_OUT_DEFAULT
    })
  },
  methods: {
    loadComponent: function ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    },
    onSignIn: function () {
      this.signIn.error.message = null
      this.signIn.error.is = false

      this.$store.dispatch(types.ACTION_SIGN_IN, {
        grantType: process.env.GRANT_TYPE_PASSWORD,
        userName: this.form.values.userName,
        password: this.form.values.password,
        stayLoggedIn: this.form.values.stayLoggedIn})
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

  div#signin a#forgetPassword{
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
