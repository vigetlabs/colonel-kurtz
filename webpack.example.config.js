var WebPack = require('webpack')

module.exports = {
  debug   : true,
  devtool : 'source-map',

  entry: {
    'example.build' : './example/example.js'
  },

  output: {
    path: './example',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons']
  },

  plugins: [
    new WebPack.DefinePlugin({
      '__DEV__' : process.env.NODE_ENV !== 'production'
    })
  ],

  module: {
    loaders: [
      {
        test    : /\.s*(c|a)ss$/,
        loader  : 'style-loader!css-loader!autoprefixer-loader!sass-loader'
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
