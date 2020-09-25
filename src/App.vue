<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'

  export default {
    name: 'App',
    data: function () {
      return {}
    }
  }
</script>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    scroll-behavior: smooth;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
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

  .card {
    border: none;
  }

  .spinner-border {
    margin-bottom: 0.3rem;
  }

  .H_copyright, .H_imprint {
    display: none;
  }
</style>
