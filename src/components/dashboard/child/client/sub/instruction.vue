<template>
  <div id="instruction">
    <h1>Navigácia</h1>
    <app-horizontal-list />
  </div>
</template>

<script>
import horizontalList from '@/components/dashboard/child/client/sub/horizontalList'

export default {
  name: 'instruction',
  components: {
    appHorizontalList: horizontalList
  }
}
</script>

<style scoped>
  div#instruction {
    height: 220px;
    width: fit-content;
  }

  div#instruction h1 {
    margin-top: 2rem;
    margin-left: 1rem;
    font-size: 2em;
    display: inline-block;
  }

  @media (max-width: 400px) {
    div#instruction {
      height: 275px;
    }
  }
</style>
