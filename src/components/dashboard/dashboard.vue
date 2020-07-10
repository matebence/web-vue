<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <nav class="nav">
            <a class="navbar-brand" href="#">
              <img src="@/assets/img/blesk-default-logo.png" alt="Blesk logo">
            </a>
            <ul class="items">
              <li class="active"><a href="#">
                <font-awesome-icon :icon="['fas', 'box-open']"/>
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
              <li class="settings"><a href="#">
                <font-awesome-icon :icon="['fas', 'cog']"/>
                <p>Nastavenia</p></a></li>
              <li><a href="#">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']"/>
                <p>Odhlásiť sa</p></a></li>
            </ul>
            <ul class="sub-items">
              <li>
                <a href="#" data-letters="PV"></a>
              </li>
              <li class="settings">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'cog']"/>
                  Nastavenia
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-11 col-xl-10" id="wrapper">
          <div class="row">
            <div class="col-lg-4 col-xl-3" id="sub-navigation">
              <h1>Balíky</h1>
              <button>
                <font-awesome-icon :icon="['fas', 'plus']"/>
              </button>
              <ul class="tabs">
                <li class="active">Pridelené</li>
                <li>Nepridelené</li>
                <li>Všetky</li>
              </ul>
              <ul class="parcels">
                <li class="active">
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#1</li>
                        <li class="created">13/07/2020<br>12:25</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'utensils']"/>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#2</li>
                        <li class="created">13/07/2020<br>13:00</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'tshirt']"/>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#3</li>
                        <li class="created">13/07/2020<br>13:00</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'plug']"/>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#4</li>
                        <li class="created">13/07/2020<br>13:00</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'file']"/>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#5</li>
                        <li class="created">13/07/2020<br>13:00</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'spray-can']"/>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul class="parcel">
                    <li class="image">
                      <font-awesome-icon :icon="['fas', 'box']"/>
                    </li>
                    <li>
                      <ul>
                        <li class="number">#6</li>
                        <li class="created">13/07/2020<br>13:00</li>
                      </ul>
                    </li>
                    <li class="category">
                      <font-awesome-icon :icon="['fas', 'question-circle']"/>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="col-lg-8 col-xl-9" id="content">
              <h1>Kuriéry</h1>
              <form class="search">
                <input type="text" class="searchTerm" placeholder="Meno kuriéra">
                <button type="submit" class="searchButton">
                  <i class="fa fa-search"></i>
                </button>
              </form>
              <ul class="couriers">
                <li>
                  <ul class="courier">
                    <li><i data-letters="MV"></i></li>
                    <li><p>Michal Veľký</p></li>
                  </ul>
                </li>
              </ul>
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

  div#dashboard nav ul.sub-items {
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
    margin-top: 0.8rem;
  }

  div#dashboard nav ul.items li.settings {
    display: none;
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
    padding-bottom: 1rem;
    padding-top: 1rem;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }

  div#dashboard nav ul.items li:hover,
  div#dashboard nav ul.items li.active {
    background: #187fb1;
    border-radius: 10rem;
  }

  div#dashboard nav ul.items li a,
  div#dashboard nav ul.sub-items li a {
    color: #ffffff;
    display: table;
  }

  div#dashboard nav ul.sub-items li:nth-child(2) a {
    padding: 0.5rem;
  }

  div#dashboard nav ul.sub-items li a:hover {
    background: #187fb1;
    border-radius: 10rem;
  }

  div#dashboard nav ul.items li a p,
  div#dashboard nav ul.sub-items li a p {
    font-size: 0.9em;
    display: table-cell;
    vertical-align: middle;
  }

  div#dashboard nav ul.sub-items li [data-letters]:before {
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

  div#dashboard nav ul.sub-items li:hover [data-letters]:before {
    background: #176c9d;
    color: #ffffff;
  }

  div#dashboard div#wrapper {
    border: 0.3rem #176c9d solid;
    border-radius: 3rem;
    background: #f1f1f1;
  }

  div#dashboard div#navigation {
    background: #176c9d;
  }

  div#dashboard div#sub-navigation {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#dashboard div#sub-navigation h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }

  div#dashboard div#sub-navigation button {
    display: inline;
    text-align: right;
    margin-top: 1em;
    margin-left: 0.5em;
    background: #176c9d;
    border: none;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.3rem;
    text-align: center;
    position: absolute;
    top: 1.3rem;
    right: 1.3rem;
  }

  div#dashboard div#sub-navigation button:hover {
    background: #187fb1;
  }

  div#dashboard div#sub-navigation button:focus {
    outline: 0;
  }

  div#dashboard div#sub-navigation button svg {
    font-size: 0.8em;
    color: #ffffff;
  }

  div#dashboard div#sub-navigation ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#dashboard div#sub-navigation ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#dashboard div#sub-navigation ul.tabs li:hover,
  div#dashboard div#sub-navigation ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;

  }

  div#dashboard div#sub-navigation ul.parcels li:hover,
  div#dashboard div#sub-navigation ul.parcels li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#dashboard div#sub-navigation ul.parcels li ul.parcel {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  div#dashboard div#sub-navigation ul.parcels li ul.parcel li.image {
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 0.5rem;
    border: solid 0.09rem #176c9d;
    color: #176c9d;
  }

  div#dashboard div#sub-navigation ul.parcels li ul.parcel li ul li.number,
  div#dashboard div#sub-navigation ul.parcels li ul.parcel li ul li.created {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  div#dashboard div#sub-navigation ul.parcels li ul.parcel li.category svg {
    font-size: 1.3em;
    color: #176c9d;
  }

  div#dashboard div#sub-navigation ul.parcels li ul.parcel li.category {
    padding: 1rem;
  }

  div#dashboard div#content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
  }

  div#dashboard div#content h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }

  div#dashboard div#content form.search {
    position: absolute;
    right: 0;
    top: 5%;
  }

  div#dashboard div#content form.search {
    display: inline-flex;
  }

  div#dashboard div#content form.search input {
    font-size: 0.9em;
  }

  div#dashboard div#content form.search .searchTerm {
    width: 10rem;
    border: 0.13rem solid #176c9d;
    border-right: none;
    text-align: center;
    border-radius: 3rem 0 0 3rem;
    outline: none;
  }

  div#dashboard div#content form.search .searchButton {
    position: relative;
    right: 7%;
    width: 3rem;
    background: #176c9d;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
  }

  div#dashboard div#content form.search .searchButton:hover {
    background: #187fb1;
  }

  div#dashboard div#content ul.couriers {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
    overflow: auto;
    height: 7rem;
  }

  div#dashboard div#content ul.couriers li {
    margin-right: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
  }

  div#dashboard div#content ul.couriers li:hover, #dashboard div#content ul.couriers li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#dashboard div#content ul.couriers li ul.courier li [data-letters]:before {
    content: attr(data-letters);
    border: solid 0.1rem #ffffff;
    display: inline-block;
    font-size: 1.3em;
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.3rem;
    text-align: center;
    border-radius: 50%;
    border: solid 0.1rem #176c9d;
    background: transparent;
    color: #176c9d;
  }

  @media (max-width: 1390px){
    div#dashboard nav ul.sub-items li:nth-child(2) a svg {
      display: none;
    }
  }

  @media (max-width: 1200px){
    div#dashboard nav > a img {
      transform: rotate(-90deg);
      left: -2.3rem;
      top: 5%;
    }

    div#dashboard nav ul.items {
      width: inherit;
      height: 50vh;
      overflow: hidden;
    }

    div#dashboard nav ul.sub-items {
      left: unset;
    }

    div#dashboard nav ul.sub-items li {
      padding-left: 0;
    }

    div#dashboard nav ul.items li.active {
      width: 4rem;
    }

    div#dashboard nav ul.items li.settings {
      display: inline-block;
    }

    div#dashboard nav ul.sub-items li.settings {
      display: none;
    }

    div#dashboard nav ul.items li a svg {
      margin: 0;
      padding: 0;
      font-size: 1.5em;
    }

    div#dashboard nav ul.items li a {
      width: 2rem;
      display: flex;
      justify-content: space-around;
    }

    div#dashboard nav ul.items li a p {
      display: none;
    }
  }

  @media (max-width: 992px) {
    div#dashboard nav > a img {
      left: calc(50% - ((7rem + 1rem) / 2));
      top: 0;
      transform: none;
    }

    div#dashboard nav ul.items {
      width: unset;
      height: unset;
      overflow: unset;
    }

    div#dashboard nav ul.sub-items {
      left: calc(50% - (60vw/2));
    }

    div#dashboard nav ul.items li,
    div#dashboard nav ul.items li.active,
    div#dashboard nav ul.sub-items li [data-letters]:before{
      width: 60vw;
      text-align: center;
      border-radius: 10rem;
    }

    div#dashboard nav ul.sub-items li {
      margin-bottom: 1rem;
    }

    div#dashboard nav ul.items li a {
      width: auto;
      display: inline-table;
    }

    div#dashboard nav ul.items li a svg {
      font-size: 2em;
      margin-right: 1rem;
    }

    div#dashboard nav ul.items li a p {
      display: table-cell;
    }

    div#dashboard div#content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  @media (max-width: 370px) {
    div#dashboard div#content form.search {
      margin-top: 2rem;
      position: relative;
      left: calc(50% - (10rem/2));
    }
  }
</style>
