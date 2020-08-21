<template>
  <div id="security">
    <h1>Poloha</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="country">Štát</label>
          <input
            autofocus
            autocomplete="off"
            type="text"
            name="country"
            value="Slovakia"
            id="country" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="region">Kraj</label>
          <input
            autocomplete="off"
            type="text"
            name="region"
            value="Banskobystrický kraj"
            id="region" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="district">Okres</label>
          <input
            autocomplete="off"
            type="text"
            name="district"
            value="Poltár"
            id="district" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="place">Mesto</label>
          <input
            autocomplete="off"
            type="text"
            name="place"
            value="Bádice"
            id="place" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="street">Adresa</label>
          <input
            autocomplete="off"
            type="text"
            name="street"
            value="Obchodná 11"
            id="street" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="zip">PSČ</label>
          <input
            autocomplete="off"
            type="number"
            name="zip"
            value="95146"
            id="zip" />
        </div>
      </div>
    </div>
    <h1>Heslo</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="new-password">Nové heslo</label>
          <input
            autocomplete="off"
            type="password"
            name="new-password"
            value=""
            id="new-password" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="confirm-new-password">Potvrdenie nového hesla</label>
          <input
            autocomplete="off"
            type="password"
            name="confirm-new-password"
            value=""
            id="confirm-new-password" />
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'check']"/></button>
  </div>
</template>

<script>
export default {
  name: 'security'
}
</script>

<style scoped>
  div#security {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem;
  }

  div#security h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#security label {
    font-size: 1.2em;
    font-weight: 900;
    color: #a5a3a5;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  div#security div.row {
    margin-top: 2rem;
  }

  div#security input[type="text"],
  div#security input[type="number"],
  div#security input[type="password"] {
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 2rem;
    display: block;
    border: none;
    color: #000000;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#security select {
    background: #ffffff;
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 3rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #000000;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#security select:focus {
    background: #ffffff;
  }

  div#security option {
    background: #ffffff;
  }

  div#security button {
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

  div#security button:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#security button:disabled {
    opacity: .65;
    background: #095174;
  }

  @media (max-width: 768px) {
    div#security button {
      margin-top: 2rem;
      margin-left: 1rem;
      position: static;
    }
  }
</style>
