'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/h5/api"',
  IMAGE_ROOT:'"http://192.168.147.62:9980/"',
  PAY_ROOT: '"/pay/api"',
  SHARE_ROOT: '"https://emarking-wap.vip-jb.com/"'
})
