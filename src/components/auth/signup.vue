<template>
  <div id="signin">
    <h1>Registrácia</h1>
    <form>
      <div class="form-group">
        <label for="username">Zadajte použivatelské meno</label>
        <input type="text" class="form-control" id="username" placeholder="Použivatelské meno">
      </div>
      <div class="form-group">
        <label for="email">Zadajte emailovú adresu</label>
        <input type="password" class="form-control" id="email" placeholder="Emailová adresa">
      </div>
      <div class="form-group">
        <label for="password">Zadajte heslo</label>
        <input type="password" class="form-control" id="password" placeholder="Heslo">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Potvrďte heslo</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Potvrdenie hesla">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Chcem sa stať</label>
        <select class="form-control">
          <option>Klientom</option>
          <option>Kuriérom</option>
        </select>
        <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
      </div>
      <button type="submit" class="btn btn-primary">Registrovať sa</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signin',
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    }
  }
}
</script>

<style scoped>
  div h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div a {
    display: block;
    float: right;
    margin-top: 0.5rem;
    color: #176c9d;
  }

  a:hover {
    color: #1796dc;
  }

  form {
    padding: 3rem;
  }

  form a {
    color: #176c9d;
    float: right;
  }

  form button {
    background: #ffffff;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 2rem;
  }

  form button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  select {
    font-size: 1.2em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    border-radius: 0;
    color: #6c757d;
    border-bottom: 0.1rem solid #dbdbdb;
  }

  input[type="text"], input[type="password"] {
    font-size: 1.3em;
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }
</style>
