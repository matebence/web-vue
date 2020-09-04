<template>
  <div id="money">
    <h1>Pošlite peniaze na účet Blesk</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5">
          <div class="form-input">
            <label for="cardNumber">Číslo karty</label>
            <input
              id="cardNumber"
              autofocus
              placeholder="5356 5631 1265 7895"
              :disabled="getBankFormValues"
              type="text"
              v-mask="components.appMoney.placeHolder.standard"
              v-model="components.appMoney.form.card.values.number"
              @input="$v.components.appMoney.form.card.values.number.$touch()"
              :class="{valid: !$v.components.appMoney.form.card.values.number.$error && $v.components.appMoney.form.card.values.number.$dirty, invalid: $v.components.appMoney.form.card.values.number.$error}"
              @blur="onBlur"
              data-ref="cardNumber"
              autocomplete="off">
          </div>
          <div class="form-input">
            <label for="cardName">Vlastník karty</label>
            <input
              id="cardName"
              type="text"
              :disabled="getBankFormValues"
              placeholder="Meno Priezvisko"
              v-model="components.appMoney.form.card.values.name"
              @input="$v.components.appMoney.form.card.values.name.$touch()"
              :class="{valid: !$v.components.appMoney.form.card.values.name.$error && $v.components.appMoney.form.card.values.name.$dirty, invalid: $v.components.appMoney.form.card.values.name.$error}"
              @blur="onBlur"
              data-ref="cardName"
              autocomplete="off">
          </div>
          <div class="form-input">
            <div class="form-wrapper">
              <div class="form-inline">
                <div class="form-item">
                  <label for="cardMonth">Mesiac</label>
                  <input
                    id="cardMonth"
                    type="number"
                    :disabled="getBankFormValues"
                    placeholder="05"
                    v-model="components.appMoney.form.card.values.month"
                    @input="$v.components.appMoney.form.card.values.month.$touch()"
                    :class="{valid: !$v.components.appMoney.form.card.values.month.$error && $v.components.appMoney.form.card.values.month.$dirty, invalid: $v.components.appMoney.form.card.values.month.$error}"
                    @blur="onBlur"
                    data-ref="cardDate"
                    autocomplete="off">
                </div>
              </div>
              <div class="form-inline">
                <div class="form-item">
                  <label for="cardYear">Rok</label>
                  <input
                    id="cardYear"
                    type="number"
                    placeholder="2021"
                    :disabled="getBankFormValues"
                    @input="$v.components.appMoney.form.card.values.year.$touch()"
                    :class="{valid: !$v.components.appMoney.form.card.values.year.$error && $v.components.appMoney.form.card.values.year.$dirty, invalid: $v.components.appMoney.form.card.values.year.$error}"
                    v-model="components.appMoney.form.card.values.year"
                    @blur="onBlur"
                    data-ref="cardDate"
                    autocomplete="off">
                </div>
              </div>
            </div>
          </div>
          <div class="form-input">
            <div class="form-wrapper">
              <div class="form-inline">
                <div class="form-item">
                  <label for="cardCVV">Kód</label>
                  <input
                    id="cardCVV"
                    type="number"
                    v-mask="'####'"
                    placeholder="000"
                    :disabled="getBankFormValues"
                    maxlength="4"
                    @input="$v.components.appMoney.form.card.values.cvv.$touch()"
                    :class="{valid: !$v.components.appMoney.form.card.values.cvv.$error && $v.components.appMoney.form.card.values.cvv.$dirty, invalid: $v.components.appMoney.form.card.values.cvv.$error}"
                    v-model="components.appMoney.form.card.values.cvv"
                    @focus="onFlip(true)"
                    @blur="onFlip(false)"
                    autocomplete="off">
                </div>
              </div>
              <div class="form-inline">
                <div class="form-item">
                  <label for="credit-card-amount">Suma</label>
                  <input
                    placeholder="10.00"
                    :disabled="getBankFormValues"
                    v-model="components.appMoney.form.card.values.amount"
                    @input="$v.components.appMoney.form.card.values.amount.$touch()"
                    :class="{valid: !$v.components.appMoney.form.card.values.amount.$error && $v.components.appMoney.form.card.values.amount.$dirty, invalid: $v.components.appMoney.form.card.values.amount.$error}"
                    id="credit-card-amount"
                    type="number"
                    autocomplete="off">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div
            class="card"
            :class="{ '-active' : components.appMoney.is.flip }">
            <div class="card-item-side -front">
              <div class="card-item-cover">
                <img src="@/assets/img/card-background.png" class="card-background">
              </div>
              <div class="wrapper">
                <div class="card-top">
                  <img
                    src="@/assets/img/card-chip.png"
                    class="card-chip">
                  <div class="card-type">
                    <img :src="require(`@/assets/img/${getCardType}.png`)" v-if="getCardType" :key="getCardType" alt="" class="card-typeImg">
                  </div>
                </div>
                <label
                  class="card-number"
                  ref="cardNumber">
                  <template
                    v-if="getCardType === 'amex'">
                 <span
                   v-for="(n, $index) in components.appMoney.placeHolder.amex"
                   :key="$index">
                    <div
                      class="card-number-item"
                      v-if="$index > 4 && $index < 14 && components.appMoney.form.card.values.number.length > $index && n.trim() !== ''">*</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="components.appMoney.form.card.values.number.length > $index">{{components.appMoney.form.card.values.number[$index]}}</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      v-else
                      :key="$index + 1">{{n}}</div>
                </span>
                  </template>
                  <template
                    v-else>
                <span
                  v-for="(n, $index) in components.appMoney.placeHolder.standard" :key="$index">
                    <div
                      class="card-number-item"
                      v-if="$index > 4 && $index < 15 && components.appMoney.form.card.values.number.length > $index && n.trim() !== ''">*</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="components.appMoney.form.card.values.number.length > $index">{{components.appMoney.form.card.values.number[$index]}}</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      v-else
                      :key="$index + 1">{{n}}</div>
                </span>
                  </template>
                </label>
                <div class="card-content">
                  <label class="card__info" ref="card.name">
                    <div class="card-holder">Card Holder</div>
                    <div
                      class="card-name"
                      v-if="components.appMoney.form.card.values.name.length"
                      key="1">
                      <span
                        class="card-nameItem"
                        v-for="(n, $index) in components.appMoney.form.card.values.name.replace(/\s\s+/g, ' ')" v-if="$index === $index" :key="$index + 1">{{n}}</span>
                    </div>
                    <div
                      class="card-name"
                      v-else
                      key="2">Celé meno</div>
                  </label>
                  <div class="card-date" ref="cardDate">
                    <label class="card-date-title">Expires</label>
                    <label class="card-date-item">
                    <span
                      v-if="components.appMoney.form.card.values.month"
                      :key="components.appMoney.form.card.values.month">{{components.appMoney.form.card.values.month}}</span>
                      <span
                        v-else
                        key="2">MM</span>
                    </label>
                    /
                    <label class="card-date-item">
                    <span
                      v-if="components.appMoney.form.card.values.year"
                      :key="components.appMoney.form.card.values.year">{{String(components.appMoney.form.card.values.year).slice(2,4)}}</span>
                      <span
                        v-else
                        key="2">YY</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-item-side -back">
              <div class="card-item-cover">
                <img
                  src="@/assets/img/card-background.png"
                  class="card-background">
              </div>
              <div class="card-band"></div>
              <div class="card-cvv">
                <div class="card-cvv-title">CVV</div>
                <div class="card-cvv-band">
              <span
                v-for="(n, $index) in components.appMoney.form.card.values.cvv"
                :key="$index">*</span></div>
                <div class="card-type">
                  <img
                    :src="require(`@/assets/img/${getCardType}.png`)" v-if="getCardType" class="card-typeImg">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1>Pošlite peniaze späť do banky</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5">
          <div class="form-input">
            <label for="iban">IBAN</label>
            <input
              :disabled="getCardFormValues"
              v-model="components.appMoney.form.bank.values.number"
              placeholder="SK53 0000 0053 4567 7898"
              v-mask="components.appMoney.placeHolder.iban"
              @input="$v.components.appMoney.form.bank.values.number.$touch()"
              :class="{valid: !$v.components.appMoney.form.bank.values.number.$error && $v.components.appMoney.form.bank.values.number.$dirty, invalid: $v.components.appMoney.form.bank.values.number.$error}"
              id="iban"
              type="text"
              autocomplete="off">
          </div>
          <div class="form-input">
            <label for="iban-amount">Suma</label>
            <input
              :disabled="getCardFormValues"
              v-model="components.appMoney.form.bank.values.amount"
              placeholder="0.00"
              @input="$v.components.appMoney.form.bank.values.amount.$touch()"
              :class="{valid: !$v.components.appMoney.form.bank.values.amount.$error && $v.components.appMoney.form.bank.values.amount.$dirty, invalid: $v.components.appMoney.form.bank.values.amount.$error}"
              id="iban-amount"
              type="number"
              autocomplete="off">
          </div>
        </div>
      </div>
    </div>
    <button
      @click.prevent="onCreate(false)"
      :disabled="($v.components.appMoney.form.card.values.name.$invalid || $v.components.appMoney.form.card.values.number.$invalid || $v.components.appMoney.form.card.values.month.$invalid || $v.components.appMoney.form.card.values.year.$invalid || $v.components.appMoney.form.card.values.cvv.$invalid || $v.components.appMoney.form.card.values.amount.$invalid) && ($v.components.appMoney.form.bank.values.number.$invalid || $v.components.appMoney.form.bank.values.amount.$invalid)"
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
    <div id="confirm-wrapper">
      <app-confirm
        @confirmed="onCreate($event)"
        :confirmId="'moneyConfirm'"
        :text="components.appConfirm.text"
        :title="components.appConfirm.title"
        :positiveButton="components.appConfirm.positiveButton"
        :negativeButton="components.appConfirm.negativeButton"/>
    </div>
    <div id="alert-wrapper">
      <app-alert
        :condition="components.appAlert.condition"
        :type="components.appAlert.type"
        :text="components.appAlert.text"/>
    </div>
  </div>
</template>

<script>
import bootstrap from 'jquery'
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import alert from '@/components/common/alert'
import confirm from '@/components/common/confirm'
import {required, numeric, decimal} from 'vuelidate/lib/validators'

export default {
  name: 'money',
  data: function () {
    return {
      components: {
        appMoney: {
          form: {
            card: {
              values: {
                name: '',
                number: '',
                month: '',
                year: '',
                cvv: '',
                amount: ''
              }
            },
            bank: {
              values: {
                number: '',
                amount: ''
              }
            }
          },
          placeHolder: {
            year: new Date().getFullYear(),
            standard: '#### #### #### ####',
            iban: 'AA## #### #### #### ####'
          },
          is: {
            flip: false,
            focus: false
          }
        },
        appConfirm: {
          text: null,
          title: null,
          button: null
        },
        appAlert: {
          condition: [],
          type: [],
          text: []
        }
      }
    }
  },
  validations: {
    components: {
      appMoney: {
        form: {
          card: {
            values: {
              name: {
                required,
                name: value => new RegExp(/^[\D ]+$/).test(value)
              },
              number: {
                required,
                card: value => new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/).test(value.replaceAll(' ', ''))
              },
              month: {
                required,
                month: value => new RegExp(/^(0?[1-9]|1[012])$/).test(value)
              },
              year: {
                required,
                year: value => new RegExp(/^\d{4}$/).test(value) && value >= new Date().getFullYear()
              },
              cvv: {
                required,
                numeric
              },
              amount: {
                required,
                decimal
              }
            }
          },
          bank: {
            values: {
              number: {
                required,
                iban: value => new RegExp(/^[A-Z]+[ 0-9]+$/).test(value)
              },
              amount: {
                required,
                decimal,
                minValue: value => value > 9
              }
            }
          }
        }
      }
    }
  },
  watch: {
    'components.appMoney.form.card.values.year' () {
      if (this.components.appMoney.form.card.values.month < this.getCardMonth) {
        this.components.appMoney.form.card.values.month = ''
      }
    }
  },
  components: {
    appConfirm: confirm,
    appAlert: alert
  },
  computed: {
    getCardType: function () {
      let carNumber = this.components.appMoney.form.card.values.number
      let pattern = new RegExp('^4')
      if (carNumber.match(pattern) !== null) return 'card-visa'

      pattern = new RegExp('^(34|37)')
      if (carNumber.match(pattern) !== null) return 'card-amex'

      pattern = new RegExp('^5[1-5]')
      if (carNumber.match(pattern) !== null) return 'card-mastercard'

      pattern = new RegExp('^6011')
      if (carNumber.match(pattern) !== null) return 'card-discover'

      pattern = new RegExp('^9792')
      if (carNumber.match(pattern) !== null) return 'card-troy'

      return 'card-visa'
    },
    getCardFormValues: function () {
      return Object.values(this.components.appMoney.form.card.values).some(e => e !== '')
    },
    getBankFormValues: function () {
      return Object.values(this.components.appMoney.form.bank.values).some(e => e !== '')
    },
    getCardMonth: function () {
      if (this.components.appMoney.form.card.values.year === this.components.appMoney.placeHolder.year) return new Date().getMonth() + 1
      return 1
    },
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA,
      userProfile: types.GETTER_USER_DATA_GET
    })
  },
  methods: {
    onFlip: function (status) {
      this.components.appMoney.is.flip = status
    },
    onBlur: function () {
      this.components.appMoney.is.focus = false
    },
    showConfirmedModal: function (title, text) {
      this.components.appConfirm.title = title
      this.components.appConfirm.text = text
      this.components.appConfirm.positiveButton = 'Potvrdiť'
      this.components.appConfirm.negativeButton = 'Zrušiť'
      return bootstrap('#moneyConfirm').modal('show')
    },
    showAlertModal: function (condition, type, text) {
      this.components.appAlert.condition = condition
      this.components.appAlert.type = type
      this.components.appAlert.text = text
    },
    onCreate: function ($event) {
      if ($event) {
        let promise
        if (!this.$v.components.appMoney.form.card.values.name.$invalid || !this.$v.components.appMoney.form.card.values.number.$invalid || !this.$v.components.appMoney.form.card.values.month.$invalid || !this.$v.components.appMoney.form.card.values.year.$invalid || !this.$v.components.appMoney.form.card.values.cvv.$invalid || !this.$v.components.appMoney.form.card.values.amount.$invalid) {
          const paymentData = {users: {accountId: this.userProfile.accountId}, creditCard: this.components.appMoney.form.card.values.number.replaceAll(' ', ''), expMonth: this.components.appMoney.form.card.values.month, expYear: this.components.appMoney.form.card.values.year, cvc: this.components.appMoney.form.card.values.cvv, amount: this.components.appMoney.form.card.values.amount, currency: 'EUR'}
          promise = this.$store.dispatch(types.ACTION_PAYMENT_CREATE, paymentData)
        } else if (!this.$v.components.appMoney.form.bank.values.number.$invalid || !this.$v.components.appMoney.form.bank.values.amount.$invalid) {
          const payoutData = {users: {accountId: this.userProfile.accountId}, iban: this.components.appMoney.form.bank.values.number, amount: this.components.appMoney.form.bank.values.amount}
          promise = this.$store.dispatch(types.ACTION_PAYOUT_CREATE, payoutData)
        }
        promise
          .then(result => {
            Object.assign(this.$data, this.$options.data.apply(this))
            return this.$store.dispatch(types.ACTION_USER_GET, this.signIn.accountId)
          })
          .then(result => {
            this.showAlertModal([result !== null], ['alert-success'], ['Príkaz ne prevod penazí prebehla úspešne'])
            bootstrap('#moneyConfirm').modal('hide')
          })
          .catch(err => {
            Object.assign(this.$data, this.$options.data.apply(this))
            this.showAlertModal([err !== null], ['alert-danger'], [err.message])
            bootstrap('#moneyConfirm').modal('hide')
          })
      }
      return this.showConfirmedModal('Potvrdenie', 'Pre uplatnenie zmien prosím zadajte Vaše heslo:')
    }
  }
}
</script>

<style scoped>
  ::placeholder {
    color: #dcdcdc;
  }

  div#money {
    overflow: auto;
    height: 100%;
  }

  div#money h1 {
    margin-top: 2rem;
    padding-bottom: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#money .card {
    max-width: 22.8rem;
    position: relative;
    height: 16.5rem;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
  }

  div#money .card.-active .card-item-side.-front {
    transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
  }

  div#money .card.-active .card-item-side.-back {
    transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
  }

  div#money .card-item-focus {
    position: absolute;
    z-index: 3;
    border-radius: 0.3rem;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    border: 0.1rem solid rgba(255, 255, 255, 0.65);
  }

  div#money .card-item-focus:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
    filter: blur(1.5rem);
    opacity: 0.5;
  }

  div#money .card-item-side {
    border-radius: 1rem;
    overflow: hidden;
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    backface-visibility: hidden;
    height: 100%;
  }

  div#money .card-item-side.-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
    z-index: 2;
    padding: 0;
    height: 100%;
  }

  div#money .card-item-side.-back .card-item-cover {
    transform: rotateY(-180deg);
  }

  div#money .card-background {
    max-width: 27rem;
  }

  div#money .card-item-cover {
    position: absolute;
    height: 13.5rem;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
  }

  div#money .card-item-cover:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  div#money .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.8rem;
    padding: 0 0.6rem;
  }

  div#money .card-chip {
    width: 3rem;
  }

  div#money .card-type {
    height: 2rem;
    position: relative;
    display: flex;
    justify-content: flex-end;
    max-width: 6.25rem;
    margin-left: auto;
    width: 100%;
  }

  div#money .card-typeImg {
    max-width: 70%;
    object-fit: contain;
    max-height: 100%;
    object-position: top right;
  }

  div#money .card__info {
    color: #fff;
    width: 100%;
    max-width: calc(100% - 5.31rem);
    padding: 0.5rem 0.5rem;
    font-weight: 500;
    display: block;
  }

  div#money .card-holder {
    opacity: 0.7;
    font-size: 0.8em;
    margin-bottom: 0.3rem;
  }

  div#money .wrapper {
    font-family: "Source Code Pro", monospace;
    padding: 1.5rem 1rem;
    position: relative;
    z-index: 4;
    height: 100%;
    user-select: none;
  }

  div#money .card-name {
    font-size: 1em;
    line-height: 1;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  div#money .card-nameItem {
    display: inline-block;
    min-width: 0.5rem;
    position: relative;
  }

  div#money .card-number {
    font-weight: 500;
    line-height: 1;
    color: #fff;
    font-size: 1.6em;
    margin-bottom: 1.18rem;
    display: inline-block;
    padding: 0.5rem 0.7rem;
  }

  div#money .card-number-item {
    width: 1rem;
    display: inline-block;
  }

  div#money .card-content {
    color: #fff;
    display: flex;
    align-items: flex-start;
  }

  div#money .card-date {
    flex-wrap: wrap;
    font-size: 1em;
    margin-left: auto;
    padding: 0.4rem;
    display: inline-flex;
    width: 5.13rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  div#money .card-date-item {
    position: relative;
    font-size: 1em;
  }

  div#money .card-date-item span {
    width: 1.3rem;
    display: inline-block;
  }

  div#money .card-date-title {
    opacity: 0.7;
    font-size: 0.8em;
    padding-bottom: 0.3rem;
    width: 100%;
  }

  div#money .card-band {
    background: rgba(0, 0, 19, 0.8);
    width: 100%;
    height: 3.1rem;
    margin-top: 1.8rem;
    position: relative;
    z-index: 2;
  }

  div#money .card-cvv {
    text-align: right;
    position: relative;
    z-index: 2;
    padding: 0.9rem;
  }

  div#money .card-cvv .card-type {
    opacity: 0.7;
  }

  div#money .card-cvv-title {
    padding-right: 0.6rem;
    font-size: 1em;
    font-weight: 500;
    color: #fff;
    margin-bottom: 0.3rem;
  }

  div#money .card-cvv-band {
    height: 2.8rem;
    background: #fff;
    margin-bottom: 0.8rem;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.6rem;
    color: #1a3b5d;
    font-size: 1.15em;
    border-radius: 0.3rem;
  }

  div#money button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    font-size: 0.9em;
    width: 3rem;
    height: 3rem;
    z-index: 999;
  }

  div#money button:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#money button:disabled {
    opacity: .65;
    background: #095174;
  }

  div#money div.form-input label {
    font-size: 1.2em;
    font-weight: 900;
    color: #979797;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  div#money div.form-input input[type="text"],
  div#money div.form-input input[type="number"] {
    font-size: 1.15em;
    font-weight: 700;
    width: 100%;
    height: 2rem;
    border: none;
    color: #000000;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#money div.form-input input[type="text"]:disabled,
  div#money div.form-input input[type="number"]:disabled {
    color: #115176;
  }

  div#money div.form-input div.form-wrapper div.form-inline {
    display: inline-block;
    width: 49%;
  }

  div#money div.form-input div.form-wrapper div.form-inline div.form-item input {
    width: 100%;
  }

  div#money div.form-input input[type="text"].invalid,
  div#money div.form-input input[type="number"].invalid {
    border-bottom: 0.1rem solid #ff0000;
  }

  div#money div.form-input input[type="text"].valid,
  div#money div.form-input input[type="number"].valid {
    border-bottom: 0.1rem solid #008000;
  }

  div#money div#alert-wrapper {
    width: 30rem;
    position: relative;
    margin: 0 auto;
    margin-top: 3rem;
  }

  @media screen and (max-width: 1140px) {
    div#money .card-number-item {
      width: 0.9rem;
    }

    div#money .card-number {
      font-size: 1.3em;
      width: 21rem;
    }
  }

  @media screen and (max-width: 768px) {
    div#money .card {
      margin-top: 2rem;
    }

    div#money button {
      margin-top: 2rem;
      margin-left: 1rem;
      position: static;
    }
  }

  @media screen and (max-width: 480px) {

    div#money .card-number {
      font-size: 1.3em;
      margin-bottom: 1rem;
      padding: 0.625rem 0.625rem;
    }

    div#money .card-background {
      max-width: 25rem;
    }

    div#money .card-number-item {
      width: 0.8rem;
    }

    div#money .card-date {
      font-size: 1em;
    }

    div#money .card-date-title {
      font-size: 0.75em;
      padding-bottom: 0.3rem;
    }

    div#money .card-band {
      margin-top: 1.25rem;
    }

    div#money .card-top {
      margin-bottom: 1.5rem;
    }

    div#money .card-cvv-band {
      height: 2.5rem;
      margin-bottom: 1.25rem;
    }

    div#money .card-type {
      height: 2.5rem;
      max-width: 5.625rem;
    }

    div#money .card__info {
      padding: 0.625rem;
    }

    div#money .card-chip {
      width: 3.15rem;
    }

    div#money .wrapper {
      padding: 1.25rem 0.625rem;
    }

    div#money .card-holder {
      font-size: 0.75em;
      margin-bottom: 0.3rem;
    }

    div#money .card-name {
      font-size: 1em;
    }
  }

  @media screen and (max-width: 360px) {
    div#money .card-cvv {
      padding: 0.625rem 1rem;
    }

    div#money .card-background {
      max-width: 20rem;
    }

    div#money .card-item-cover {
      height: 11.5rem;
    }

    div#money .card-band {
      height: 2.5rem;
      margin-top: 0.625rem;
    }

    div#money .card-cvv-band {
      margin-bottom: 1rem;
    }

    div#money .card {
      height: 14.5rem;
    }

    div#money .card-type {
      height: 1.85rem;
    }

    div#money .card-chip {
      width: 2.5rem;
    }

    div#money .card-top {
      margin-bottom: 1rem;
    }

    div#money .card-number-item {
      width: 0.75rem;
    }

    div#money .card-number {
      font-size: 1.18em;
      margin-bottom: 0.625rem;
      padding: 0.625rem 0.625rem;
    }
  }

  @media screen and (max-width: 256px) {
    div#money div.form-input div.form-wrapper div.form-inline {
      width: 100%;
    }
  }
</style>
