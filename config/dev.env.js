'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  HOST_IP_API: '"http://ip-api.com"',
  HOST_IPIFY: '"https://api.ipify.org"',
  HOST_BLESK: '"http://192.168.99.100:8765"',
  HOST_BLESK_WEBSOCKET: '"http://192.168.99.100:8765/websocket"',

  GRANT_TYPE_PASSWORD: '"password"',
  GRANT_TYPE_REFRESH_TOKEN: '"refresh_token"',

  PARCEL_NEW_STATUS_ID: '"5edf8982ca0d9d132cd3b8dd"',
  PARCEL_DONE_STATUS_ID: '"5edf8982ca0d9d132cd3b8e2"',
  PARCEL_RATED_STATUS_ID: '"5edf8982ca0d9d132cd3b8e1"',
  COMPANY_PRICE_PROFIT_ID: '"5ef89dcd56f69d17643556e8"',
  PARCEL_ACCEPTED_STATUS_ID: '"5edf8982ca0d9d132cd3b8df"',

  APP_ROLE_CLIENT: '"ROLE_CLIENT"',
  APP_ROLE_COURIER: '"ROLE_COURIER"',

  APP_STATUS_ONLINE: '"ONLINE"',
  APP_STATUS_OFFLINE: '"OFFLINE"',

  WEBSOCKET_PREFIX: '"/websocket-service"',

  WEBSOCKET_STATUS_CHANEL_POSTFIX: '""',
  WEBSOCKET_CONVERSATION_CHANEL_POSTFIX: '"/sendConversation"',
  WEBSOCKET_COMMUNICATION_CHANEL_POSTFIX: '"/sendCommunication"',

  WEBSOCKET_STATUS_ENDPOINT: '"/status"',
  WEBSOCKET_CONVERSATION_ENDPOINT: '"/conversation"',
  WEBSOCKET_COMMUNICATION_ENDPOINT: '"/communication"',

  WEBSOCKET_STATUS_CHANEL: '"/state"',
  WEBSOCKET_CONVERSATION_CHANEL: '"/conversation"',
  WEBSOCKET_COMMUNICATION_CHANEL: '"/communication"',

  LOCAL_STORAGE_ACCOUNT_DATA: '"accountData"',
  LOCAL_STORAGE_BROWSER_DATA: '"browserData"',

  CLIENT_ID: '"8de4dc56-6e96-11ea-bc55-0242ac130003"',
  CLIENT_SECRET: '"04ed73c86f2d48e9789fa2d2bae6acf78bcd9b431d676e5f6d9c9c9a28de29a3"',

  HERE_JS_SDK_API: '"cg148a7i1R6OXqhpPmkHUBvCr07I-qJKX_Cf2qpo_KU"'
})
