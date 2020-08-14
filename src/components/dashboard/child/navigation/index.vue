<template>
  <div id="index">
    <nav class="nav">
      <a class="navbar-brand" href="#">
        <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
      </a>
      <ul class="items">
        <li
          :key="nav.itemId"
          v-for="nav in navigation.items"
          @click.prevent="onSelectedNav(nav)"
          v-if="userHasRole(nav.isVisible.for)"
          :class="{active: activeEl.nav.itemId === nav.itemId}"
          :id="nav.route">
          <router-link :to="`${nav.route}`">
            <font-awesome-icon :icon="['fas', nav.optional.icon]"/>
            <p>{{nav.value}}&nbsp; <span class="badge badge-pill badge-danger">{{nav.optional.badge}}</span></p>
          </router-link>
        </li>
      </ul>
      <ul class="sub-items">
        <li>
          <a href="#" :data-letters="avatar"></a>
        </li>
        <li class="settings"
          @click.prevent="onSelectedNav({itemId: 6, value: 'Nastavenia'})">
          <router-link
            to="profile"
            :class="{active: activeEl.nav.itemId === 6}">
            <font-awesome-icon :icon="['fas', 'cog']"/>
            <p>Nastavenia</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  name: 'index',
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
          }, {
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
          }, {
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
          }, {
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
          }, {
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
          }, {
            itemId: 6,
            value: 'Nastavenia',
            route: 'profile',
            optional: {
              icon: 'cog',
              badge: ''
            },
            isVisible: {
              for: [process.env.APP_ROLE_CLIENT, process.env.APP_ROLE_COURIER]
            }
          }, {
            itemId: 7,
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
    onSelectedNav: function (el) {
      this.activeEl.nav.itemId = el.itemId
      this.activeEl.nav.value = el.value

      if (this.activeEl.nav.value === this.navigation.items[6].value) {
        return this.$store.dispatch(types.ACTION_SIGN_OUT, {accessToken: this.signIn.accessToken})
          .catch(err => console.log(err))
      }
    },
    userHasRole: function (role) {
      return [...this.allowedRoles].some(e => role.includes(e))
    }
  }
}
</script>

<style scoped>
  div#index nav {
    width: 100%;
    height: 100vh;
    align-items: center;
    overflow: auto;
}

div#index nav > a {
  margin-bottom: 2rem;
}

div#index nav > a img {
  margin-top: 2rem;
  margin-left: 1rem;
  width: 7rem;
  position: relative;
  left: 0;
  top: 0;
}

div#index nav ul.sub-items {
  display: inherit;
}

div#index nav ul.items,
div#index nav ul.sub-items {
  width: 100%;
}

div#index nav ul.sub-items li:nth-child(2) {
  margin-top: 0.8rem;
}

div#index nav ul.items li.settings {
  display: none;
}

div#index nav ul.items li a svg {
  font-size: 2em;
  margin-right: 1rem;
}

div#index nav ul.sub-items li p svg {
  font-size: 1.3em;
}

div#index nav ul.items li,
div#index nav ul.sub-items li {
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}

div#index nav ul.items li:hover,
div#index nav ul.items li.active {
  background: #187fb1;
  border-radius: 10rem;
}

div#index nav ul.items li a,
div#index nav ul.sub-items li a {
  color: #ffffff;
  display: table;
}

div#index nav ul.sub-items li:nth-child(2) a {
  padding: 0.5rem;
}

div#index nav ul.sub-items li:nth-child(2) a p {
  padding-left: 0.5rem;
}

div#index nav ul.sub-items li a.active,
div#index nav ul.sub-items li a:hover {
  background: #187fb1;
  border-radius: 10rem;
}

div#index nav ul.items li a p,
div#index nav ul.sub-items li a p {
  font-size: 0.9em;
  display: table-cell;
  vertical-align: middle;
}

div#index nav ul.sub-items li [data-letters]:before {
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

div#index nav ul.sub-items li:hover [data-letters]:before {
  cursor: auto;
}

@media (max-width: 1390px) {
  div#index nav ul.sub-items li:nth-child(2) a svg {
    display: none;
  }
}

@media (min-width: 1200px) {
  div#index nav ul.items li#profile {
    display: none;
  }
}

@media (max-width: 1200px) {
  div#index nav > a img {
    transform: rotate(-90deg);
    left: -2.9rem;
    top: 5%;
  }

  div#index nav ul.items {
    width: inherit;
    height: unset;
    overflow: hidden;
  }

  div#index nav ul.sub-items li {
    padding-left: 0;
  }

  div#index nav ul.items li {
    width: 3rem;
    height: 3rem;
  }

  div#index nav ul.items li.settings {
    display: inline-block;
  }

  div#index nav ul.sub-items li.settings {
    display: none;
  }

  div#index nav ul.items li a svg {
    margin: 0;
    padding: 0;
    font-size: 1.3em;
  }

  div#index nav ul.items li a {
    width: 1rem;
    display: flex;
    justify-content: space-around;
  }

  div#index nav ul.items li a p {
    display: none;
  }
}

@media (max-width: 992px) {
  div#index nav > a {
    margin: 0 auto;
  }

  div#index nav > a img {
    margin-bottom: 1rem;
    transform: none;
    left: 0;
    top: 0;
  }

  div#index nav ul.items li,
  div#index nav ul.items li.active,
  div#index nav ul.sub-items li [data-letters]:before {
    width: 60vw;
    height: unset;
    text-align: center;
    border-radius: 10rem;
  }

  div#index nav ul.items li, div#index nav ul.sub-items li {
    display: block;
    margin: 0 auto;
  }

  div#index nav ul.sub-items li {
    margin-bottom: 1rem;
  }

  div#index nav ul.items li a {
    width: auto;
    display: inline-table;
  }

  div#index nav ul.items li a svg {
    font-size: 2em;
    margin-right: 1rem;
  }

  div#index nav ul.items li a p {
    display: table-cell;
  }
}
</style>
