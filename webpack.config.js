var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
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
    'react'        : 'react',
    'react/addons' : 'react/addons'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons']
  },

  plugins: [
    new ExtractTextPlugin("colonel-kurtz.css"),
    new Webpack.DefinePlugin({
      "__DEV__": process.env.NODE_ENV === 'development'
    }),
    new Webpack.ProvidePlugin({
      to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
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
        loader  : '6to5?experimental&runtime&modules=common',
      },
      {
        test    : /\.json$/,
        loader  : 'json-loader'
      }
    ]
  }
}
