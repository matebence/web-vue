<template>
  <div id="parcel">
    <h1>Balíky</h1>
    <button
      @click="selectedComponent = manageComponenets()">
      <font-awesome-icon
        :icon="['fas', selectedIcon]"/>
    </button>
    <keep-alive>
      <component
        :is="selectedComponent"
        @parcelCreated="
          selectedComponent = $event.component;
          selectedIcon = $event.icon"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import list from '@/components/dashboard/sub/package/list'
import create from '@/components/dashboard/sub/package/create'

export default {
  name: 'parcel',
  data: function () {
    return {
      selectedComponent: 'app-list',
      selectedIcon: 'plus',
      components: {
        appList: {
          name: 'app-list',
          icon: 'plus'
        },
        appCreate: {
          name: 'app-create',
          icon: 'angle-left'
        }
      }
    }
  },
  components: {
    appCreate: create,
    appList: list
  },
  methods: {
    manageComponenets: function () {
      if (this.selectedComponent === this.components.appCreate.name) {
        this.selectedIcon = this.components.appList.icon
        return this.components.appList.name
      }
      if (this.selectedComponent === this.components.appList.name) {
        this.selectedIcon = this.components.appCreate.icon
        return this.components.appCreate.name
      }
    }
  }
}
</script>

<style scoped>
  div#parcel h1 {
    margin-top: 1em;
    font-size: 2em;
    display: inline-block;
  }

  div#parcel button {
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

  div#parcel button:hover {
    background: #187fb1;
  }

  div#parcel button:focus {
    outline: 0;
  }

  div#parcel button svg {
    font-size: 0.8em;
    color: #ffffff;
  }
</style>
