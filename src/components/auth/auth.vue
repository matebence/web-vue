<template>
  <div id="auth">
    <div class="row no-gutters">
      <div class="col-lg-7">
        <div id="hero-img"></div>
      </div>
      <div class="col-lg-5" id="form">
        <transition
          mode="out-in"
          type="animation"
          appear
          enter-active-class="animate__animated animate__backInRight"
          leave-active-class="animate__animated animate__backOutLeft">
          <keep-alive>
            <component :is="options" @loadComponent="options= $event"></component>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import forgetpass from '@/components/auth/sub/forgetpass'
import signin from '@/components/auth/sub/signin'
import signup from '@/components/auth/sub/signup'

export default {
  name: 'auth',
  created () {
    this.navigateContent(this.$route.params.component)
  },
  data: function () {
    return {
      options: null
    }
  },
  components: {
    appSignIn: signin,
    appSignUp: signup,
    appForgetPassword: forgetpass
  },
  watch: {
    '$route' (to, from) {
      this.navigateContent(to.params.component)
    }
  },
  methods: {
    navigateContent (componenet) {
      if (!['sign-in', 'sign-up', 'forget-password'].includes(componenet)) {
        this.$router.push({name: 'error'})
        return
      }
      this.options = `app-${componenet}`
    }
  }
}
</script>

<style scoped>
  .animate__animated.animate__backOutLeft, .animate__animated.animate__backOutRight {
    --animate-duration: 1s;
  }

  .animate__animated.animate__backInRight, .animate__animated.animate__backInLeft {
    --animate-duration: 0.9s;
  }

  div#form {
    overflow: auto;
    height: 100vh;
    background: #fcfcfc;
  }

  div#hero-img {
    background: url("~@/assets/img/hero-img.jpg") no-repeat;
    background-position: center center;
    background-size: cover;
    box-shadow: inset 0 0 0 1000px rgba(23, 108, 157, 0.90);
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 992px) {
    div#hero-img {
      display: none;
    }
  }
</style>
