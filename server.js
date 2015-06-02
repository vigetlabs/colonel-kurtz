var Server  = require("webpack-dev-server")
var Webpack = require("webpack")
var config  = require('../webpack.config')

config.devtool = '#eval-source-map'

config.entry = [
  "webpack-dev-server/client?http://localhost:8080",
  'webpack/hot/only-dev-server',
  './example/example.js'
]

config.plugins = [ new Webpack.HotModuleReplacementPlugin() ]

config.output = {
  filename: 'example.build.js',
  path: __dirname,
  publicPath: '/'
}

config.module.loaders.unshift(
  {
    test    : /\.jsx*$/,
    exclude : /node_modules/,
    loader  : 'react-hot'
  }
)

module.exports = new Server(Webpack(config), {
  contentBase: './example',
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: true
}).listen('8080', function() {
  console.log('Colonel Kurtz example is running at http://localhost:8080')
})
