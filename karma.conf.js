var Webpack = require('webpack')
var webpack_config = require('./webpack.config')

module.exports = function(config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION === 'true' ? 'Firefox' : 'Chrome' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      'src/**/__tests__/*.js*'
    ],

    preprocessors: {
      'src/**/__tests__/*.js*': [ 'webpack' ],
    },

    reporters: [ 'mocha', 'coverage' ],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      plugins: webpack_config.plugins.concat([
        new Webpack.ProvidePlugin({
          'React': 'react/addons'
        })
      ]),

      resolve: webpack_config.resolve,

      module: {
        loaders: webpack_config.module.loaders,
        postLoaders: [
          {
            test: /\.jsx*$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
