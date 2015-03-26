var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: {
    'colonel-kurtz'  : './src/index.js',
    'addons/medium'  : './addons/medium/index.jsx',
    'addons/image'   : './addons/image/index.jsx',
    'addons/youtube' : './addons/youtube/index.jsx'
  },

  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  externals: {
    'react' : 'react',
    'react/addons' : 'react/addons',
    'react/lib/ReactCSSTransitionGroup' : 'react/lib/ReactCSSTransitionGroup'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.svg'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons', 'assets', 'vendor', '.' ]
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env' : {
        'VERSION'  : JSON.stringify(require('./package').version),
        'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
      }
    }),
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
        test    : /\.json$/,
        loader  : 'json'
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel?experimental'
      },
      {
        test: /\.(svg)$/,
        loader: 'raw'
      },
      {
        test    : /\.s*(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  }
}
