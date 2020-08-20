<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <h1>Nastavenia</h1>
        <app-vertical-list />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-money />
      </div>
    </div>
  </div>
</template>

<script>
import money from '@/components/dashboard/child/profile/sub/money'
import profil from '@/components/dashboard/child/profile/sub/profil'
import security from '@/components/dashboard/child/profile/sub/security'
import verticalList from '@/components/dashboard/child/profile/sub/verticalList'

export default {
  name: 'index',
  components: {
    appMoney: money,
    appProfil: profil,
    appSecurity: security,
    appVerticalList: verticalList
  }
}
</script>

<style scoped>
  div#index h1 {
    margin-top: 2rem;
    font-size: 2em;
    display: inline-block;
  }

  div#index div#main-content,
  div#index div#content {
    width: 100%;
    height: 98vh;
  }

  div#index div#content {
    border-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    height: 98vh;
    overflow: auto;
  }

  div#index div#main-content {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    border: 0.5rem #f1f1f1 solid;
    background: #ffffff;
    padding: 0;
    height: 98vh;
  }

  @media (max-width: 992px) {
    div#index div#main-content {
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
