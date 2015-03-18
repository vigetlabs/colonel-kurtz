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
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.svg'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons', 'assets', 'vendor', '.' ]
  },

  plugins: [
    new ExtractTextPlugin("colonel-kurtz.css", {
      disable: process.env.NODE_ENV !== 'production'
    })
  ],

  postcss: [
    require('autoprefixer-core'),
    require('css-mqpacker'),
    require('csswring')
  ],

  module: {
    loaders: [
      {
        test: /\.(svg)$/,
        loader: 'raw'
      },
      {
        test    : /\.s*(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'source-map!babel-loader?experimental&loose'
      },
      {
        test    : /\.json$/,
        loader  : 'json'
      }
    ],
    postLoaders: [
      {
        test    : /\.jsx*$/,
        loader  : 'envify-loader'
      }
    ]
  }
}
