<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-vertical-list
          :activeEl="components.appMessage.activeEl"
          :userData="components.appMessage.data.user"
          :accountData="components.appMessage.data.account"
          :appVerticalList="components.appMessage.sub.appVerticalList"/>
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <app-message
          :activeEl="components.appMessage.activeEl"
          :accountData="components.appMessage.data.account"
          :appMessage="components.appMessage.sub.appMessage"/>
      </div>
    </div>
  </div>
</template>

<script>
  import verticalList from '@/components/dashboard/child/message/sub/verticalList'
  import message from '@/components/dashboard/child/message/sub/message'

  export default {
    created: function () {
      let accountData = localStorage.getItem(process.env.LOCAL_STORAGE_ACCOUNT_DATA)
      if (!accountData) return
      this.components.appMessage.data.account = JSON.parse(accountData)
    },
    name: 'index',
    data: function () {
      return {
        components: {
          appMessage: {
            sub: {
              appVerticalList: {
                form: {
                  visible: true
                }
              },
              appMessage: {
                form: {
                  conversation: null
                }
              }
            },
            data: {
              user: {
                search: {}
              },
              account: {}
            },
            activeEl: {
              conversationId: 0
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
