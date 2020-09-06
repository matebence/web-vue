<template>
  <div id="verticalList">
    <h1>Správy</h1>
    <form id="searchForm">
      <div class="form-input">
        <font-awesome-icon :icon="['fas', 'search']"/>
        <input type="text" name="search" id="search" autocomplete="off" placeholder="Zadajte používateľské meno">
      </div>
    </form>
    <ul class="messages">
      <li class="active">
        <ul class="message">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'user']"/>
          </li>
          <li class="summary">
            <ul>
              <li class="status">michalvelky</li>
              <li class="from">Lorem ipsum dolor sit</li>
              <li class="number">6/8/2020 12:08</li>
            </ul>
          </li>
        </ul>
      </li>
      <!--<li>Zoznam je prázdny </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'verticalList',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
  div#verticalList h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#verticalList form#searchForm {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div#verticalList form#searchForm div.form-input svg {
    position: absolute;
    left: 1.5rem;
    top: 5.4rem;
    color: #868686;
    z-index: 2;
  }

  div#verticalList form#searchForm div.form-input input {
    position: relative;
    width: 100%;
    font-size: 0.9em;
    padding-left: 2rem;
    border: solid 0.01rem #a1a1a1;
    border-radius: 0.6rem;
  }

  div#verticalList ul.messages li ul.message ul {
    text-align: left;
  }

  div#verticalList ul.messages li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.messages li:hover,
  div#verticalList ul.messages li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.messages li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.messages li ul.message {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#verticalList ul.messages li ul.message li.image {
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

  div#verticalList ul.messages li ul.message li.summary {
    margin-left: 1rem;
  }

  div#verticalList ul.messages li ul.message li ul li.number,
  div#verticalList ul.messages li ul.message li ul li.status,
  div#verticalList ul.messages li ul.message li ul li.from {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  @media (max-width: 1400px) {
    div#verticalList ul.messages li ul.message li.image {
      display: none;
    }

    div#verticalList ul.messages li ul.message {
      padding: 0.5rem;
    }

    div#verticalList ul.messages li ul.message ul li {
      margin-left: 0;
    }

    div#verticalList ul.messages li ul.message {
      justify-content: space-around;
    }
  }

  @media (max-width: 1200px) {
    div#verticalList ul.messages li ul.message li.image {
      display: block;
    }

    div#verticalList ul.messages li ul.message {
      padding: 0;
    }

    div#verticalList ul.messages li ul.message ul li {
      margin-left: 0.5rem;
    }

    div#verticalList ul.messages li ul.message {
      justify-content: end;
    }
  }

  @media (max-width: 992px) {
    div#verticalList ul.messages li ul.message li.summary {
      margin: 0 auto;
    }
  }
</style>
