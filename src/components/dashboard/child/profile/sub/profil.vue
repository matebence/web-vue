<template>
  <div id="profil">
    <h1>Peter Varga</h1>
    <div class="container-fluid">
      <div class="row header">
        <div class="col-sm-12">
          <div class="profil-image" data-letters="PV"></div>
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="username">Username</label>
          <input
            autofocus
            autocomplete="off"
            type="text"
            name="username"
            value="petervarga"
            id="username" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="email">Email</label>
          <input
            autocomplete="off"
            type="email"
            name="email"
            value="peter.varga@gmail.com"
            id="email" />
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="firstname">First name</label>
          <input
            autocomplete="off"
            type="text"
            name="firstname"
            value="Peter"
            id="firstname" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="lastname">Last name</label>
          <input
            autocomplete="off"
            type="text"
            name="lastname"
            value="Varga"
            id="lastname" />
        </div>
      </div>
      <div class="row body">
        <div class="col-sm-12 col-md-6">
          <label for="tel">Tel. number</label>
          <input
            autocomplete="off"
            type="text"
            name="tel"
            value="+421915521884"
            id="tel" />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="gender">Pohlavie</label>
          <select
            class="form-control"
            id="gender">
            <option selected >Muž</option>
            <option >Žena</option>
          </select>
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
  name: 'profil'
}
</script>

<style scoped>
  div#profil {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem;
  }

  div#profil h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    margin-bottom: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#profil div.header div.profil-image {
    width: 9rem;
    line-height: 9rem;
    border-radius: 50%;
    text-align: center;
    font-size: 3.5em;
    background-color: #176c9d;
  }

  div#profil div.header div.profil-image:before {
    color: #ffffff;
    font-family: Palanquin-Regular, sans-serif;
    content: attr(data-letters);
  }

  div#profil div.body {
    margin-top: 2rem;
  }

  div#profil div.body label {
    font-size: 1.2em;
    font-weight: 900;
    color: #a5a3a5;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  div#profil div.body input[type="text"],
  div#profil div.body input[type="email"] {
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

  div#profil div.body select {
    background: #ffffff;
    font-size: 1.15em;
    font-weight: 700;
    width: 80%;
    height: 2rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #000000;
    padding: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  div#profil div.body select:focus {
    background: #ffffff;
  }

  div#profil div.body option {
    height: 2rem;
    background: #ffffff;
  }

  div#profil button {
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

  div#profil button:hover {
    cursor: pointer;
    background: #187fb1;
  }

  div#profil button:disabled {
    opacity: .65;
    background: #095174;
  }

  @media (max-width: 768px) {
    div#profil button {
      margin-top: 2rem;
      margin-left: 1rem;
      position: static;
    }
  }
</style>
