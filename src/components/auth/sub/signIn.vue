<template>
  <div id="signin">
    <div id="wrapper">
      <h1>Prihlásenie</h1>
      <form>
        <div class="form-group">
          <label for="username">Zadajte použivatelské meno</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Použivatelské meno"
            v-model="form.values.userName">
        </div>
        <div class="form-group">
          <label for="password">Zadajte heslo</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Heslo"
            v-model="form.values.password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="stayLoggedIn" v-model="form.values.stayLoggedIn">
          <label class="form-check-label" for="stayLoggedIn">Zostať prihlásený</label>
        </div>
        <a href="#" @click.prevent="loadComponent('app-forget-password')">Zabudli ste heslo?</a>
        <button type="submit" class="btn btn-primary" :disabled="$v.$invalid" @keyup.enter="onSignIn" @click.prevent="onSignIn">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="!signIn.done"></span>
          Prihlásiť sa
        </button>
      </form>
      <p class="text-center">Nemáte ešte použivatelské konto?</p>
      <a class="text-center signup" href="#" @click.prevent="loadComponent('app-sign-up')">Zaregistrovať sa teraz</a>
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
          userName: '',
          password: '',
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
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    },
    onSignIn () {
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
  div#wrapper {
    width: 100%;
  }

  div#signin {
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

  p, a {
    display: block;
  }

  p {
    margin-bottom: 0.3rem;
  }

  a {
    color: #176c9d;
  }

  a.signup {
    margin-bottom: 1rem;
  }

  a:hover {
    color: #1796dc;
  }

  form {
    padding: 3rem;
  }

  a {
    color: #176c9d;
    text-align: right;
  }

  button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 3rem;
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

  input[type="text"], input[type="password"] {
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

  @media (max-width: 1200px) {
    input[type="text"], input[type="password"] {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#signin {
      height: auto;
    }
  }
</style>
