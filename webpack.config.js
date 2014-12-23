var WebPack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  debug   : true,
  devtool : 'source-map',

  entry: {
    'colonel-kurtz'  : './src/index.js',
    'addons/medium'  : './addons/medium/index.js',
    'addons/image'   : './addons/image/index.js',
    'addons/youtube' : './addons/youtube/index.js'
  },

  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    'react'        : 'react',
    'react/addons' : 'react/addons'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons']
  },

  plugins: [
    new ExtractTextPlugin("colonel-kurtz.css"),
    new WebPack.DefinePlugin({
      '__DEV__' : process.env.NODE_ENV !== 'production'
    })
  ],

  module: {
    loaders: [
      {
        test    : /\.s*(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
      },
      {
        test    : /\.jsx*$/,
        loader  : 'envify-loader'
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'jsx-loader',
        query   : {
          harmony: true,
          stripTypes: true
        }
      },
      {
        test    : /\.json$/,
        loader  : 'json-loader'
      }
    ]
  }
}
