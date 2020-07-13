<template>
  <div id="parcel">
    <h1>Balíky</h1>
    <button @click.prevent="component = 'app-create'">
      <font-awesome-icon :icon="['fas', 'plus']"/>
    </button>
    <keep-alive>
      <component :is="component"></component>
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
      component: 'app-list'
    }
  },
  components: {
    appCreate: create,
    appList: list
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
