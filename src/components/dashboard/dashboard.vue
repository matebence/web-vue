<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <app-navigation :activeEl = "components.appDashboard.navigation.activeEl" />
        </div>
        <div class="col-lg-11 col-xl-10" id="wrapper">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'
import navigation from '@/components/dashboard/child/navigation/index'

export default {
  created: function () {
    if (this.userProfile.userId === undefined) {
      this.components.appDashboard.navigation.activeEl = {itemId: 6, value: 'Nastavenia'}
      this.$router.push({path: '/dashboard/settings'})
    } else if (this.allowedRoles.includes(process.env.APP_ROLE_CLIENT)) {
      this.components.appDashboard.navigation.activeEl = {itemId: 1, value: 'Balíky'}
      this.$router.push({path: '/dashboard/parcel'})
    } else if ([...this.allowedRoles].includes(process.env.APP_ROLE_COURIER)) {
      this.components.appDashboard.navigation.activeEl = {itemId: 3, value: 'Klienti'}
      this.$router.push({path: '/dashboard/client'})
    } else {
      this.$router.push({path: '/sign-out'})
    }
  },
  name: 'dashboard',
  data: function () {
    return {
      components: {
        appDashboard: {
          navigation: {
            activeEl: {
            }
          }
        }
      }
    }
  },
  components: {
    appNavigation: navigation
  },
  computed: {
    ...mapGetters({
      userProfile: types.GETTER_USER_DATA_GET,
      allowedRoles: types.GETTER_SIGN_IN_GET_ROLE
    })
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
