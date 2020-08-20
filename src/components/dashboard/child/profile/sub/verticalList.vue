<template>
  <div id="verticalList">
    <ul class="settings">
      <li>
        <ul class="setting">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'user']"/>
          </li>
          <li class="option">Profil</li>
        </ul>
      </li>
    </ul>
    <ul class="settings">
      <li class="active">
        <ul class="setting">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'wallet']"/>
          </li>
          <li class="option">Peniaze</li>
        </ul>
      </li>
    </ul>
    <ul class="settings">
      <li>
        <ul class="setting">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'shield-alt']"/>
          </li>
          <li class="option">Bezpečnosť</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'verticalList'
}
</script>

<style scoped>
  div#verticalList {
    margin-top: 2rem;
  }

  div#verticalList ul.settings li ul.setting ul {
    text-align: center;
  }

  div#verticalList ul.settings li ul.setting ul li {
    margin-left: 1rem;
  }

  div#verticalList ul.settings li:hover,
  div#verticalList ul.settings li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.settings li ul.setting {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#verticalList ul.settings li ul.setting li.image {
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

  div#verticalList ul.settings li ul.setting li.option {
    margin-left: 1rem;
    font-size: 1.2em;
  }
</style>
