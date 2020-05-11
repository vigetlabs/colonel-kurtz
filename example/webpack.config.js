/**
 * WEBPACK CONFIG FOR EXAMPLE APP
 *
 * This is the webpack config for the example app. For production builds,
 * see the `prepublish` script in package.json
 */

module.exports = {
  devtool: 'sourcemap',
  context: __dirname,
  entry: './example.js',

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  module: {
    strictExportPresence: true,
    strictThisContextOnImports: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    contentBase: __dirname
  }
}
