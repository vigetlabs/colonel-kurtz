var Server  = require("webpack-dev-server")
var Webpack = require("webpack")
var config  = require('../webpack.config')

config.devtool = 'inline-source-map'

config.entry = [
  "webpack-dev-server/client?http://localhost:8080",
  './example/example.js'
]

config.output = {
  filename: 'example.build.js',
  path: __dirname,
  publicPath: '/'
}

module.exports = new Server(Webpack(config), {
  contentBase: './example',
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: true
}).listen('8080', function() {
  console.log('Colonel Kurtz example is running at http://localhost:8080')
})
