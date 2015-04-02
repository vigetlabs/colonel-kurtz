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
    browsers: [ isIntegration ? 'Firefox' : 'Chrome' ],

    singleRun: isIntegration,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: ['test.webpack.js'],

    logLevel: config.LOG_ERROR,

    preprocessors: {
      'test.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: noCoverage ? [ 'nyan' ] : [ 'nyan', 'coverage' ],

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
            loader  : 'babel',
            query   : {
              auxiliaryComment: "istanbul ignore next",
              experimental: true,
              loose: true,
              optional: ['runtime']
            }
          },
          {
            test    : /\.(svg)$/,
            exclude : /node_modules/,
            loader  : 'raw'
          },
          {
            test    : /\.s*(c|a)ss$/,
            exclude : /node_modules/,
            loader  : 'style!css!postcss!sass'
          }
        ],
        postLoaders: noCoverage ? [] : [{
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
