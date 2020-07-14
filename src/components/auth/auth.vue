<template>
  <div id="auth">
    <div id="wrapper">
      <div id="hero-video">
        <video autoplay loop muted playsinline src="@/assets/video/hero-video.mp4"/>
        <div id="form">
          <transition
            mode="out-in"
            type="animation"
            appear
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <keep-alive>
              <component
                :is="component"
                @loadComponent="component=$event">
              </component>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import forgetPass from '@/components/auth/sub/forgetPass'
import signIn from '@/components/auth/sub/signIn'
import signUp from '@/components/auth/sub/signUp'

export default {
  name: 'auth',
  created () {
    this.navigateContent(this.$route.params.component)
  },
  data: function () {
    return {
      component: null
    }
  },
  components: {
    appForgetPassword: forgetPass,
    appSignIn: signIn,
    appSignUp: signUp
  },
  watch: {
    '$route' (to, from) {
      this.navigateContent(to.params.component)
    }
  },
  methods: {
    navigateContent (componenet = 'sign-in') {
      if (!['sign-in', 'sign-up', 'forget-password'].includes(componenet)) {
        this.$router.push({name: 'error'})
        return
      }
      this.component = `app-${componenet}`
    }
  }
}
</script>

<style scoped>
  .animate__animated.animate__fadeOut {
    --animate-duration: 0.9s;
  }

  .animate__animated.animate__fadeIn {
    --animate-duration: 0.9s;
  }

  div#auth div#wrapper {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    z-index: 1;
  }

  div#auth div#hero-video:before {
    content:"";
    z-index:1;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background:linear-gradient(to right, rgba(23, 108, 157, 0.81), rgba(38, 176, 255, 0.38));
  }

  div#auth div#hero-video {
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  div#auth div#form {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 999;
    width: 35vw;
    height: 98vh;
    transform: translate(0%, -50%);
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 5rem;
    background: #ffffff;
    max-height: 100vh;
    overflow: auto;
  }

  @media (max-width: 1230px) {
    div#auth div#form {
      padding-left: 10rem;
      padding-right: 10rem;
      z-index: 999;
      width: 100vw;
      height: 100%;
      border-radius: 0;
      background: #ffffff;
    }
  }

  @media (max-width: 992px) {
    div#auth div#form {
      height: auto;
      padding-left: 7rem;
      padding-right: 7rem;
    }
  }

  @media (max-width: 768px) {
    div#auth div#form {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }

  @media (max-width: 576px) {
    div#auth div#form {
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
