var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: {
    'colonel-kurtz'  : './src/index.js',
    'addons/medium'  : './addons/medium/index.js',
    'addons/image'   : './addons/image/index.js',
    'addons/youtube' : './addons/youtube/index.js'
  },

  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  externals: {
    'react' : 'react',
    'diode' : 'diode',
    'diode/stateful' : 'diode/stateful',
    'react/lib/ReactCSSTransitionGroup' : 'react/lib/ReactCSSTransitionGroup'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons']
  },

  plugins: [
    new ExtractTextPlugin("colonel-kurtz.css")
  ],

  module: {
    loaders: [
      {
        test    : /\.s*(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
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
}
