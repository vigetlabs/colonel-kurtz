var config = require('./webpack.config')

config.devtool = '#eval-source-map'
config.entry   = './example/example.js'

config.externals = {}

config.output = {
  filename : 'example.build.js',
  path     : './example'
}

module.exports = config
