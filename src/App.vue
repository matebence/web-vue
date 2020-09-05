<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import '@/assets/fonts/fonts.css'
import '@/assets/css/reset.css'

export default {
  created: function () {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.onLocationSuccess)
  },
  name: 'App',
  methods: {
    onLocationSuccess: function (position) {
      const userPosition = `${position.coords.latitude},${position.coords.longitude},${position.coords.accuracy}`
      localStorage.setItem('position', userPosition)
    }
  }
}
</script>

<style>
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

  html {
    scroll-behavior: smooth;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1, h2, h3{
    font-family: Palanquin-Bold, sans-serif;
  }

  h4, h5, h6 {
    font-family: Palanquin-Regular, sans-serif;
  }

  a, a:hover{
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

  .card {
    border: none;
  }

  .spinner-border{
    margin-bottom: 0.3rem;
  }

  .H_copyright, .H_imprint {
    display: none;
  }
</style>
