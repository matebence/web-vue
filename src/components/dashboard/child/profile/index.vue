<template>
  <div id="index">
    <div class="row">
      <div class="col-lg-4 col-xl-3" id="content">
        <app-vertical-list
          :activeEl="components.appSettings.activeEl"
          :appVerticalList="components.appSettings.sub.appVerticalList"/>
      </div>
      <div class="col-lg-8 col-xl-9" id="main-content">
        <keep-alive>
          <component
            :is="components.appSettings.activeEl.component"
            :appMoney="components.appSettings.sub.appMoney"
            :appProfile="components.appSettings.sub.appProfile"
            :appSecurity="components.appSettings.sub.appSecurity"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import bootstrap from 'jquery'

  import money from '@/components/dashboard/child/profile/sub/money'
  import profile from '@/components/dashboard/child/profile/sub/profile'
  import security from '@/components/dashboard/child/profile/sub/security'
  import verticalList from '@/components/dashboard/child/profile/sub/verticalList'

  export default {
    name: 'index',
    data: function () {
      return {
        components: {
          appSettings: {
            sub: {
              appProfile: {
                form: {
                  values: {
                    userName: null,
                    email: null,
                    firstName: null,
                    lastName: null,
                    tel: null,
                    gender: null
                  }
                },
                confirm: {
                  text: null,
                  title: null,
                  button: null
                },
                alert: {
                  condition: [],
                  type: [],
                  text: []
                }
              },
              appVerticalList: {
                items: [
                  {
                    itemId: 1,
                    value: 'Profil',
                    component: 'app-profile',
                    icon: 'user'
                  }, {
                    itemId: 2,
                    value: 'Účet',
                    component: 'app-money',
                    icon: 'wallet'
                  }, {
                    itemId: 3,
                    value: 'Bezpečnosť',
                    component: 'app-security',
                    icon: 'shield-alt'
                  }
                ]
              },
              appSecurity: {
                form: {
                  place: {
                    values: {
                      country: null,
                      region: null,
                      district: null,
                      place: null,
                      street: null,
                      zip: null
                    }
                  },
                  credentials: {
                    values: {
                      confirmPassword: null,
                      password: null
                    }
                  }
                },
                confirm: {
                  text: null,
                  title: null,
                  button: null
                },
                alert: {
                  condition: [],
                  type: [],
                  text: []
                }
              },
              appMoney: {
                form: {
                  card: {
                    values: {
                      name: '',
                      number: '',
                      month: '',
                      year: '',
                      cvv: '',
                      amount: ''
                    }
                  },
                  bank: {
                    values: {
                      number: '',
                      amount: ''
                    }
                  }
                },
                placeHolder: {
                  year: new Date().getFullYear(),
                  standard: '#### #### #### ####',
                  iban: 'AA## #### #### #### ####'
                },
                is: {
                  flip: false,
                  focus: false
                },
                confirm: {
                  text: null,
                  title: null,
                  button: null
                },
                alert: {
                  condition: [],
                  type: [],
                  text: []
                }
              }
            },
            activeEl: {
              itemId: 1,
              component: 'app-profile'
            }
          }
        }
      }
    },
    components: {
      appMoney: money,
      appProfile: profile,
      appSecurity: security,
      appVerticalList: verticalList
    },
    methods: {
      removeParcel: function (applied) {
      },
      showAppliedModal: function () {
        return bootstrap('#parcelApply').modal('show')
      }
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
