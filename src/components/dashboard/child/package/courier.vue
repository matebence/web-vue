<template>
  <div id="courier">
    <h1>Kuriéry</h1>
    <form class="search">
      <input type="text" class="searchTerm" placeholder="Meno kuriéra">
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </form>
    <ul class="couriers">
      <li class="active">
        <ul class="courier">
          <li><i data-letters="MV"></i></li>
          <li><p>Michal Veľký</p></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'courier'
}
</script>

<style scoped>
  div#courier h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }

  div#courier form.search {
    position: absolute;
    right: 0;
    top: 5%;
  }

  div#courier form.search {
    display: inline-flex;
  }

  div#courier form.search input {
    font-size: 0.9em;
  }

  div#courier form.search .searchTerm {
    width: 10rem;
    border: 0.13rem solid #176c9d;
    border-right: none;
    text-align: center;
    border-radius: 3rem 0 0 3rem;
    outline: none;
  }

  div#courier form.search .searchButton {
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

  div#courier form.search .searchButton:hover {
    background: #187fb1;
  }

  div#courier ul.couriers {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
    overflow: auto;
    height: 7rem;
  }

  div#courier ul.couriers li {
    margin-right: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
  }

  div#courier ul.couriers li:hover, #dashboard ul.couriers li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#courier ul.couriers li ul.courier li [data-letters]:before {
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

  @media (max-width: 370px) {
    div#courier form.search {
      margin-top: 2rem;
      position: relative;
      left: calc(50% - (10rem / 2));
    }
  }
</style>
