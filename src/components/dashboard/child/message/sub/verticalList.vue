<template>
  <div id="verticalList">
    <h1>Správy</h1>
    <form id="searchForm">
      <div class="form-input">
        <font-awesome-icon :icon="['fas', 'search']"/>
        <input
          type="text"
          name="search"
          id="search"
          autocomplete="off"
          @focus="onAutoCompleteParticipent('')"
          placeholder="Zadajte používateľské meno"
          @input="onAutoCompleteParticipent($event.target.value)">
      </div>
    </form>
    <ul class="participents">
      <li
        :key="item.userId"
        v-for="item in userData.user.search"
        @click.prevent="onSelectedParticipent(item)">
        <ul class="participent">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'user']"/>
          </li>
          <li class="summary">
            <ul>
              <li class="userName">{{item.userName}}</li>
              <li class="country">{{item.places.country}}</li>
              <li class="region">{{item.places.region}}</li>
            </ul>
          </li>
        </ul>
      </li>
      <!--<li>Zoznam je prázdny </li>-->
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'verticalList',
  props: ['userData', 'activeEl'],
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA
    })
  },
  methods: {
    onAutoCompleteParticipent: function ($event) {
      this.activeEl.participentId = 0
      if ($event.length === 0) return this.onSearchParticipent({roles: this.onSearchParticipentCriteria()})
      if ($event.length < 3) return
      return this.onSearchParticipent({firstName: $event})
    },
    onSearchParticipent: function (obj) {
      return this.$store.dispatch(types.ACTION_USER_SEARCH, {roles: this.onSearchParticipentCriteria(), ...obj})
        .then(result => {
          this.userData.user.search = Object.values(result)
        })
        .catch(err => {
          this.userData.user.search = null
          console.warn(err.participent)
        })
    },
    onSelectedParticipent: function (el) {
      this.userData.user.search = []
    },
    onSearchParticipentCriteria: function () {
      return this.signIn.authorities.find(e => true) === process.env.APP_ROLE_COURIER ? process.env.APP_ROLE_CLIENT : process.env.APP_ROLE_COURIER
    }
  }
}
</script>

<style scoped>
  div#verticalList h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#verticalList form#searchForm {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div#verticalList form#searchForm div.form-input svg {
    position: absolute;
    left: 1.5rem;
    top: 5.4rem;
    color: #868686;
    z-index: 2;
  }

  div#verticalList form#searchForm div.form-input input {
    position: relative;
    width: 100%;
    font-size: 0.9em;
    padding-left: 2rem;
    border: solid 0.01rem #a1a1a1;
    border-radius: 0.6rem;
  }

  div#verticalList ul.participents li ul.participent ul {
    text-align: left;
  }

  div#verticalList ul.participents li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.participents li:hover,
  div#verticalList ul.participents li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.participents li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.participents li ul.participent {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#verticalList ul.participents li ul.participent li.image {
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 0.5rem;
    border: solid 0.09rem #176c9d;
    color: #176c9d;
  }

  div#verticalList ul.participents li ul.participent li.summary {
    margin-left: 1rem;
  }

  div#verticalList ul.participents li ul.participent li ul li.region,
  div#verticalList ul.participents li ul.participent li ul li.userName,
  div#verticalList ul.participents li ul.participent li ul li.country {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  @media (max-width: 1400px) {
    div#verticalList ul.participents li ul.participent li.image {
      display: none;
    }

    div#verticalList ul.participents li ul.participent {
      padding: 0.5rem;
    }

    div#verticalList ul.participents li ul.participent ul li {
      margin-left: 0;
    }

    div#verticalList ul.participents li ul.participent {
      justify-content: space-around;
    }
  }

  @media (max-width: 1200px) {
    div#verticalList ul.participents li ul.participent li.image {
      display: block;
    }

    div#verticalList ul.participents li ul.participent {
      padding: 0;
    }

    div#verticalList ul.participents li ul.participent ul li {
      margin-left: 0.5rem;
    }

    div#verticalList ul.participents li ul.participent {
      justify-content: end;
    }
  }

  @media (max-width: 992px) {
    div#verticalList ul.participents li ul.participent li.summary {
      margin: 0 auto;
    }
  }
</style>
