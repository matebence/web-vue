<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <app-navigation></app-navigation>
        </div>
        <div class="col-lg-11 col-xl-10" id="wrapper">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '@/components/dashboard/child/navigation'

export default {
  name: 'dashboard',
  components: {
    appNavigation: navigation
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

  div#dashboard div#wrapper {
    border: 0.3rem #176c9d solid;
    border-radius: 3rem;
    background: #f1f1f1;
  }

  div#dashboard div#navigation {
    width: 100%;
    height: 98vh;
  }

  div#dashboard div#navigation {
    background: #176c9d;
  }
</style>
