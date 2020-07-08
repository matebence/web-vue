<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2" id="navigation">
          <nav class="nav">
            <a class="navbar-brand" href="#">
              <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
            </a>
            <ul class="items">
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'box']"/>
                <p>Balíky</p></a></li>
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'shipping-fast']"/>
                <p>Zásielky</p></a></li>
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'car']"/>
                <p>Vozidlá</p></a></li>
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'comment-dots']"/>
                <p>Správy&nbsp;<span class="badge badge-pill badge-danger">Nové</span></p></a></li>
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
                <p>Odhlásiť sa</p></a></li>
            </ul>
            <ul class="sub-items">
              <li>
                <a href="#" data-letters="MN"></a>
              </li>
              <li>
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'cog']"/>
                  Nastavenia
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-10" id="wrapper">
          <div class="row">
            <div class="col-lg-3" id="sub-navigation">
              <h1>Balíky</h1>
              <button><font-awesome-icon :icon="['fas', 'plus']"/></button>
            </div>
            <div class="col-lg-9" id="content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style scoped>
  div#dashboard div#content,
  div#dashboard div#navigation,
  div#dashboard div#sub-navigation {
    width: 100%;
    height: 98vh;
  }

  div#dashboard {
    background: #176c9d;
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  div#dashboard nav {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  div#dashboard nav > a {
    margin-bottom: 2rem;
  }

  div#dashboard nav > a img {
    margin-top: 2rem;
    margin-left: 1rem;
    width: 7rem;
    position: absolute;
    left: 0;
    top: 0;
  }

  div#dashboard nav ul.sub-items{
    display: inherit;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  div#dashboard nav ul.items,
  div#dashboard nav ul.sub-items {
    width: 100%;
  }

  div#dashboard nav ul.sub-items li:nth-child(2) {
    margin-top: 1.3rem;
  }

  div#dashboard nav ul.items li a svg {
    font-size: 2em;
    margin-right: 1rem;
  }

  div#dashboard nav ul.sub-items li p svg {
    font-size: 1.3em;
  }

  div#dashboard nav ul.items li,
  div#dashboard nav ul.sub-items li {
    padding-bottom: 2rem;
    padding-left: 1rem;
  }

  div#dashboard nav ul.items li a,
  div#dashboard nav ul.sub-items li a {
    color: #ffffff;
    display: table;
  }

  div#dashboard nav ul.items li a p,
  div#dashboard nav ul.sub-items li a p {
    font-size: 0.9em;
    display: table-cell;
    vertical-align: middle;
  }

  div#dashboard nav ul.sub-items li [data-letters]:before {
    content: attr(data-letters);
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    color: #176c9d;
  }

  div#dashboard div#wrapper {
    border: 0.3rem #176c9d solid;
    border-radius: 3rem;
    background: #fff5f3;
  }

  div#dashboard div#navigation {
    background: #176c9d;
  }

  div#dashboard div#sub-navigation {
    border-radius: 3rem;
    border: 0.5rem #fff5f3 solid;
    background: #ffffff;
  }

  div#dashboard div#sub-navigation h1 {
    margin-top: 1em;
    margin-left: 0.5em;
    font-size: 2em;
    display: inline-block;
  }

  div#dashboard div#sub-navigation button {
    display: inline;
    text-align: right;
    margin-top: 1em;
    margin-left: 0.5em;
    background: #fee2ec;
    border: none;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.5rem;
    text-align: center;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
  }

  div#dashboard div#sub-navigation button svg {
    font-size: 0.8em;
    color: #b84e75;
  }

  div#dashboard div#content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #fff5f3 solid;
    background: #ffffff;
  }
</style>
