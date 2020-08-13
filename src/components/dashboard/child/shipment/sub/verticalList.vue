<template>
  <div id="verticalList">
    <ul class="tabs">
      <li
        :key="option.id"
        @click.prevent="onSelectedOption(option)"
        v-for="option in tab.items"
        :class="{active: activeEl.tabs.tabId === option.itemId}">{{option.value}}</li>
    </ul>
    <ul class="shipments">
      <li
        :key="item._id"
        @click.prevent="onSelectedShipment(item)"
        v-for="item in shipment"
        :class="{active: activeEl.shipments.shipmentId === item._id}">
        <ul class="shipment">
          <li class="image">
            <font-awesome-icon :icon="['fas', 'dolly']"/>
          </li>
          <li>
            <ul>
              <li class="status">{{item.status.name}}</li>
              <li class="from">{{item.from.split(',').pop()}} - {{item.to.split(',').pop()}}</li>
              <li class="number">{{item._id}}</li>
            </ul>
          </li>
        </ul>
      </li>

      <li
        class="empty-list"
        v-if="Object.keys(shipment).length === 0 && activeEl.tabs.value === tab.items[0].value">
        Zoznam je prázdny
      </li>
      <li
        class="empty-list"
        v-if="Object.keys(shipment).length === 0 && activeEl.tabs.value === tab.items[1].value">
        Zoznam je prázdny
      </li>
      <li
        class="empty-list"
        v-if="Object.keys(shipment).length === 0 && activeEl.tabs.value === tab.items[2].value">
        Zoznam je prázdny
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'verticalList',
  props: ['activeEl', 'shipment'],
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
    onSelectedOption: function (el) {
      this.activeEl.tabs.tabId = el.itemId
      this.activeEl.tabs.value = el.value
    },
    onSelectedShipment: function (el) {
      this.activeEl.shipments.shipmentId = el._id
    }
  }
}
</script>

<style scoped>
  div#verticalList ul.tabs {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 102%;
  }

  div#verticalList ul.tabs li {
    display: inline;
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    color: #a5a3a5;
  }

  div#verticalList ul.tabs li:hover,
  div#verticalList ul.tabs li.active {
    background: #176c9d;
    border-radius: 5rem;
    color: #ffffff;
    cursor: pointer;
  }

  div#verticalList ul.shipments li ul.shipment ul {
    text-align: left;
  }

  div#verticalList ul.shipments li ul.shipment ul li {
    margin-left: 1rem;
  }

  div#verticalList ul.shipments li.empty-list {
    text-align: center;
    font-size: 1em;
    margin-top: 3rem;
  }

  div#verticalList ul.shipments li:hover,
  div#verticalList ul.shipments li.active {
    background: #f1f1f1;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  div#verticalList ul.shipments li.empty-list:hover {
    cursor: auto;
    background: none;
  }

  div#verticalList ul.shipments li ul.shipment {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
  }

  div#verticalList ul.shipments li ul.shipment li.image {
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

  div#verticalList ul.shipments li ul.shipment li ul li.number,
  div#verticalList ul.shipments li ul.shipment li ul li.status,
  div#verticalList ul.shipments li ul.shipment li ul li.from {
    font-size: 0.9em;
    font-weight: 400;
    color: #000000;
  }
</style>
