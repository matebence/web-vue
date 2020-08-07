<template>
  <div id="dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1 col-xl-2" id="navigation">
          <app-navigation
            :activeEl = "navigation.activeEl" />
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
import navigation from '@/components/dashboard/child/navigation'

export default {
  created: function () {
    if ([...this.allowedRoles].includes(process.env.APP_ROLE_CLIENT)) {
      this.navigation.activeEl.nav = {itemId: 1, value: 'Balíky'}
      this.$router.push({path: '/dashboard/parcel'})
    } else if ([...this.allowedRoles].includes(process.env.APP_ROLE_COURIER)) {
      this.navigation.activeEl.nav = {itemId: 3, value: 'Klienti'}
      this.$router.push({path: '/dashboard/client'})
    } else {
      this.$router.push({path: '/sign-in'})
    }
  },
  name: 'dashboard',
  data: function () {
    return {
      navigation: {
        activeEl: {
          nav: {
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
