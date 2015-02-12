var Webpack  = require('webpack')
var defaults = require('./webpack.config')

module.exports = {
  devtool: 'inline-source-map',

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
