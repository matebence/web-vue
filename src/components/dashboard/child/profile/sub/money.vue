<template>
  <div id="money">
    <h1>Pošlite peniaze na účet Blesk</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div
            class="card"
            :class="{ '-active' : card.is.flip }">
            <div class="card-item-side -front">
              <div
                class="card-item-focus"
                :class="{'-active' : card.is.focus.style }"
                :style="card.is.focus.style"
                ref="focusElement"></div>
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
                   v-for="(n, $index) in card.placeHolder.amex"
                   :key="$index">
                    <div
                      class="card-number-item"
                      v-if="$index > 4 && $index < 14 && card.number.length > $index && n.trim() !== ''">*</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="card.number.length > $index">{{card.number[$index]}}</div>
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
                  v-for="(n, $index) in card.placeHolder.standard" :key="$index">
                    <div
                      class="card-number-item"
                      v-if="$index > 4 && $index < 15 && card.number.length > $index && n.trim() !== ''">*</div>
                    <div
                      class="card-number-item"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="card.number.length > $index">{{card.number[$index]}}</div>
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
                      v-if="card.name.length"
                      key="1">
                      <span
                        class="card-nameItem"
                        v-for="(n, $index) in card.name.replace(/\s\s+/g, ' ')" v-if="$index === $index" :key="$index + 1">{{n}}</span>
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
                      v-if="card.month"
                      :key="card.month">{{card.month}}</span>
                      <span
                        v-else
                        key="2">MM</span>
                    </label>
                    /
                    <label class="card-date-item">
                    <span
                      v-if="card.year"
                      :key="card.year">{{String(card.year).slice(2,4)}}</span>
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
                v-for="(n, $index) in card.cvv"
                :key="$index">*</span></div>
                <div class="card-type">
                  <img
                    :src="require(`@/assets/img/${getCardType}.png`)" v-if="getCardType" class="card-typeImg">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-input">
            <input
              type="text"
              v-mask="getNumberMask"
              v-model="card.number"
              @blur="onBlur"
              data-ref="cardNumber"
              autocomplete="off">
          </div>
          <div class="form-input">
            <input
              type="text"
              v-model="card.name"
              @blur="onBlur"
              data-ref="cardName"
              autocomplete="off">
          </div>
          <div class="form-input same-line">
            <input
              type="text"
              v-model="card.month"
              @blur="onBlur"
              data-ref="cardDate"
              autocomplete="off">
            <input
              type="text"
              v-model="card.year"
              @blur="onBlur"
              data-ref="cardDate"
              autocomplete="off">
          </div>
          <div class="form-input">
            <input
              type="text"
              v-mask="'####'"
              maxlength="4"
              v-model="card.cvv"
              @focus="onFlip(true)"
              @blur="onFlip(false)"
              autocomplete="off">
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div>
    <h1>Pošlite peniaze späť do banky</h1>
  </div>
</template>

<script>
export default {
  name: 'money',
  data: function () {
    return {
      card: {
        name: '',
        number: '',
        month: '',
        year: '',
        cvv: '',
        placeHolder: {
          year: new Date().getFullYear(),
          amex: '#### ###### #####',
          standard: '#### #### #### ####'
        },
        is: {
          flip: false,
          focus: false
        }
      }
    }
  },
  watch: {
    'card.year' () {
      if (this.card.month < this.getCardMonth) {
        this.card.month = ''
      }
    }
  },
  computed: {
    getCardType () {
      let carNumber = this.card.number
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
    getNumberMask () {
      return this.getCardType === 'amex' ? this.card.placeHolder.amex : this.card.placeHolder.standard
    },
    getCardMonth () {
      if (this.card.year === this.card.placeHolder.year) return new Date().getMonth() + 1
      return 1
    }
  },
  methods: {
    onFlip (status) {
      this.card.is.flip = status
    },
    onBlur () {
      setTimeout(() => {
        if (!this.card.is.focus) {
          this.card.is.focus.style = null
        }
      }, 300)
      this.card.is.focus = false
    }
  }
}
</script>

<style scoped>
  div#money {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem;
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
    height: 13.8rem;
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
    height: 100%;
    position: absolute;
    height: 100%;
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
    width: 3.7rem;
  }

  div#money .card-type {
    height: 2.8rem;
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
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
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

  div#money div.form-input input[type="text"],
  div#money div.form-input input[type="number"],
  div#money div.form-input input[type="password"] {
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 3rem;
    border: none;
    color: #000000;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#money div.form-input.same-line input[type="text"] {
    width: 40%;
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

    div#money .card-band {
      height: 2.5rem;
      margin-top: 0.625rem;
    }

    div#money .card-cvv-band {
      margin-bottom: 1rem;
    }

    div#money .card {
      height: 11.25rem;
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
</style>
