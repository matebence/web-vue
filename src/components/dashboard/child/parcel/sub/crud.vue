<template>
  <div id="crud">
    <form>
      <div class="form-group">
        <label
          for="receiver">
          Zadajte meno príjemcu
        </label>
        <input
          aria-describedby="receiverInvalid"
          type="text"
          class="form-control"
          id="receiver"
          v-model="form.values.receiver.name"
          placeholder="Meno príjemca"
          @change="$v.form.values.receiver.name.$touch()"
          @input="autoCompleteReceiver($event.target.value)"
          :class="{valid: !$v.form.values.receiver.name.$error && $v.form.values.receiver.name.$dirty, invalid: $v.form.values.receiver.name.$error}">
        <div id="autocomplete">
          <ul>
            <li v-for="user in autoComplete.client" v-bind:key="user.accountId" v-if="user.accountId !== signIn.accountId" :data-accountId="user.accountId" @click.prevent="selectReceiver($event.target)">{{user.firstName}} {{user.lastName}}</li>
          </ul>
        </div>
        <small
          id="confirmPasswordInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.receiver !== null">{{parcelError.reason.receiver}}</small>
      </div>
      <div class="form-group">
        <label
          for="category">
          Vyberte kategóriu
        </label>
        <select
          aria-describedby="categoryInvalid"
          class="form-control"
          id="category"
          v-model="form.values.category"
          @change="$v.form.values.category.$touch()"
          :class="{valid: !$v.form.values.category.$error && $v.form.values.category.$dirty, invalid: $v.form.values.category.$error}">
          <option value="null" disabled selected >Vyberte z možností</option>
          <option v-for="category in categories" :value="category" v-bind:key="category.id">{{category.name}}</option>
        </select>
        <small
          id="categoryInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.categoryId !== null">{{parcelError.reason.categoryId}}</small>
      </div>
      <div class="form-group">
        <label
          for="note">
          Zadajte poznámku
        </label>
        <textarea
          aria-describedby="noteInvalid"
          class="form-control"
          id="note"
          rows="1"
          v-model="form.values.note"
          placeholder="Vaša poznámka"
          @input="$v.form.values.note.$touch()"
          :class="{valid: !$v.form.values.note.$error && $v.form.values.note.$dirty, invalid: $v.form.values.note.$error}">
        </textarea>
        <small
          id="noteInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.note !== null">{{parcelError.reason.note}}</small>
      </div>
      <div class="form-group">
        <label
          for="length">
          Zadajte dľžku balíka
        </label>
        <input
          aria-describedby="lengthInvalid"
          type="text" class="form-control"
          id="length"
          v-model="form.values.length"
          placeholder="Dľžka balíka"
          @input="$v.form.values.length.$touch()"
          :class="{valid: !$v.form.values.length.$error && $v.form.values.length.$dirty, invalid: $v.form.values.length.$error}">
        <small
          id="lengthInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.length !== null">{{parcelError.reason.length}}</small>
      </div>
      <div class="form-group">
        <label
          for="width">
          Zadajte šírku balíka
        </label>
        <input
          aria-describedby="widthInvalid"
          type="text" class="form-control"
          id="width"
          v-model="form.values.width"
          placeholder="Šírka balíka"
          @input="$v.form.values.width.$touch()"
          :class="{valid: !$v.form.values.width.$error && $v.form.values.width.$dirty, invalid: $v.form.values.width.$error}">
        <small
          id="widthInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.width !== null">{{parcelError.reason.width}}</small>
      </div>
      <div class="form-group">
        <label
          for="height">
          Zadajte výšku balíka
        </label>
        <input
          aria-describedby="heightInvalid"
          type="text" class="form-control"
          id="height"
          v-model="form.values.height"
          placeholder="Výška balíka"
          @input="$v.form.values.height.$touch()"
          :class="{valid: !$v.form.values.height.$error && $v.form.values.height.$dirty, invalid: $v.form.values.height.$error}">
        <small
          id="heightInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.height !== null">{{parcelError.reason.height}}</small>
      </div>
      <div class="form-group">
        <label
          for="weight">
          Zadajte hmotnosť balíka
        </label>
        <input
          aria-describedby="weightInvalid"
          type="text" class="form-control"
          id="weight"
          v-model="form.values.weight"
          placeholder="Hmotnosť balíka"
          @input="$v.form.values.weight.$touch()"
          :class="{valid: !$v.form.values.weight.$error && $v.form.values.weight.$dirty, invalid: $v.form.values.weight.$error}">
        <small
          id="weightInvalid"
          class="form-text text-muted"
          v-show="parcelError.reason.weight !== null">{{parcelError.reason.weight}}</small>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onCreate"
        v-show="form.values.id === undefined">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-show="!parcelDone"></span>&nbsp;Vytvoriť
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onUpdate"
        v-show="form.values.id !== undefined">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-show="!parcelDone"></span>&nbsp;Aktualizovať
      </button>
    </form>
    <app-alert
      :type="[parcelError.is ? 'alert-danger' : 'alert-success']"
      :condition="[(parcelError.message !== null && parcelError.from === 'create')]"
      :content="[parcelError.message]"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required, alphaNum, numeric} from 'vuelidate/lib/validators'

export default {
  name: 'crud',
  props: ['form'],
  created: function () {
    return this.$store.dispatch(types.ACTION_CATEGORY_GET_ALL, {})
      .catch(err => console.log(err))
  },
  beforeMount: function () {
    return this.$store.commit(types.MUTATIONS_CLEAR_PARCEL_ERRORS, {})
  },
  data: function () {
    return {
      autoComplete: {
        client: {
        }
      }
    }
  },
  validations: {
    form: {
      values: {
        receiver: {
          name: {
            required,
            alpha: value => value.match(/^[\D ]+$/)
          },
          accountId: {
            required,
            numeric
          }
        },
        category: {
          id: {
            required,
            numeric
          }
        },
        note: {
          required,
          alphaNum
        },
        length: {
          required,
          numeric
        },
        width: {
          required,
          numeric
        },
        height: {
          required,
          numeric
        },
        weight: {
          required,
          numeric
        }
      }
    }
  },
  components: {
    appAlert: alert
  },
  computed: {
    ...mapGetters({
      categories: types.GETTER_CATEGORY_DATA_GET_ALL,
      parcelCreate: types.GETTER_PARCEL_DATA_CREATE,
      parcelDone: types.GETTER_PARCEL_DONE,
      parcelError: types.GETTER_PARCEL_ERROR,
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    autoCompleteReceiver: function ($event) {
      if ($event.length === 0) return this.searchCourier({roles: process.env.APP_ROLE_CLIENT})
      if ($event.length < 3) return
      return this.searchReceiver({firstName: $event, roles: process.env.APP_ROLE_CLIENT})
    },
    searchReceiver: function (obj) {
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {...obj})
        .then(result => {
          this.autoComplete.client = result
        })
        .catch(err => console.log(err))
    },
    selectReceiver: function ($event) {
      this.form.values.receiver.accountId = $event.dataset.accountid
      this.form.values.receiver.name = $event.textContent
      this.autoComplete.client = {}
    },
    onCreate: function () {
      if (this.form.values.id === undefined) {
        this.parcelError.message = null
        this.parcelError.is = false

        this.$store.commit(types.MUTATION_PARCEL_DATA, {
          data: {
            create: [...this.parcelCreate, {
              ...this.form.values,
              sender: {senderId: this.signIn.accountId},
              id: Date.now() * -1
            }]
          }
        })
        return this.$emit('crud', {component: 'app-list', icon: 'plus', nav: {id: 2, value: 'Nepridelené'}})
      }
    },
    onUpdate: function () {
      if (this.form.values.id !== undefined) {
        this.parcelError.message = null
        this.parcelError.is = false

        const data = this.parcelCreate.filter(e => e.id !== this.form.values.id)
        this.$store.commit(types.MUTATION_PARCEL_DATA, {
          data: {
            create: [...data, {
              ...this.form.values
            }]
          }
        })
        return this.$emit('crud', {component: 'app-list', icon: 'plus', nav: {id: 2, value: 'Nepridelené'}})
      }
    }
  }
}
</script>

<style scoped>
  div#crud form {
    margin-top: 1rem;
    padding: 0.5rem;
    margin-bottom: 3rem;
  }

  div#crud label {
    font-size: 0.9em;
  }

  div#crud button {
    font-size: 0.9em;
    background: #ffffff;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    float: right;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div#crud button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#crud button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#crud select {
    background: #ffffff;
    font-size: 0.9em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #6c757d;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#crud select:focus {
    background: #ffffff;
  }

  div#crud option {
    background: #ffffff;
  }

  div#crud input[type="text"] {
    font-size: 0.9em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#crud div #autocomplete {
    width: 100%;
    position: relative;
  }

  div#crud div #autocomplete ul {
    position: absolute;
    width: calc(100%);
    background: #ffffff;
  }

  div#crud div#autocomplete ul li {
    font-size: 1em;
    padding: 0.8rem;
    border: solid 0.01rem #dbdbdb;
  }
  div#crud div#autocomplete ul li:hover {
    cursor: pointer;
    background: #f1f1f1;
  }

  div#crud textarea {
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#crud small, .text-muted {
    font-size: 0.8em;
    color: #ff0000 !important;
  }

  div#crud input.invalid, div#crud select.invalid, div#crud textarea.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#crud input.valid, div#crud select.valid, div#crud textarea.valid {
    border-bottom: 0.1rem solid #008000;
  }
</style>
