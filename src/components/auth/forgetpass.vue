<template>
  <div id="signin">
    <h1>Zabudnuté heslo</h1>
    <form>
      <div class="form-group">
        <label for="email">Zadajte Vašu emailová adresu</label>
        <input type="email" class="form-control" id="email" placeholder="Emailová adresa">
        <a href="#" @click.prevent="loadComponent('app-sign-in')">Späť na prihlásenie</a>
      </div>
      <button type="submit" class="btn btn-primary">Odoslať</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    }
  },
  name: 'signin'
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

  input[type="email"] {
    font-size: 1.3em;
    width: 100%;
    height: 3rem;
    display: block;
    box-shadow: none;
    border: none;
    outline: 0;
    color: #555555;
    background: transparent;
    border-radius: 0;
    border-bottom: 0.1rem solid #dbdbdb;
  }
</style>
