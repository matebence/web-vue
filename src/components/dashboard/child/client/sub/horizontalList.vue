<template>
  <div id="horizontalList">
    <h1>Navigácia</h1>
    <div id="list">
      <ul class="actions"
          v-show="!isSelected">
        <li>
          <ul class="action">
            <li><font-awesome-icon :icon="['fas', 'map-marker-alt']"/></li>
            <li>Navigácia je pripravená na použitie. Zvoľte zásielku pre spustenie inštrukcií.</li>
          </ul>
        </li>
      </ul>
      <ul class="actions"
        v-show="isSelected">
        <li
          :key="item.length"
          v-for="item in action">
          <ul class="action">
            <li><font-awesome-icon :icon="['fas', formatIcon(item.action, item.direction)]"/></li>
            <li>{{item.instruction}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'horizontalList',
  props: ['action', 'activeEl'],
  computed: {
    isSelected: function () {
      return this.activeEl.shipmentId !== 0
    }
  },
  methods: {
    formatIcon: function (action, direction = '') {
      switch (`${action} ${direction}`.trim()) {
        case 'depart':
          return 'map-marker-alt'
        case 'turn right':
          return 'chevron-circle-right'
        case 'turn left':
          return 'chevron-circle-left'
        case 'keep right':
          return 'chevron-circle-right'
        case 'keep left':
          return 'chevron-circle-left'
        case 'continue':
          return 'chevron-circle-up'
        case 'roundaboutExit right':
          return 'sync-alt'
        case 'roundaboutExit left':
          return 'sync-alt'
        case 'roundaboutPass right':
          return 'sync-alt'
        case 'roundaboutPass left':
          return 'sync-alt'
        case 'exit left':
          return 'times-circle'
        case 'exit right':
          return 'times-circle'
        case 'ramp left':
          return 'times-circle'
        case 'ramp right':
          return 'times-circle'
        case 'arrive':
          return 'map-marker-alt'
      }
    }
  }
}
</script>

<style scoped>
  div#horizontalList {
    height: 210px;
  }

  div#horizontalList h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  div#horizontalList ul.actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    text-align: center;
    width: 100%;
    overflow: auto;
    height: 7rem;
  }

  div#horizontalList ul.actions li {
    margin-right: 0.3rem;
    display: flex;
    justify-content: center;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
    font-size: 0.95em;
    width: 17rem;
    height: fit-content;
    word-break: break-all;
  }

  div#horizontalList ul.actions li ul.action li [data-letters]:before {
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

  div#horizontalList ul.actions li ul.action li svg {
    font-size: 2.5em;
    color: #176c9d;
  }

  @media (max-width: 400px) {
    div#horizontalList {
      height: 275px;
    }
  }
</style>
