<template>
  <div id="create">
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
            <li v-for="user in users.data.search" v-bind:key="user.userId" v-if="user.accountId !== signIn.data.accountId" :data-userId="user.userId" @click.prevent="autoCompletedSelected($event.target)">{{user.firstName}} {{user.lastName}}</li>
          </ul>
        </div>
        <small
          id="confirmPasswordInvalid"
          class="form-text text-muted"
          v-show="parcel.error.reason.receiver !== null">{{parcel.error.reason.receiver}}</small>
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
          <option v-for="category in categories.data.getAll" :value="category" v-bind:key="category.id">{{category.name}}</option>
        </select>
        <small
          id="categoryInvalid"
          class="form-text text-muted"
          v-show="parcel.error.reason.categoryId !== null">{{parcel.error.reason.categoryId}}</small>
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
          v-show="parcel.error.reason.note !== null">{{parcel.error.reason.note}}</small>
      </div>
      <div class="form-group">
        <label
          for="size">
          Zadajte dľžku balíka
        </label>
        <input
          aria-describedby="sizeInvalid"
          type="text" class="form-control"
          id="size"
          v-model="form.values.size"
          placeholder="Dľžka balíka"
          @input="$v.form.values.size.$touch()"
          :class="{valid: !$v.form.values.size.$error && $v.form.values.size.$dirty, invalid: $v.form.values.size.$error}">
        <small
          id="sizeInvalid"
          class="form-text text-muted"
          v-show="parcel.error.reason.length !== null">{{parcel.error.reason.length}}</small>
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
          v-show="parcel.error.reason.width !== null">{{parcel.error.reason.width}}</small>
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
          v-show="parcel.error.reason.height !== null">{{parcel.error.reason.height}}</small>
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
          v-show="parcel.error.reason.weight !== null">{{parcel.error.reason.weight}}</small>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @keyup.enter="onCreate"
        @click.prevent="onCreate">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-show="!parcel.done"></span>&nbsp;Vytvoriť
      </button>
    </form>
    <app-alert
      :type="[parcel.error.is ? 'alert-danger' : 'alert-success']"
      :condition="[parcel.error.message !== null]"
      :content="[parcel.error.message]"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import {required, alphaNum, numeric} from 'vuelidate/lib/validators'

export default {
  name: 'create',
  created: function () {
    return this.$store.dispatch(types.ACTION_CATEGORY_GET_ALL, {})
  },
  data: function () {
    return {
      form: {
        values: {
          receiver: {
            name: null,
            userId: null
          },
          category: null,
          note: null,
          size: null,
          width: null,
          height: null,
          weight: null
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
          userId: {
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
        size: {
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
      categories: types.GETTER_CATEGORY_DEFAULT,
      parcel: types.GETTER_PARCEL_DEFAULT,
      signIn: types.GETTER_SIGN_IN_DEFAULT,
      users: types.GETTER_USER_DEFAULT
    })
  },
  methods: {
    autoCompleteReceiver: function ($event) {
      if ($event.length < 3) return
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {firstName: $event, roles: process.env.APP_ROLE_CLIENT})
    },
    autoCompletedSelected: function ($event) {
      this.form.values.receiver.userId = $event.dataset.userid
      this.form.values.receiver.name = $event.textContent
      return this.$store.commit(types.MUTATIONS_CLEAR_USER_DATA, {})
    },
    onCreate: function () {
      this.parcel.error.message = null
      this.parcel.error.is = false

      this.$store.commit(types.MUTATION_PARCEL_DATA, {
        data: {
          ...this.parcel.data,
          create: [{
            id: Date.now() * -1,
            sender: {senderId: this.signIn.data.accountId},
            receiver: {receiverId: this.form.values.receiver.userId},
            category: this.form.values.category,
            length: this.form.values.size,
            width: this.form.values.width,
            height: this.form.values.height,
            weight: this.form.values.weight,
            note: this.form.values.note
          }]
        }
      })
      return this.$emit('parcelCreated', {component: 'app-list', icon: 'plus', nav: {id: 2, value: 'Nepridelené'}})
    }
  }
}
</script>

<style scoped>
  div#create form {
    margin-top: 1rem;
    padding: 0.5rem;
    margin-bottom: 3rem;
  }

  div#create label {
    font-size: 0.9em;
  }

  div#create button {
    font-size: 0.9em;
    background: #ffffff;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    float: right;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div#create button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#create button[disabled] {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  div#create select {
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

  div#create select:focus {
    background: #ffffff;
  }

  div#create option {
    background: #ffffff;
  }

  div#create input[type="text"] {
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

  div#create div #autocomplete {
    width: 100%;
    position: relative;
  }

  div#create div #autocomplete ul {
    position: absolute;
    width: calc(100%);
    background: #ffffff;
  }

  div#create div#autocomplete ul li {
    font-size: 1em;
    padding: 0.8rem;
    border: solid 0.01rem #dbdbdb;
  }
  div#create div#autocomplete ul li:hover {
    cursor: pointer;
    background: #f1f1f1;
  }

  div#create textarea {
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#create small, .text-muted {
    font-size: 0.8em;
    color: #ff0000 !important;
  }

  div#create input.invalid, div#create select.invalid, div#create textarea.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#create input.valid, div#create select.valid, div#create textarea.valid {
    border-bottom: 0.1rem solid #008000;
  }
</style>
