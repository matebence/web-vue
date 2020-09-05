<template>
  <div id="signout">
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as types from '@/store/types'

export default {
  created: function () {
    if (this.signIn.accessToken === undefined) this.$router.push('/sign-in')
    return this.$store.dispatch(types.ACTION_SIGN_OUT, {accessToken: this.signIn.accessToken})
      .catch(err => console.warn(err.message))
  },
  name: 'signout',
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      signIn: types.GETTER_SIGN_IN_DATA
    })
  }
}
</script>

<style scoped>
</style>
