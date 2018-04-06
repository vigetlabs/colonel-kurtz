var Webpack = require('webpack')
var HappyPack = require('happypack')
var isIntegration = process.env.CONTINUOUS_INTEGRATION === 'true'
var noCoverage = process.env.NO_COVERAGE === 'true'

module.exports = function(config) {
  if (isIntegration) {
    console.log('Running in integration')
  }

  if (noCoverage) {
    console.log('Test coverage has been disabled')
  }

  config.set({
    browsers: ['Chrome'],

    browserNoActivityTimeout: 30000,

    singleRun: isIntegration,

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      './src/**/__tests__/*.test.js*',
      './addons/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      './src/**/__tests__/*.test.js*': ['webpack', 'sourcemap'],
      './addons/**/__tests__/*.test.js*': ['webpack', 'sourcemap']
    },

    reporters: noCoverage ? ['mocha'] : ['mocha', 'coverage'],

    mochaReporter: {
      output: 'minimal'
    },

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool: 'inline-source-map',

      plugins: [
        new Webpack.ProvidePlugin({
          React: 'react',
          TestUtils: 'react-addons-test-utils'
        }),

        new HappyPack({ id: 'js' })
      ],

      resolve: {
        extensions: ['', '.js', '.scss', '.css']
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel?optional=runtime',
            happy: { id: 'js' }
          }
        ],
        postLoaders: noCoverage
          ? []
          : [
              {
                test: /\.js$/,
                happy: { id: 'js' },
                exclude: /(__tests__|node_modules)/,
                loader: 'istanbul-instrumenter'
              }
            ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  })
}
