<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <app-navigation></app-navigation>
        </div>
        <div class="col-lg-11 col-xl-10" id="wrapper">
          <div class="row">
            <div class="col-lg-4 col-xl-3" id="content">
              <app-parcel></app-parcel>
            </div>
            <div class="col-lg-8 col-xl-9" id="main-content">
              <app-courier></app-courier>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/dashboard/child/navigation'
import courier from '@/components/dashboard/child/parcel/courier'
import parcel from '@/components/dashboard/child/parcel'

export default {
  name: 'dashboard',
  components: {
    appNavigation: navigation,
    appCourier: courier,
    appParcel: parcel
  }
}
</script>

<style scoped>
  div#dashboard {
    background: #176c9d;
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  div#dashboard div#main-content,
  div#dashboard div#navigation,
  div#dashboard div#content {
    width: 100%;
    height: 98vh;
  }

  div#dashboard div#navigation {
    background: #176c9d;
  }

  div#dashboard div#wrapper {
    border: 0.3rem #176c9d solid;
    border-radius: 3rem;
    background: #f1f1f1;
  }

  div#dashboard div#content {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#dashboard div#main-content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
  }

  @media (max-width: 992px) {
    div#dashboard div#main-content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
