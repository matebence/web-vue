<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <div
          v-show="isSelected"
          id="modify">
          <button
            @click.prevent="components.appMessage.activeEl.conversationId = 0">
            <font-awesome-icon
              :icon="['fas', 'ban']"/>
          </button>
        </div>
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
  import message from '@/components/dashboard/child/message/sub/message'
  import verticalList from '@/components/dashboard/child/message/sub/verticalList'

  export default {
    created: function () {
      let accountData = localStorage.getItem('accountData')
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
    },
    computed: {
      isSelected: function () {
        return this.components.appMessage.activeEl.conversationId !== 0
      }
    }
  }
</script>

<style scoped>
  div#index div#modify {
    display: inline;
    float: right;
    margin-top: 1rem;
  }

  div#index div#modify button {
    display: inline;
    text-align: right;
    margin-top: 1.3rem;
    margin-right: 0.5rem;
    background: #176c9d;
    border: none;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.3rem;
    text-align: center;
    font-size: 0.9em;
  }

  div#index div#modify button:hover {
    background: #187fb1;
  }

  div#index div#modify button:focus {
    outline: 0;
  }

  div#index div#modify button svg {
    font-size: 0.8em;
    color: #ffffff;
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
