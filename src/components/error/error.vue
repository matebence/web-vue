<template>
  <div id="error">
    <div class="outer">
      <div class="middle">
        <div class="inner">
          <h1>404</h1>
          <p>Ľutujeme, ale stránka nebola nájdena</p>
          <router-link to="/sign-in">Späť na hlavnú stránku</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  div#error {
    width: 100vw;
    height: 100vh;
    background: #176c9d;
  }

  div#error .outer {
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }

  div#error .middle {
    display: table-cell;
    vertical-align: middle;
  }

  div#error .inner {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 100vw;
  }

  div#error .inner h1 {
    font-size: 20em;
    line-height: 0;
    color: #ffffff;
    margin: 10rem;
  }

  div#error .inner p {
    font-size: 2em;
    color: #ffffff;
    margin: 3rem;
  }

  div#error .inner a {
    font-weight: 900;
    font-size: 1.3em;
    border: solid 0.1rem #ffffff;
    text-transform: inherit;
    border-radius: 0.5rem;
    background: #ffffff;
    text-decoration: none;
    color: #176c9d;
    padding: 0.5rem 1rem;
    margin: 0;
  }

  div#error .inner > a:hover {
    background-color: #176c9d;
    color: #ffffff;
  }

  @media (max-width: 992px) {
    div#error .inner h1 {
      font-size: 15em;
      margin: 7rem;
    }

    div#error .inner p {
      font-size: 1.8em;
    }

    div#error .inner a {
      font-size: 1.1em;
    }
  }

  @media (max-width: 768px) {
    div#error .inner h1 {
      font-size: 10em;
      margin: 5rem;
    }

    div#error .inner p {
      font-size: 1.2em;
    }

    div#error .inner a {
      font-size: 1em;
    }
  }

  @media (max-width: 576px) {
    div#error .inner h1 {
      font-size: 7em;
      margin: 4rem;
    }

    div#error .inner p {
      font-size: 1em;
    }

    div#error .inner a {
      font-size: 0.8em;
    }
  }

  @media (max-width: 350px) {
    div#error .inner h1 {
      font-size: 4em;
      margin: 3rem;
    }

    div#error .inner p {
      font-size: 1em;
    }

    div#error .inner a {
      font-size: 0.9em;
      padding: 0.2rem 0.5rem;
    }
  }

  @media (max-width: 210px) {
    div#error .inner h1 {
      font-size: 2em;
      margin: 1.5rem;
    }

    div#error .inner p {
      font-size: 0.7em;
    }

    div#error .inner a {
      font-size: 0.5em;
      padding: 0.2rem 0.5rem;
    }
  }

  @media (max-width: 120px) {
    div#error .inner a, div#error .inner h1 {
      display: none;
    }
  }
</style>
