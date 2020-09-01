<template>
  <div id="crud">
    <form>
      <div class="form-group">
        <label
          for="name">
          Zadajte názov vozidla
        </label>
        <input
          autocomplete="off"
          aria-describedby="nameInvalid"
          type="text" class="form-control"
          id="name"
          v-model="form.values.name"
          placeholder="Názov vozidla"
          @input="$v.form.values.name.$touch()"
          :class="{valid: !$v.form.values.name.$error && $v.form.values.name.$dirty, invalid: $v.form.values.name.$error}">
      </div>
      <div class="form-group">
        <label
          for="type">
          Vyberte typ vozidla
        </label>
        <select
          aria-describedby="typeInvalid"
          class="form-control"
          id="type"
          v-model="form.values.type"
          @change="$v.form.values.type.$touch()"
          :class="{valid: !$v.form.values.type.$error && $v.form.values.type.$dirty, invalid: $v.form.values.type.$error}">
          <option value="null" disabled selected >Vyberte z možností</option>
          <option v-for="type in types" :value="type" :key="type._id">{{type.name}}</option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onCreate"
        v-show="form.values._id === undefined">
        &nbsp;Vytvoriť
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="$v.$invalid"
        @click.prevent="onUpdate"
        v-show="form.values._id !== undefined">
        &nbsp;Aktualizovať
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import {required} from 'vuelidate/lib/validators'

export default {
  created: function () {
    return this.$store.dispatch(types.ACTION_TYPE_GET_ALL, {})
      .catch(err => console.warn(err.message))
  },
  name: 'crud',
  props: ['form'],
  data: function () {
    return {
      components: {
        appCrud: {
          autocomplete: {
            client: {
            }
          }
        }
      }
    }
  },
  validations: {
    form: {
      values: {
        name: {
          required,
          alpha: value => new RegExp(/^[\D ]+$/).test(value)
        },
        type: {
          _id: {
            required,
            mongo: value => new RegExp(/^[0-9a-fA-F]{24}$/).test(value)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      vehicleData: types.GETTER_VEHICLE_DATA,
      types: types.GETTER_TYPE_DATA_GET_ALL,
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    onCreate: function () {
      if (this.form.values._id === undefined) {
        return this.$store.dispatch(types.ACTION_VEHICLE_CREATE, {...this.form.values, ...this.signIn})
          .then(result => this.$emit('crud', {component: 'app-vertical-list', icon: 'plus'}))
          .catch(err => console.warn(err.message))
      }
    },
    onUpdate: function () {
      if (this.form.values._id !== undefined) {
        return this.$store.dispatch(types.ACTION_VEHICLE_UPDATE, {...this.form.values, ...this.signIn})
          .then(result => this.$emit('crud', {component: 'app-vertical-list', icon: 'plus'}))
          .catch(err => console.warn(err.message))
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
