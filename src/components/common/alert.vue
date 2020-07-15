<template>
  <div id="alert">
    <transition
      mode="out-in"
      type="animation"
      appear
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div
        :class="getType.pop()"
        class="alert" role="alert"
        v-show="getCondition">
        <p class="text-center">
          {{ getContent.pop() }}
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'alert',
  props: ['type', 'condition', 'content'],
  computed: {
    getCondition: function () {
      return this.condition.some(e => e === true)
    },
    getContent: function () {
      return this.content.filter(e => e !== null)
    },
    getType: function () {
      return this.type.filter(e => e !== null)
    }
  }
}
</script>

<style scoped>
  .alert {
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 50%;
    width: 75%;
    transform: translateX(-50%);
    border: 0.5rem white solid;
    border-radius: 2rem;
  }

  .alert p {
    font-size: 0.9em;
  }
</style>
