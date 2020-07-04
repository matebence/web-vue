<template>
  <div id="signin">
    <div id="wrapper">
      <h1>Prihlásenie</h1>
      <form>
        <div class="form-group">
          <label for="username">Zadajte použivatelské meno</label>
          <input type="text" class="form-control" id="username" placeholder="Použivatelské meno" v-model="account.values.userName">
        </div>
        <div class="form-group">
          <label for="password">Zadajte heslo</label>
          <input type="password" class="form-control" id="password" placeholder="Heslo" v-model="account.values.password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="stayLoggedIn" v-model="account.values.stayLoggedIn">
          <label class="form-check-label" for="stayLoggedIn">Zostať prihlásený</label>
        </div>
        <a href="#" @click.prevent="loadComponent('app-forget-password')">Zabudli ste heslo?</a>
        <button type="submit" class="btn btn-primary" @keyup.enter="performSignIn" @click.prevent="performSignIn">Prihlásiť sa</button>
      </form>
      <p class="text-center">Nemáte ešte použivatelské konto?</p>
      <a class="text-center" href="#" @click.prevent="loadComponent('app-sign-up')">Zaregistrovať sa teraz</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  created: function () {
    console.log(process.env.CLIENT_ID)
  },
  data: function () {
    return {
      resource: null,
      account: {
        values: {
          userName: '',
          password: '',
          stayLoggedIn: false,
        },
        dangerMessage: null,
        successMessage: null
      }
    }
  },
  methods: {
    loadComponent ($event) {
      this.$emit('loadComponent', $event)
      this.$router.push({path: $event.replace('app-', '')})
    },
    performSignIn () {
        console.log(process.env.VUE_APP_CLIENT_ID)
        console.log(`Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.secret)}`)
      this.resource = this.$resource('{service}/signin', {}, {performSignIn: {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)}`}}})
      this.resource.performSignIn({service: 'authorization-server'}, {grant_type: 'password', username: this.account.values.userName, password: this.account.values.password})
        .then(response => {
          console.log(response)
          return response.json()
        })
        .then(parsed => {
          console.log(parsed)
          if (!parsed.error) {
            this.account.dangerMessage = null
            this.account.successMessage = parsed.message
          }
        })
        .catch(err => {
          console.log(err)
          err.json().then(parsed => {
            if (parsed.error) {
              this.account.successMessage = null
              this.account.dangerMessage = parsed.message
            }
          })
        })
    }
  }
}
</script>

<style scoped>
  div#wrapper {
    width: 100%;
  }

  div#signin {
    padding: 2rem;
    height: 100vh;
    display: flex;
    align-items: center;
  }

  div h1 {
    font-size: 2.3em;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  div p, div a {
    display: block;
  }

  div p {
    margin-bottom: 0.3rem;
  }

  div a {
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
    text-align: right;
  }

  form button {
    background: #fcfcfc;
    border: solid 0.09rem #176c9d;
    border-radius: 0.2rem;
    color: #176c9d;
    margin-top: 3rem;
  }

  form button:hover {
    border-color: #7f7f7f;
    background: #176c9d;
    color: #ffffff;
  }

  input[type="text"], input[type="password"] {
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

  @media (max-width: 1200px) {
    input[type="text"], input[type="password"] {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 992px) {
    div#signin {
      height: auto;
    }
  }
</style>
