<template>
  <div id="auth">
    from auth
    <app-signin></app-signin>
    <app-signup></app-signup>
  </div>
</template>

<script>
import signin from '@/components/auth/signin'
import signup from '@/components/auth/signup'

export default {
  name: 'auth',
  components: {
    appSignin: signin,
    appSignup: signup
  }
}
</script>

<style scoped>
</style>
