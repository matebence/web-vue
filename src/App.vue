<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {}
    }
  }
</script>

<style>
  html {
    scroll-behavior: smooth;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1, h2, h3 {
    font-family: Palanquin-Bold, sans-serif;
  }

  h4, h5, h6 {
    font-family: Palanquin-Regular, sans-serif;
  }

  a, a:hover {
    text-decoration: none;
    font-family: Palanquin-Medium, sans-serif;
  }

  p, li, label, small,
  input, select, option, textarea, button {
    font-family: Palanquin-Medium, sans-serif;
  }

  input, select, option, textarea {
    box-shadow: none !important;
    outline: 0 !important;
  }

  input[type=number],
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  div.H_imprint {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.2rem;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #166085;
  }
</style>
