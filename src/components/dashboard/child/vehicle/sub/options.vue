<template>
  <div id="options">
    <hr>
    <h1>Ďalšie možnosti</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <h2>Modifikácia osobných údajov</h2>
          <router-link to="settings">Nastavenia</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Otvoriť mapu a zoznam klientov</h2>
          <router-link to="client">Mapa klientov</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h2>Napísať správu</h2>
          <router-link to="message">Chat</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'options',
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  div#options {
    margin-top: 2rem;
  }

  div#options h1 {
    margin-top: 0.5em;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#options h2 {
    font-size: 1.3em;
    font-weight: 900;
    color: #979797;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  div#options p,
  div#options a {
    color: #000000;
    font-size: 1em;
    font-weight: 900;
    word-break: break-all;
  }

  div#options a:hover {
    color: #616161;
  }
</style>
