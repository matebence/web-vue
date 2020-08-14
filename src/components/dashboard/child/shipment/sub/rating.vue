<template>
  <div id="rating">
    <h1>Recenzie</h1>
    <button
      type="submit"
      class="btn btn-primary"><font-awesome-icon :icon="['fas', 'plus']"/></button>
  </div>
</template>

<script>
export default {
  name: 'rating'
}
</script>

<style scoped>
  div#rating {
    position: relative;
    height: 360px;
  }

  div#rating h1 {
    margin-top: 1em;
    margin-left: 0.5em;
    font-size: 2em;
    display: inline-block;
  }

  div#rating button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: #176c9d;
    font-size: 0.8em;
    text-align: center;
    color: #ffffff;
    border-color: transparent;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 0.9em;
    width: 3rem;
    height: 3rem;
  }

  div#rating button:hover {
    background: #187fb1;
  }

  div#rating button:disabled {
    background: #095174;
  }
</style>
