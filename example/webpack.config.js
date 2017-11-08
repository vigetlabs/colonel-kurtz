/**
 * WEBPACK CONFIG FOR EXAMPLE APP
 *
 * This is the webpack config for the example app. For production builds,
 * see the `prepublish` script in package.json
 */

module.exports = {
  context: __dirname,

  devtool: 'inline-source-map',

  entry: './example.js',

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    contentBase: __dirname,
    noInfo: true,
    stats: { colors: true },
    historyApiFallback: true
  }
}
