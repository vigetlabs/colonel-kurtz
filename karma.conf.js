var Webpack        = require('webpack')
var webpack_config = require('./webpack.config')
var isIntegration  = process.env.CONTINUOUS_INTEGRATION === 'true'

module.exports = function(config) {

  config.set({
    browsers: [ isIntegration ? 'Firefox' : 'Chrome' ],

    singleRun: isIntegration,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      'src/**/__tests__/*.js*',
      'lib/**/__tests__/*.js*',
    ],

    logLevel: config.LOG_ERROR,

    preprocessors: {
      'src/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ],
      'lib/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'nyan', 'coverage' ],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',

      plugins: webpack_config.plugins.concat([
        new Webpack.IgnorePlugin(/\.s*(c|a)ss$/),
        new Webpack.IgnorePlugin(/\.svg$/),
        new Webpack.ProvidePlugin({
          'React': 'react/addons'
        })
      ]),

      resolve: webpack_config.resolve,

      module: {
        loaders: [
          {
            test    : /\.json$/,
            loader  : 'json'
          },
          {
            test    : /\.jsx*$/,
            exclude : /node_modules/,
            loader  : 'babel?experimental&loose&optional=runtime'
          },
          {
            test: /\.(svg)$/,
            exclude : /node_modules/,
            loader: 'raw'
          },
          {
            test    : /\.s*(c|a)ss$/,
            exclude : /node_modules/,
            loader  : 'style!css!postcss!sass'
          }
        ],
        postLoaders: [{
          test: /\.jsx*$/,
          exclude: /(__tests__|node_modules|vendor)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
