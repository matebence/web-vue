<template>
  <div id="create">
    <form>
      <div class="form-group">
        <label for="receiver">Zadajte meno príjemcu</label>
        <input
          aria-describedby="receiverInvalid"
          type="text" class="form-control"
          id="receiver"
          v-model="form.values.receiver"
          placeholder="Meno príjemca">
        <small
          id="receiverInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="category">Vyberte kategóriu</label>
        <select
          aria-describedby="categoryInvalid"
          class="form-control"
          id="category"
          v-model="form.values.category">
          <option value="X">X</option>
        </select>
        <small
          id="categoryInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="size">Zadajte dľžku balíka</label>
        <input
          aria-describedby="sizeInvalid"
          type="text" class="form-control"
          id="size"
          v-model="form.values.size"
          placeholder="Dľžka balíka">
        <small
          id="sizeInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="width">Zadajte šírku balíka</label>
        <input
          aria-describedby="widthInvalid"
          type="text" class="form-control"
          id="width"
          v-model="form.values.width"
          placeholder="Šírka balíka">
        <small
          id="widthInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="height">Zadajte výšku balíka</label>
        <input
          aria-describedby="heightInvalid"
          type="text" class="form-control"
          id="height"
          v-model="form.values.height"
          placeholder="Výška balíka">
        <small
          id="heightInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="weight">Zadajte hmotnosť balíka</label>
        <input
          aria-describedby="weightInvalid"
          type="text" class="form-control"
          id="weight"
          v-model="form.values.weight"
          placeholder="Hmotnosť balíka">
        <small
          id="weightInvalid"
          class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="note">Zadajte poznámku</label>
        <textarea
          aria-describedby="noteInvalid"
          class="form-control"
          id="note"
          rows="1"
          v-model="form.values.note"
          placeholder="Vaša poznámka"></textarea>
        <small
          id="noteInvalid"
          class="form-text text-muted"></small>
      </div>
      <button type="submit" class="btn btn-primary">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Vytvoriť
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'create',
  created: function () {
    this.$store.dispatch(types.ACTION_CATEGORY, {})
  },
  data: function () {
    return {
      form: {
        values: {
          receiver: null,
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
  computed: {
    ...mapGetters({
      category: types.GETTER_CATEGORY_DEFAULT
    })
  }
}
</script>

<style scoped>
  div#create form {
    margin-top: 1rem;
    padding: 1rem;
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
    font-size: 1em;
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
    font-size: 1em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#create textarea {
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }
</style>
