<template>
  <div id="shipment">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shipment'
}
</script>

<style scoped>
  div#shipment div#main-content,
  div#shipment div#content {
    width: 100%;
    height: 98vh;
  }

  div#shipment div#content {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#shipment div#main-content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    padding: 0;
    height: 98vh;
  }

  @media (max-width: 992px) {
    div#shipment div#main-content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
