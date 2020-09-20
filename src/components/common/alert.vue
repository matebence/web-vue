<template>
  <div id="alert">
    <div
      :class="getType.pop()"
      class="alert" role="alert"
      v-show="getCondition">
      <p class="text-center">{{getText.pop()}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alert',
    props: ['type', 'condition', 'text'],
    data: function () {
      return {
        components: {
          appAlert: {}
        }
      }
    },
    computed: {
      getCondition: function () {
        return [...this.condition].some(e => e === true)
      },
      getText: function () {
        return [...this.text].filter(e => e !== null)
      },
      getType: function () {
        return [...this.type].filter(e => e !== null)
      }
    }
  }
</script>

<style scoped>
  div#alert .alert {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 50%;
    width: 75%;
    transform: translateX(-50%);
    border: 0.5rem white solid;
    border-radius: 2rem;
  }

  div#alert .alert p {
    font-size: 0.9em;
  }
</style>
