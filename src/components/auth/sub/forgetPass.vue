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
            type="email"
            class="form-control" id="email"
            placeholder="Emailová adresa"
            v-model="form.values.email"
            @input="$v.form.values.email.$touch()"
            :class="{valid: !$v.form.values.email.$error && $v.form.values.email.$dirty, invalid: $v.form.values.email.$error}">
          <a
            href="#"
            @click.prevent="loadComponent('app-sign-in')">
            Späť na prihlásenie
          </a>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="onSend"
          :disabled="$v.$invalid">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="!forgetPasswordDone">
          </span>&nbsp;Odoslať
        </button>
      </form>
      <app-alert
        :type="[forgetPasswordError.is || recoverTokenError.is ? 'alert-danger' : 'alert-success']"
        :condition="[forgetPasswordError.message !== null, recoverTokenError.message !== null]"
        :content="[forgetPasswordError.message, recoverTokenError.message]"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required, email} from 'vuelidate/lib/validators'

export default {
  name: 'forgetpass',
  created: function () {
    if (this.$route.params.key) return this.onPageLoad()
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_FORGET_PASSWORD_ERRORS, {})
  },
  data: function () {
    return {
      form: {
        values: {
          email: null
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
        email: {
          required,
          email
        }
      }
    }
  },
  components: {
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      forgetPasswordError: types.GETTER_FORGET_PASSWORD_ERROR,
      forgetPasswordDone: types.GETTER_FORGET_PASSWORD_DONE,
      recoverTokenError: types.GETTER_ACCOUNT_RECOVER_ERROR,
      recoverTokenDone: types.GETTER_ACCOUNT_RECOVER_DONE
    })
  },
  methods: {
    loadComponent: function ($event) {
      this.$emit('loadComponent', $event)
      return this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    onPageLoad: function () {
      return this.$store.dispatch(types.ACTION_ACCOUNT_RECOVER, {id: this.url.values.id, key: this.url.values.key})
        .catch(err => console.log(err))
    },
    onSend: function () {
      return this.$store.dispatch(types.ACTION_FORGET_PASSWORD, {email: this.form.values.email})
        .catch(err => console.log(err))
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
