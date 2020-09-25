<template>
  <div id="confirm">
    <div class="modal fade" :id="confirmId" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{title}}</h5>
          </div>
          <div class="modal-body">
            <p>{{text}}</p>
            <div class="form-input">
              <input
                v-model="components.appConfirm.form.values.password"
                :class="{invalid: components.appConfirm.form.is.valid}"
                type="password"
                name="password"
                id="password"
                autofocus
                autocomplete="off">
            </div>
          </div>
          <div class="modal-footer">
            <button id="negative" type="button" data-dismiss="modal">{{negativeButton}}</button>
            <button
              id="positive"
              type="button"
              @click.prevent="onConfirmed()">{{positiveButton}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    name: 'confirm',
    props: ['confirmId', 'title', 'text', 'positiveButton', 'negativeButton'],
    data: function () {
      return {
        components: {
          appConfirm: {
            form: {
              values: {
                password: null
              },
              is: {
                valid: false
              }
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        signIn: types.GETTER_SIGN_IN_DATA
      })
    },
    methods: {
      onConfirmed: function () {
        return this.$store.dispatch(types.ACTION_CONFIRM_CHANGES, {
          grantType: process.env.GRANT_TYPE_PASSWORD,
          userName: this.signIn.userName,
          password: this.components.appConfirm.form.values.password,
          stayLoggedIn: this.signIn.stayLoggedIn
        })
          .then(result => {
            return this.$emit('confirmed', result)
          })
          .catch(err => {
            this.components.appConfirm.form.is.valid = !!err.message
          })
      }
    }
  }
</script>

<style scoped>
  div#confirm h5 {
    font-size: 1.3em;
  }

  div#confirm button#positive,
  div#confirm button#negative {
    text-transform: inherit;
    background: #ffffff;
    border: solid 0.09rem #7f7f7f;
    border-radius: 0.5rem;
    color: #176c9d;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }

  div#confirm button#positive:hover {
    background: #176c9d;
    border-color: #176c9d;
    color: #ffffff;
  }

  div#confirm input[type="password"] {
    font-size: 1.15em;
    font-weight: 700;
    width: 40%;
    height: 2rem;
    display: block;
    border: none;
    color: #000000;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#confirm input[type="password"].invalid {
    border-bottom: 0.1rem solid #ff0000;
  }
</style>
