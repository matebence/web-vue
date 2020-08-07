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
          v-if="userHasRole(nav.isVisible.for)"
          :class="{active: activeEl.nav.itemId === nav.itemId}">
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
          <a href="#" :data-letters="avatar"></a>
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
  props: ['activeEl'],
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
            },
            isVisible: {
              for: [process.env.APP_ROLE_CLIENT]
            }
          },
          {
            itemId: 2,
            value: 'Zásielky',
            route: 'shipment',
            optional: {
              icon: 'shipping-fast',
              badge: ''
            },
            isVisible: {
              for: [process.env.APP_ROLE_CLIENT]
            }
          },
          {
            itemId: 3,
            value: 'Klienti',
            route: 'client',
            optional: {
              icon: 'users',
              badge: ''
            },
            isVisible: {
              for: [process.env.APP_ROLE_COURIER]
            }
          },
          {
            itemId: 4,
            value: 'Vozidlá',
            route: 'vehicle',
            optional: {
              icon: 'car',
              badge: ''
            },
            isVisible: {
              for: [process.env.APP_ROLE_COURIER]
            }
          },
          {
            itemId: 5,
            value: 'Správy',
            route: 'message',
            optional: {
              icon: 'comment-dots',
              badge: 'Nové'
            },
            isVisible: {
              for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
            }
          },
          {
            itemId: 6,
            value: 'Odhlásiť sa',
            route: 'sign-out',
            optional: {
              icon: 'sign-out-alt',
              badge: ''
            },
            isVisible: {
              for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
            }
          }
        ]
      }
    }
  },
  computed: {
    avatar: function () {
      return localStorage.getItem('avatar')
    },
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA,
      allowedRoles: types.GETTER_SIGN_IN_GET_ROLE
    })
  },
  methods: {
    selectedNav: function (el) {
      this.activeEl.nav.itemId = el.itemId
      this.activeEl.nav.value = el.value

      if (this.activeEl.nav.value === this.navigation.items[5].value) {
        return this.$store.dispatch(types.ACTION_SIGN_OUT, {
          accessToken: this.signIn.accessToken
        })
      }
    },
    userHasRole: function (role) {
      return [...this.allowedRoles].some(e => role.includes(e))
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
    cursor: auto;
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

    div#navigation nav ul.items li {
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
