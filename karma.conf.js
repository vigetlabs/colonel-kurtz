var Webpack        = require('webpack')
var webpack_config = require('./webpack.config')
var isIntegration  = process.env.CONTINUOUS_INTEGRATION === 'true'
var noCoverage     = process.env.NO_COVERAGE === 'true'

module.exports = function(config) {

  if (isIntegration) {
    console.log('Running in integration')
  }

  if (noCoverage) {
    console.log('Test coverage has been disabled')
  }

  config.set({
    browsers: [ 'Firefox' ],

    singleRun: isIntegration,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      './src/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      './src/**/__tests__/*.test.js*' : [ 'webpack', 'sourcemap' ]
    },

    logLevel: config.LOG_ERROR,

    reporters: noCoverage ? [ 'spec' ] : [ 'spec', 'coverage' ],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',

      plugins: [
        new Webpack.IgnorePlugin(/\.svg$/),
        new Webpack.ProvidePlugin({
          'React': 'react/addons'
        })
      ],

      resolve: webpack_config.resolve,

      module: {
        loaders: [
          {
            test    : /\.jsx*$/,
            exclude : /node_modules/,
            loader  : 'babel',
            query   : {
              auxiliaryComment: "istanbul ignore next",
              stage: 1,
              loose: true,
              optional: [ 'runtime' ]
            }
          },
          {
            test    : /\.(svg)$/,
            exclude : /node_modules/,
            loader  : 'raw'
          }
        ],
        postLoaders: noCoverage ? [] : [{
          test: /\.jsx*$/,
          exclude: /(__tests__|node_modules)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
