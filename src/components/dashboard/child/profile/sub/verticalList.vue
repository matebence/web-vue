<template>
  <div id="verticalList">
    <h1>Nastavenia</h1>
    <ul
      class="settings"
      :key="setting.itemId"
      @click.prevent="onSelectedSetting(setting)"
      v-for="setting in appVerticalList.items">
      <li
        :class="{active: activeEl.itemId === setting.itemId}">
        <ul class="setting">
          <li class="image">
            <font-awesome-icon :icon="['fas', setting.icon]"/>
          </li>
          <li class="option">{{setting.value}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'verticalList',
  props: ['appVerticalList', 'activeEl'],
  data: function () {
    return {
    }
  },
  methods: {
    onSelectedSetting: function (el) {
      this.activeEl.value = el.value
      this.activeEl.itemId = el.itemId
      this.activeEl.component = el.component
    }
  }
}
</script>

<style scoped>
  div#verticalList h1 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 2em;
    display: inline-block;
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
