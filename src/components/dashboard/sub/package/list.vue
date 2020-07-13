<template>
  <div id="list">
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
</template>

<script>
export default {
  name: 'list'
}
</script>

<style scoped>
  div#list ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#list ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#list ul.tabs li:hover,
  div#list ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;

  }

  div#list ul.parcels li:hover,
  div#list ul.parcels li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#list ul.parcels li ul.parcel {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  div#list ul.parcels li ul.parcel li.image {
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

  div#list ul.parcels li ul.parcel li ul li.number,
  div#list ul.parcels li ul.parcel li ul li.created {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }

  div#list ul.parcels li ul.parcel li.category {
    padding: 1rem;
  }

  div#list ul.parcels li ul.parcel li.category svg {
    font-size: 1.3em;
    color: #176c9d;
  }
</style>
