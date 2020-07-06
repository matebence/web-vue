'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  HOST: '"http://192.168.99.100:8765"',

  GRANT_TYPE_PASSWORD: '"password"',
  GRANT_TYPE_REFRESH_TOKEN: '"refresh_token"',

  CLIENT_ID: '"8de4dc56-6e96-11ea-bc55-0242ac130003"',
  CLIENT_SECRET: '"04ed73c86f2d48e9789fa2d2bae6acf78bcd9b431d676e5f6d9c9c9a28de29a3"'
})
