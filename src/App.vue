<template>
  <div id="app">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <router-view/>
    </transition>
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

  p, a, li, input, select, option, textarea, label, button, small{
    font-family: Palanquin-Medium, sans-serif;
  }

  a, a:hover{
    text-decoration: none;
  }

  input, select, option, textarea {
    box-shadow: none !important;
    outline: 0 !important;
  }

  .animate__animated.animate__backOutLeft,
  .animate__animated.animate__fadeIn,
  .animate__animated.animate__backOutLeft,
  .animate__animated.animate__fadeOut {
    --animate-duration: 0.3s;
  }

  .spinner-border{
    margin-bottom: 0.3rem;
  }
</style>
