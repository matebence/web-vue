<template>
  <div id="auth">
    <div class="row no-gutters h-100">
      <div class="col-lg-7" style="background-color: #ffffff">
        <transition appear enter-class=""
                    enter-active-class="animate__animated animate__backInLeft"
                    leave-class=""
                    leave-active-class="animate__animated animate__backOutRight">
          <div id="hero-img"></div>
        </transition>
      </div>
      <div class="col-lg-5 my-auto">
        <transition mode="out-in"
                    type="animation"
                    appear enter-class=""
                    enter-active-class="animate__animated animate__backInRight"
                    leave-class=""
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
import forgetpass from '@/components/auth/forgetpass'
import signin from '@/components/auth/signin'
import signup from '@/components/auth/signup'

export default {
  name: 'auth',
  created () {
    this.navigateContent(this.$route.params.component)
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
  },
  data () {
    return {
      options: null
    }
  },
  components: {
    appSignIn: signin,
    appSignUp: signup,
    appForgetPassword: forgetpass
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

  div#hero-img {
    background: url("~@/assets/img/hero-img.png") no-repeat;
    background-position: center center;
    background-size: 80%;
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 992px) {
    div#hero-img {
      display: none;
    }
  }
</style>
