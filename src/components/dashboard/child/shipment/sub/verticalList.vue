<template>
  <div id="list">
    <ul class="tabs">
      <li
        v-bind:key="option.id"
        @click.prevent="selectedOption(option)"
        v-for="option in tab.items"
        :class="{active: activeEl.tabs.tabId === option.itemId}">{{option.value}}</li>
    </ul>
    <ul class="shipments">
      <li
        v-bind:key="item._id"
        @click.prevent="selectedShipment(item)"
        v-for="item in search"
        :class="{active: activeEl.shipments.shipmentId === item._id}">
        <ul class="shipment">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'dolly']"/>
          </li>
          <li>
            <ul>
              <li class="from">{{item.from.split(',').pop()}} - {{item.to.split(',').pop()}}</li>
              <li class="status">{{item.status.name}}</li>
              <li class="number">{{item._id}}</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['activeEl', 'search'],
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
    },
    selectedShipment: function (el) {
      this.activeEl.shipments.shipmentId = el.id
    }
  }
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

  div#list ul.shipments li ul.shipment ul {
    text-align: left;
  }

  div#list ul.shipments li ul.shipment ul li {
    margin-left: 1rem;
  }

  div#list ul.shipments li:hover,
  div#list ul.shipments li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#list ul.shipments li ul.shipment {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#list ul.shipments li ul.shipment li.image {
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

  div#list ul.shipments li ul.shipment li ul li.number,
  div#list ul.shipments li ul.shipment li ul li.status,
  div#list ul.shipments li ul.shipment li ul li.from {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }
</style>
