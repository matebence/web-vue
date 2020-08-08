<template>
  <div id="shipmentList">
    <ul class="tabs">
      <li
        v-bind:key="option.id"
        @click.prevent="selectedOption(option)"
        v-for="option in tab.items"
        :class="{active: activeEl.tabs.tabId === option.itemId}">{{option.value}}</li>
    </ul>
    <ul class="shipments">
      <li>
        <ul class="shipment">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'dolly']"/>
          </li>
          <li>
            <ul>
              <li class="from">Veľké Lovce - Radava</li>
              <li class="status">Registrované dopravcom</li>
              <li class="number">5f2e792efec03d67bf8d9dcd</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'shipmentList',
  props: ['activeEl'],
  data: function () {
    return {
      tab: {
        items: [
          {
            itemId: 1,
            value: 'Vlastné'
          },
          {
            itemId: 2,
            value: 'Ostatné'
          },
          {
            itemId: 3,
            value: 'Všetky'
          }
        ]
      }
    }
  },
  methods: {
    selectedOption: function (el) {
      this.activeEl.tabs.tabId = el.itemId
      this.activeEl.tabs.value = el.value
    }
  }
}
</script>

<style scoped>
  div#shipmentList ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#shipmentList ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#shipmentList ul.tabs li:hover,
  div#shipmentList ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;
  }

  div#shipmentList ul.shipments li ul.shipment ul {
    text-align: left;
  }

  div#shipmentList ul.shipments li ul.shipment ul li {
    margin-left: 1rem;
  }

  div#shipmentList ul.shipments li:hover,
  div#shipmentList ul.shipments li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#shipmentList ul.shipments li ul.shipment {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#shipmentList ul.shipments li ul.shipment li.image {
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

  div#shipmentList ul.shipments li ul.shipment li ul li.number,
  div#shipmentList ul.shipments li ul.shipment li ul li.status,
  div#shipmentList ul.shipments li ul.shipment li ul li.from {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }
</style>
