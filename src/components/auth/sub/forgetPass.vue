<template>
  <div
    id="forgetpass">
    <div
      id="wrapper">
      <h1>Zabudnuté heslo</h1>
      <form>
        <div
          class="form-group">
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
          @keyup.enter="onSend"
          @click.prevent="onSend"
          :disabled="$v.$invalid">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-show="!forgetPassword.done">
          </span>&nbsp;Odoslať
        </button>
      </form>
      <app-alert
        :type="[forgetPassword.error.is || recoverToken.error.is ? 'alert-danger' : 'alert-success']"
        :condition="[forgetPassword.error.message !== null, recoverToken.error.message !== null]"
        :content="[forgetPassword.error.message, recoverToken.error.message]"/>
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
    if (this.$route.params.key) this.onPageLoad()
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
      forgetPassword: types.GETTER_FORGET_PASSWORD_DEFAULT,
      recoverToken: types.GETTER_ACCOUNT_RECOVER_DEFAULT
    })
  },
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: `/${$event.replace('app-', '')}`})
    },
    onPageLoad () {
      this.$store.dispatch(types.ACTION_ACCOUNT_RECOVER, {
        id: this.url.values.id,
        key: this.url.values.key})
    },
    onSend () {
      this.$store.dispatch(types.ACTION_FORGET_PASSWORD, {
        email: this.form.values.email})
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
    div#wrapper {
      height: auto;
    }

    div#forgetpass {
      height: 100vh;
    }
  }

  @media (max-width: 576px) {
    div#forgetpass {
      padding: 0;
    }
  }
</style>
