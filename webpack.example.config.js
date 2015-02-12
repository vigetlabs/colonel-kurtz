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
  plugins : []
  module: {
    loaders: [
      {
        test    : /\.s*(c|a)ss$/,
        loader  : 'style!css!autoprefixer!sass')
    },
    {
      test    : /\.jsx*$/,
      loader  : 'envify-loader'
    },
    {
      test    : /\.jsx*$/,
      exclude : /node_modules/,
      loader  : '6to5?experimental',
    },
    {
      test    : /\.json$/,
      loader  : 'json'
    }
  ]
}
