<template>
  <div id="rating">
    <hr>
    <h1>Recenzie</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h2>Vaša spokojnosť od 1 do 5</h2>
          <div class="star-rating" id="star-rating">
            <input
              :disabled="activeEl.shipmentId === 0"
              v-model="components.appRating.form.values.rating"
              @input="$v.components.appRating.form.values.rating.$touch()"
              id="star-5"
              type="radio"
              name="rating"
              value="5" />
            <label
              :class="{disabled: activeEl.shipmentId === 0}"
              for="star-5"
              title="5">
              <i class="active fa fa-star" aria-hidden="true"></i>
            </label>
            <input
              :disabled="activeEl.shipmentId === 0"
              v-model="components.appRating.form.values.rating"
              @input="$v.components.appRating.form.values.rating.$touch()"
              id="star-4"
              type="radio"
              name="rating"
              value="4" />
            <label
              :class="{disabled: activeEl.shipmentId === 0}"
              for="star-4"
              title="4">
              <i class="active fa fa-star" aria-hidden="true"></i>
            </label>
            <input
              :disabled="activeEl.shipmentId === 0"
              v-model="components.appRating.form.values.rating"
              @input="$v.components.appRating.form.values.rating.$touch()"
              id="star-3"
              type="radio"
              name="rating"
              value="3" />
            <label
              :class="{disabled: activeEl.shipmentId === 0}"
              for="star-3"
              title="3">
              <i class="active fa fa-star" aria-hidden="true"></i>
            </label>
            <input
              :disabled="activeEl.shipmentId === 0"
              v-model="components.appRating.form.values.rating"
              @input="$v.components.appRating.form.values.rating.$touch()"
              id="star-2"
              type="radio"
              name="rating"
              value="2" />
            <label
              :class="{disabled: activeEl.shipmentId === 0}"
              for="star-2"
              title="2">
              <i class="active fa fa-star" aria-hidden="true"></i>
            </label>
            <input
              :disabled="activeEl.shipmentId === 0"
              v-model="components.appRating.form.values.rating"
              @input="$v.components.appRating.form.values.rating.$touch()"
              id="star-1"
              type="radio"
              name="rating"
              value="1" />
            <label
              :class="{disabled: activeEl.shipmentId === 0}"
              for="star-1"
              title="1">
              <i class="active fa fa-star" aria-hidden="true"></i>
            </label>
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <h2>Nahrajte obrázok</h2>
          <label
            :class="{disabled: activeEl.shipmentId === 0}"
            class="image-upload">
            <input
              :disabled="activeEl.shipmentId === 0"
              type="file"
              name="image"
              id="image"
              @change="[$v.components.appRating.form.values.image.base64.$touch(), $v.components.appRating.form.values.image.name.$touch(), onFileChange($event)]"/>
            <font-awesome-icon :icon="['fas', 'image']"/>
          </label>
          <p
            :class="{valid: !$v.components.appRating.form.values.image.base64.$error && $v.components.appRating.form.values.image.base64.$dirty && !$v.components.appRating.form.values.image.name.$error && $v.components.appRating.form.values.image.name.$dirty, invalid: $v.components.appRating.form.values.image.base64.$error && $v.components.appRating.form.values.image.name.$error}">
            {{components.appRating.form.values.image.name}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Poznámka</h2>
          <textarea
            v-model="components.appRating.form.values.description"
            @input="$v.components.appRating.form.values.description.$touch()"
            :class="{valid: !$v.components.appRating.form.values.description.$error && $v.components.appRating.form.values.description.$dirty, invalid: $v.components.appRating.form.values.description.$error}"
            :disabled="activeEl.shipmentId === 0">
            name="description"
            id="description"
            cols="30"
            rows="2"></textarea>
        </div>
      </div>
    </div>
    <button
      type="submit"
      :disabled="$v.$invalid || activeEl.shipmentId === 0"
      @click.prevent="onCreate"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
    <app-modal
      :modalId="'ratingAlert'"
      :text="components.appModal.text"
      :title="components.appModal.title"
      :button="components.appModal.button"/>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import modal from '@/components/common/modal'
import {required, numeric} from 'vuelidate/lib/validators'

export default {
  name: 'rating',
  props: ['activeEl', 'shipment'],
  data: function () {
    return {
      components: {
        appRating: {
          form: {
            values: {
              description: null,
              rating: null,
              image: {
                name: null,
                base64: null
              },
              parcelId: 0
            }
          }
        },
        appModal: {
          text: null,
          title: null,
          button: null
        }
      }
    }
  },
  validations: {
    components: {
      appRating: {
        form: {
          values: {
            description: {
              required,
              alpha: value => new RegExp(/^[\D ]+$/).test(value)
            },
            rating: {
              required,
              numeric
            },
            image: {
              name: {
                required,
                file: value => new RegExp(/^[\w-]+.(jpg|png|gif)$/).test(value)
              },
              base64: {
                required,
                encoded: value => new RegExp(/(data:image\/[^;]+;base64[^"]+)/).test(value)
              }
            }
          }
        }
      }
    }
  },
  components: {
    appModal: modal
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    showAlertModal: function (title, text, button) {
      this.components.appModal.title = title
      this.components.appModal.text = text
      this.components.appModal.button = button
      return bootstrap('#ratingAlert').modal('show')
    },
    onFileChange: function ($event) {
      const fileData = $event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onloadend = () => { this.components.appRating.form.values.image.base64 = fileReader.result }
      fileReader.readAsDataURL(fileData)
      this.components.appRating.form.values.image.name = fileData.name
    },
    onCreate: function () {
      if (this.shipment.sender.senderId === this.signIn.accountId) return this.showAlertModal('Informácia', 'Recenzia zásielky je možná iba zo strany prijmateľa.', 'Zatvoriť')
      this.$store.dispatch(types.ACTION_RATING_SEARCH, {parcelId: this.shipment.parcelId})
        .then(result => {
          if (Object.values(result).length > 0) throw new Error('Pre daný balík už ste podali recenziu.')
          return this.$store.dispatch(types.ACTION_RATING_CREATE, {description: this.components.appRating.form.values.description, rating: this.components.appRating.form.values.rating, image: this.components.appRating.form.values.image.base64, parcelId: this.shipment.parcelId})
        })
        .then(result => this.showAlertModal('Informácia', 'Ďakujeme za Vašu recenziu. Údaje sme úspešne spracovali.', 'Zatvoriť'))
        .catch(err => this.showAlertModal('Upozornenie', err.message, 'Zatvoriť'))
    }
  }
}
</script>

<style scoped>
  div#rating {
    margin-top: 2rem;
    position: relative;
    height: 329px;
  }

  div#rating h1 {
    margin-top: 1rem;
    margin-left: 0.5rem;
    font-size: 2em;
    display: inline-block;
  }

  div#rating h2 {
    font-size: 1.3em;
    font-weight: 900;
    color: #a5a3a5;
    margin-top: 1.8rem;
  }

  div#rating div.star-rating {
    margin-top: 1rem;
    direction: rtl;
    display: inline-block;
  }

  div#rating div.star-rating input[type=radio] {
    display: none
  }

  div#rating div.star-rating label {
    color: #000000;
    font-size: 1em;
    padding: 0;
    cursor: pointer;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out
  }

  div#rating div.star-rating label.disabled {
    color: #a5a3a5;
  }

  div#rating div.star-rating label:hover,
  div#rating div.star-rating label:hover ~ label,
  div#rating div.star-rating input[type=radio]:checked ~ label {
    color: #f2b600
  }

  div#rating textarea {
    width: 70%;
    margin-top: 0.5rem;
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#rating label.image-upload + p {
    display: inline;
    position: relative;
    bottom: 14px;
    left: 4px;
  }

  div#rating label.image-upload svg {
    position: absolute;
    left: 28px;
    bottom: 15px;
  }

  div#rating label.image-upload {
    margin-top: 1rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background: #176c9d;
    font-size: 1em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    font-size: 0.9em;
  }

  div#rating input[type="file"] {
    display: none;
  }

  div#rating button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
    width: 3rem;
    height: 3rem;
  }

  div#rating button:hover, div#rating label.image-upload:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#rating button:disabled, div#rating label.image-upload.disabled {
    opacity: .65;
    background: #095174;
  }

  div#rating p.invalid {
    color: #ff0000;
  }

  div#rating textarea.invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#rating p.valid {
    color: #008000;
  }

  div#rating textarea.valid {
    border-bottom: 0.1rem solid #008000;
  }

  @media (max-width: 768px) {
    div#rating button {
      margin-top: 2rem;
      margin-left: 1rem;
      margin-bottom: 2rem;
      position: static;
    }
  }
</style>
