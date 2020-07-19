<template>
  <div id="navigation">
    <nav class="nav">
      <a class="navbar-brand" href="#">
        <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
      </a>
      <ul class="items">
        <li
          v-bind:key="nav.itemId"
          v-for="nav in navigation.items"
          @click.prevent="selectedNav(nav)"
          :class="{active: navigation.activeEl.nav.itemId === nav.itemId}">
          <router-link :to="`${nav.route}`">
            <font-awesome-icon :icon="['fas', nav.optional.icon]"/>
            <p>
              {{nav.value}}&nbsp;
              <span class="badge badge-pill badge-danger">{{nav.optional.badge}}</span>
            </p>
          </router-link>
        </li>
      </ul>
      <ul class="sub-items">
        <li>
          <a href="#" :data-letters="nav.data.loggedAccount.avatar"></a>
        </li>
        <li class="settings">
          <a href="#">
            <font-awesome-icon :icon="['fas', 'cog']"/>
            <p>Nastavenia</p>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'navigation',
  created: function () {
    return this.$store.dispatch(types.ACTION_NAVIGATION_AVATAR, {})
  },
  data: function () {
    return {
      navigation: {
        items: [
          {
            itemId: 1,
            value: 'Balíky',
            route: 'parcel',
            optional: {
              icon: 'box-open',
              badge: ''
            }
          },
          {
            itemId: 2,
            value: 'Zásielky',
            route: '',
            optional: {
              icon: 'shipping-fast',
              badge: ''
            }
          },
          {
            itemId: 3,
            value: 'Vozidlá',
            route: '',
            optional: {
              icon: 'car',
              badge: ''
            }
          },
          {
            itemId: 4,
            value: 'Správy',
            route: '',
            optional: {
              icon: 'comment-dots',
              badge: 'Nové'
            }
          },
          {
            itemId: 5,
            value: 'Odhlásiť sa',
            route: '',
            optional: {
              icon: 'sign-out-alt',
              badge: ''
            }
          }
        ],
        activeEl: {
          nav: {
            itemId: 1,
            value: 'Balíky'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DEFAULT,
      user: types.GETTER_USER_DEFAULT,
      nav: types.GETTER_NAVIGATION_DEFAULT
    })
  },
  methods: {
    selectedNav: function (el) {
      this.navigation.activeEl.nav.itemId = el.itemId
      this.navigation.activeEl.nav.value = el.value

      if (this.navigation.activeEl.nav.value === this.navigation.items[4].value) {
        return this.$store.dispatch(types.ACTION_SIGN_OUT, {
          accessToken: this.signIn.data.accessToken
        })
      }
    }
  }
}
</script>

<style scoped>
  div#navigation nav {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  div#navigation nav > a {
    margin-bottom: 2rem;
  }

  div#navigation nav > a img {
    margin-top: 2rem;
    margin-left: 1rem;
    width: 7rem;
    position: absolute;
    left: 0;
    top: 0;
  }

  div#navigation nav ul.sub-items {
    display: inherit;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  div#navigation nav ul.items,
  div#navigation nav ul.sub-items {
    width: 100%;
  }

  div#navigation nav ul.sub-items li:nth-child(2) {
    margin-top: 0.8rem;
  }

  div#navigation nav ul.items li.settings {
    display: none;
  }

  div#navigation nav ul.items li a svg {
    font-size: 2em;
    margin-right: 1rem;
  }

  div#navigation nav ul.sub-items li p svg {
    font-size: 1.3em;
  }

  div#navigation nav ul.items li,
  div#navigation nav ul.sub-items li {
    padding-bottom: 1rem;
    padding-top: 1rem;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }

  div#navigation nav ul.items li:hover,
  div#navigation nav ul.items li.active {
    background: #187fb1;
    border-radius: 10rem;
  }

  div#navigation nav ul.items li a,
  div#navigation nav ul.sub-items li a {
    color: #ffffff;
    display: table;
  }

  div#navigation nav ul.sub-items li:nth-child(2) a {
    padding: 0.5rem;
  }

  div#navigation nav ul.sub-items li:nth-child(2) a p {
    padding-left: 0.5rem;
  }

  div#navigation nav ul.sub-items li a:hover {
    background: #187fb1;
    border-radius: 10rem;
  }

  div#navigation nav ul.items li a p,
  div#navigation nav ul.sub-items li a p {
    font-size: 0.9em;
    display: table-cell;
    vertical-align: middle;
  }

  div#navigation nav ul.sub-items li [data-letters]:before {
    content: attr(data-letters);
    border: solid 0.1rem #ffffff;
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    color: #176c9d;
  }

  div#navigation nav ul.sub-items li:hover [data-letters]:before {
    background: #176c9d;
    color: #ffffff;
  }

  @media (max-width: 1390px) {
    div#navigation nav ul.sub-items li:nth-child(2) a svg {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    div#navigation nav > a img {
      transform: rotate(-90deg);
      left: -2.9rem;
      top: 5%;
    }

    div#navigation nav ul.items {
      width: inherit;
      height: 50vh;
      overflow: hidden;
    }

    div#navigation nav ul.sub-items {
      left: unset;
    }

    div#navigation nav ul.sub-items li {
      padding-left: 0;
    }

    div#navigation nav ul.items li.active {
      width: 3rem;
      height: 3rem;
    }

    div#navigation nav ul.items li.settings {
      display: inline-block;
    }

    div#navigation nav ul.sub-items li.settings {
      display: none;
    }

    div#navigation nav ul.items li a svg {
      margin: 0;
      padding: 0;
      font-size: 1.3em;
    }

    div#navigation nav ul.items li a {
      width: 1rem;
      display: flex;
      justify-content: space-around;
    }

    div#navigation nav ul.items li a p {
      display: none;
    }
  }

  @media (max-width: 992px) {
    div#navigation nav > a img {
      left: calc(50% - ((7rem + 1rem) / 2));
      top: 0;
      transform: none;
    }

    div#navigation nav ul.items {
      width: unset;
      height: unset;
      overflow: unset;
    }

    div#navigation nav ul.sub-items {
      left: calc(50% - (60vw / 2));
    }

    div#navigation nav ul.items li,
    div#navigation nav ul.items li.active,
    div#navigation nav ul.sub-items li [data-letters]:before {
      width: 60vw;
      height: unset;
      text-align: center;
      border-radius: 10rem;
    }

    div#navigation nav ul.sub-items li {
      margin-bottom: 1rem;
    }

    div#navigation nav ul.items li a {
      width: auto;
      display: inline-table;
    }

    div#navigation nav ul.items li a svg {
      font-size: 2em;
      margin-right: 1rem;
    }

    div#navigation nav ul.items li a p {
      display: table-cell;
    }
  }
</style>
