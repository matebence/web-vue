<template>
  <div id="navigation">
    <nav class="nav">
      <a class="navbar-brand" href="#">
        <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
      </a>
      <ul class="items">
        <li class="active">
          <a href="#">
            <font-awesome-icon :icon="['fas', 'box-open']"/>
            <p>Balíky</p>
          </a>
        </li>
        <li>
          <a href="#">
            <font-awesome-icon :icon="['fas', 'shipping-fast']"/>
            <p>Zásielky</p>
          </a>
        </li>
        <li>
          <a href="#">
            <font-awesome-icon :icon="['fas', 'car']"/>
            <p>Vozidlá</p>
          </a>
        </li>
        <li>
          <a href="#">
            <font-awesome-icon :icon="['fas', 'comment-dots']"/>
            <p>Správy&nbsp;<span class="badge badge-pill badge-danger">Nové</span></p>
          </a>
        </li>
        <li class="settings">
          <a href="#">
            <font-awesome-icon :icon="['fas', 'cog']"/>
            <p>Nastavenia</p>
          </a>
        </li>
        <li>
          <a @click.prevent="onSignOut" href="/sign-out">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
            <p>Odhlásiť sa</p>
          </a>
        </li>
      </ul>
      <ul class="sub-items">
        <li>
          <a href="#" data-letters="PV"></a>
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
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DEFAULT
    })
  },
  methods: {
    onSignOut () {
      this.$store.dispatch(types.ACTION_SIGN_OUT, {
        accessToken: this.signIn.data.accessToken
      })
    }
  }
}
</script>

<style scoped>
  nav {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  nav > a {
    margin-bottom: 2rem;
  }

  nav > a img {
    margin-top: 2rem;
    margin-left: 1rem;
    width: 7rem;
    position: absolute;
    left: 0;
    top: 0;
  }

  nav ul.sub-items {
    display: inherit;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  nav ul.items,
  nav ul.sub-items {
    width: 100%;
  }

  nav ul.sub-items li:nth-child(2) {
    margin-top: 0.8rem;
  }

  nav ul.items li.settings {
    display: none;
  }

  nav ul.items li a svg {
    font-size: 2em;
    margin-right: 1rem;
  }

  nav ul.sub-items li p svg {
    font-size: 1.3em;
  }

  nav ul.items li,
  nav ul.sub-items li {
    padding-bottom: 1rem;
    padding-top: 1rem;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }

  nav ul.items li:hover,
  nav ul.items li.active {
    background: #187fb1;
    border-radius: 10rem;
  }

  nav ul.items li a,
  nav ul.sub-items li a {
    color: #ffffff;
    display: table;
  }

  nav ul.sub-items li:nth-child(2) a {
    padding: 0.5rem;
  }

  nav ul.sub-items li:nth-child(2) a p {
    padding-left: 0.5rem;
  }

  nav ul.sub-items li a:hover {
    background: #187fb1;
    border-radius: 10rem;
  }

  nav ul.items li a p,
  nav ul.sub-items li a p {
    font-size: 0.9em;
    display: table-cell;
    vertical-align: middle;
  }

  nav ul.sub-items li [data-letters]:before {
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

  nav ul.sub-items li:hover [data-letters]:before {
    background: #176c9d;
    color: #ffffff;
  }

  @media (max-width: 1390px) {
    nav ul.sub-items li:nth-child(2) a svg {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    nav > a img {
      transform: rotate(-90deg);
      left: -2.3rem;
      top: 5%;
    }

    nav ul.items {
      width: inherit;
      height: 50vh;
      overflow: hidden;
    }

    nav ul.sub-items {
      left: unset;
    }

    nav ul.sub-items li {
      padding-left: 0;
    }

    nav ul.items li.active {
      width: 4rem;
    }

    nav ul.items li.settings {
      display: inline-block;
    }

    nav ul.sub-items li.settings {
      display: none;
    }

    nav ul.items li a svg {
      margin: 0;
      padding: 0;
      font-size: 1.5em;
    }

    nav ul.items li a {
      width: 2rem;
      display: flex;
      justify-content: space-around;
    }

    nav ul.items li a p {
      display: none;
    }
  }

  @media (max-width: 992px) {
    nav > a img {
      left: calc(50% - ((7rem + 1rem) / 2));
      top: 0;
      transform: none;
    }

    nav ul.items {
      width: unset;
      height: unset;
      overflow: unset;
    }

    nav ul.sub-items {
      left: calc(50% - (60vw / 2));
    }

    nav ul.items li,
    nav ul.items li.active,
    nav ul.sub-items li [data-letters]:before {
      width: 60vw;
      text-align: center;
      border-radius: 10rem;
    }

    nav ul.sub-items li {
      margin-bottom: 1rem;
    }

    nav ul.items li a {
      width: auto;
      display: inline-table;
    }

    nav ul.items li a svg {
      font-size: 2em;
      margin-right: 1rem;
    }

    nav ul.items li a p {
      display: table-cell;
    }
  }
</style>
