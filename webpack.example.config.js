var Webpack = require('webpack')
var config  = Object.create(require('./webpack.config'))

config.devtool = '#eval-source-map'

config.entry = [
  "webpack-dev-server/client?http://localhost:8080",
  'webpack/hot/dev-server',
  './example/example.js'
]

config.externals = {}

config.plugins.push(
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
)

config.module.loaders.unshift({
  exclude : /node_modules/,
  test    : /\.jsx*$/,
  loader  : 'react-hot'
})

config.output = {
  filename : 'example.build.js',
  path     : './example'
}

module.exports = config
