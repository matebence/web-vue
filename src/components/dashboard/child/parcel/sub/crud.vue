<template>
  <div id="crud">
    <br/><br/>
    <h1 v-if="form.values.id === undefined">Nový balík</h1>
    <h1 v-else>Aktualizovať balík</h1>
    <form>
      <div class="form-group">
        <label
          for="receiver">
          Zadajte meno príjemcu
        </label>
        <input
          autofocus
          autocomplete="off"
          aria-describedby="receiverInvalid"
          type="text"
          class="form-control"
          id="receiver"
          v-model="form.values.receiver.name"
          placeholder="Meno príjemca"
          @change="$v.form.values.receiver.name.$touch()"
          @input="onAutoCompleteReceiver($event.target.value)"
          :class="{valid: !$v.form.values.receiver.name.$error && $v.form.values.receiver.name.$dirty, invalid: $v.form.values.receiver.name.$error}">
        <div id="autocomplete">
          <ul>
            <li v-for="user in components.appCrud.autocomplete.client" :key="user.accountId"
                v-if="user.accountId !== signIn.accountId" :data-accountId="user.accountId"
                @click.prevent="onSelectedReceiver($event.target)">{{user.firstName}} {{user.lastName}}
            </li>
          </ul>
        </div>
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
          <option value="null" disabled selected>Vyberte z možností</option>
          <option v-for="category in categories" :value="category" :key="category.id">{{category.name}}</option>
        </select>
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
      </div>
      <div class="form-group">
        <label
          for="length">
          Zadajte dľžku balíka
        </label>
        <input
          autocomplete="off"
          aria-describedby="lengthInvalid"
          type="text" class="form-control"
          id="length"
          v-model="form.values.length"
          placeholder="Dľžka balíka"
          @input="$v.form.values.length.$touch()"
          :class="{valid: !$v.form.values.length.$error && $v.form.values.length.$dirty, invalid: $v.form.values.length.$error}">
      </div>
      <div class="form-group">
        <label
          for="width">
          Zadajte šírku balíka
        </label>
        <input
          autocomplete="off"
          aria-describedby="widthInvalid"
          type="text" class="form-control"
          id="width"
          v-model="form.values.width"
          placeholder="Šírka balíka"
          @input="$v.form.values.width.$touch()"
          :class="{valid: !$v.form.values.width.$error && $v.form.values.width.$dirty, invalid: $v.form.values.width.$error}">
      </div>
      <div class="form-group">
        <label
          for="height">
          Zadajte výšku balíka
        </label>
        <input
          autocomplete="off"
          aria-describedby="heightInvalid"
          type="text" class="form-control"
          id="height"
          v-model="form.values.height"
          placeholder="Výška balíka"
          @input="$v.form.values.height.$touch()"
          :class="{valid: !$v.form.values.height.$error && $v.form.values.height.$dirty, invalid: $v.form.values.height.$error}">
      </div>
      <div class="form-group">
        <label
          for="weight">
          Zadajte hmotnosť balíka
        </label>
        <input
          autocomplete="off"
          aria-describedby="weightInvalid"
          type="text" class="form-control"
          id="weight"
          v-model="form.values.weight"
          placeholder="Hmotnosť balíka"
          @input="$v.form.values.weight.$touch()"
          :class="{valid: !$v.form.values.weight.$error && $v.form.values.weight.$dirty, invalid: $v.form.values.weight.$error}">
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onCreate"
        v-if="form.values.id === undefined">
        &nbsp;Vytvoriť
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onUpdate"
        v-else>
        &nbsp;Aktualizovať
      </button>
    </form>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  import {required, alphaNum, numeric} from 'vuelidate/lib/validators'

  export default {
    created: function () {
      return this.$store.dispatch(types.ACTION_CATEGORY_GET_ALL, {})
        .catch(err => console.warn(err.message))
    },
    name: 'crud',
    props: ['form'],
    data: function () {
      return {
        components: {
          appCrud: {
            autocomplete: {
              client: {}
            }
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
              alpha: value => new RegExp(/^[\D ]+$/).test(value)
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
    computed: {
      ...mapGetters({
        categories: types.GETTER_CATEGORY_DATA_GET_ALL,
        parcelCreate: types.GETTER_PARCEL_DATA_CREATE,
        signIn: types.GETTER_SIGN_IN_DATA
      })
    },
    methods: {
      onAutoCompleteReceiver: function ($event) {
        if ($event.length === 0) return this.searchCourier({roles: process.env.APP_ROLE_CLIENT})
        if ($event.length < 3) return
        return this.onSearchReceiver({firstName: $event, roles: process.env.APP_ROLE_CLIENT})
      },
      onSearchReceiver: function (obj) {
        return this.$store.dispatch(types.ACTION_USER_SEARCH, {...obj})
          .then(result => {
            this.components.appCrud.autocomplete.client = result
          })
          .catch(err => console.warn(err.message))
      },
      onSelectedReceiver: function ($event) {
        this.form.values.receiver.accountId = $event.dataset.accountid
        this.form.values.receiver.name = $event.textContent
        this.components.appCrud.autocomplete.client = {}
      },
      onCreate: function () {
        if (this.form.values.id === undefined) {
          this.$store.commit(types.MUTATION_PARCEL_DATA, {
            data: {
              create: [...this.parcelCreate, {
                ...this.form.values,
                sender: {senderId: this.signIn.accountId},
                id: Date.now() * -1
              }]
            }
          })
          return this.$emit('crud', {component: 'app-vertical-list', icon: 'plus', nav: {id: 2, value: 'Nepridelené'}})
        }
      },
      onUpdate: function () {
        if (this.form.values.id !== undefined) {
          const data = this.parcelCreate.filter(e => e.id !== this.form.values.id)
          this.$store.commit(types.MUTATION_PARCEL_DATA, {
            data: {
              create: [...data, {id: Date.now() * -1, ...this.form.values}]
            }
          })
          return this.$emit('crud', {component: 'app-vertical-list', icon: 'plus', nav: {id: 2, value: 'Nepridelené'}})
        }
      }
    }
  }
</script>

<style scoped>
  div#crud h1 {
    font-size: 2em;
    display: inline;
  }

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
    border-radius: 10rem;
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

  div#crud div#autocomplete {
    width: 100%;
    position: relative;
  }

  div#crud div#autocomplete ul {
    position: absolute;
    width: calc(100%);
    background: #ffffff;
  }

  div#crud #autocomplete ul li {
    font-size: 1em;
    padding: 0.8rem;
    border: solid 0.01rem #dbdbdb;
  }

  div#crud #autocomplete ul li:hover {
    cursor: pointer;
    background: #f1f1f1;
  }

  div#crud textarea {
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#crud input.invalid, div#crud select.invalid, div#crud textarea.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#crud input.valid, div#crud select.valid, div#crud textarea.valid {
    border-bottom: 0.1rem solid #008000;
  }
</style>
