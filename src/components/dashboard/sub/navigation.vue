<template>
  <div id="navigation">
    <nav class="nav">
      <router-link
        to="/"
        class="navbar-brand">
        <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
      </router-link>
      <ul class="items">
        <li
          :key="nav.itemId"
          v-for="nav in appNavigation.items"
          @click.prevent="onSelectedNav(nav)"
          v-if="hasUserRole(nav.isVisible.for)"
          :id="nav.route">
          <router-link
            :to="`${nav.route}`">
            <font-awesome-icon :icon="['fas', nav.optional.icon]"/>
            <p>{{nav.value}}</p>
          </router-link>
        </li>
      </ul>
      <ul class="sub-items">
        <li>
          <p href="#" :data-letters="getAvatar ? getAvatar : 'XX'"></p>
        </li>
        <li class="settings"
            @click.prevent="onSelectedNav({itemId: 6, value: 'Nastavenia'})">
          <router-link
            to="settings">
            <font-awesome-icon :icon="['fas', 'cog']"/>
            <p>Nastavenia</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  import {mapGetters} from 'vuex'

  export default {
    name: 'navigation',
    props: ['appNavigation', 'activeEl'],
    data: function () {
      return {}
    },
    computed: {
      getAvatar: function () {
        return (Object.keys(this.userProfile).length === 0) ? 'XX' : `${this.userProfile.firstName.substr(0, 1)}${this.userProfile.lastName.substr(0, 1)}`
      },
      ...mapGetters({
        userProfile: types.GETTER_USER_DATA_GET,
        allowedRoles: types.GETTER_SIGN_IN_GET_ROLE
      })
    },
    methods: {
      onSelectedNav: function (el) {
        if (this.userProfile.userId === undefined) return
        this.activeEl.itemId = el.itemId
        this.activeEl.value = el.value
      },
      hasUserRole: function (role) {
        return [...this.allowedRoles].some(e => role.includes(e))
      }
    }
  }
</script>

<style scoped>
  div#navigation nav {
    width: 100%;
    height: 100vh;
    align-items: center;
    overflow: auto;
  }

  div#navigation nav > a {
    margin-bottom: 2rem;
  }

  div#navigation nav > a img {
    margin-top: 2rem;
    margin-left: 1rem;
    width: 7rem;
    position: relative;
    left: 0;
    top: 0;
  }

  div#navigation nav ul.sub-items {
    display: inherit;
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
    margin-bottom: 0.5rem;
  }

  div#navigation nav ul.items li a {
    padding: 1rem;
  }

  div#navigation nav ul.items li a:hover,
  div#navigation nav ul.items li a.active {
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

  div#navigation nav ul.sub-items li p,
  div#navigation nav ul.sub-items li {
    padding-left: 0.5rem;
  }

  div#navigation nav ul.sub-items li a.active,
  div#navigation nav ul.sub-items li a:hover {
    background: #187fb1;
    border-radius: 10rem;
  }

  div#navigation nav ul.items li a p {
    width: 6.7rem;
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

  @media (min-width: 1200px) {
    div#navigation nav ul.items li#settings {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    div#navigation nav > a.navbar-brand {
      overflow: hidden;
      height: 9rem;
    }

    div#navigation nav > a img {
      transform: rotate(-90deg);
      left: -2.9rem;
      top: 24%;
    }

    div#navigation nav ul.items {
      width: inherit;
      height: unset;
      overflow: hidden;
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

    div#navigation nav ul.sub-items li p {
      padding: 0;
    }

    div#navigation nav ul.items li a svg {
      margin: 0;
      padding: 0;
      font-size: 1.3em;
    }

    div#navigation nav ul.items li a {
      display: flex;
      justify-content: space-around;
    }

    div#navigation nav ul.items li a p {
      display: none;
    }
  }

  @media (max-width: 992px) {
    div#navigation nav > a {
      margin: 0 auto;
    }

    div#navigation nav > a img {
      margin-bottom: 1rem;
      transform: none;
      left: 0;
      top: 0;
    }

    div#navigation nav ul.items li {
      border: 0.2rem solid #176c9d;
    }

    div#navigation nav ul.items li,
    div#navigation nav ul.items li.active,
    div#navigation nav ul.sub-items li [data-letters]:before {
      width: 60vw;
      height: unset;
      text-align: center;
      border-radius: 10rem;
    }

    div#navigation nav ul.items li,
    div#navigation nav ul.sub-items li {
      display: block;
      margin: 0 auto;
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
