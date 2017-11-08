var Webpack        = require('webpack')
var isIntegration  = process.env.CONTINUOUS_INTEGRATION === 'true'

module.exports = function(config) {

  if (isIntegration) {
    console.log('Running in integration')
  }

  config.set({
    browsers: [ 'Chrome' ],

    browserNoActivityTimeout: 30000,

    singleRun: isIntegration,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      './src/**/__tests__/*.test.js*',
      './addons/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      './src/**/__tests__/*.test.js*'    : [ 'webpack', 'sourcemap' ],
      './addons/**/__tests__/*.test.js*' : [ 'webpack', 'sourcemap' ]
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'minimal'
    },

    webpack: {
      devtool : 'inline-source-map',

      plugins: [
        new Webpack.ProvidePlugin({
          React     : 'react',
          TestUtils : 'react-addons-test-utils'
        })
      ],

      resolve: {
        extensions: ['.js', '.scss', '.css']
      },

      module: {
        loaders: [
          {
            test    : /\.js$/,
            exclude : /node_modules/,
            loader  : 'babel-loader'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
