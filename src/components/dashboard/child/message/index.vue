<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-vertical-list
          :userData="components.appMessage.data"
          :activeEl="components.appMessage.activeEl" />
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-message />
      </div>
    </div>
  </div>
</template>

<script>
import message from '@/components/dashboard/child/message/sub/message'
import verticalList from '@/components/dashboard/child/message/sub/verticalList'

export default {
  name: 'index',
  data: function () {
    return {
      components: {
        appMessage: {
          sub: {
          },
          data: {
            user: {
              search: {
              }
            }
          },
          activeEl: {
            participentId: 0
          }
        }
      }
    }
  },
  components: {
    appMessage: message,
    appVerticalList: verticalList
  }
}
</script>

<style scoped>
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
