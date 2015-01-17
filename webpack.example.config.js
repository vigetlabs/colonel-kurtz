var Webpack  = require('webpack')
var defaults = require('./webpack.config')

module.exports = {
  entry : {
    'example.build' : './example/example.js'
  },

  output : {
    path     : './example',
    filename : '[name].js'
  },

  resolve : defaults.resolve,
  plugins : defaults.plugins,
  module  : defaults.module
}
