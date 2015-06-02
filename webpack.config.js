/**
 * WEBPACK CONFIG FOR EXAMPLE APP
 *
 * This is the webpack config for the example app. For production builds,
 * see the `prepublish` script in package.json
 */

module.exports = {
  cache: true,
  devtool: '#eval-source-map',

  entry: {
    'example.build': './example/example.js'
  },

  output: {
    filename : '[name].js',
    path     : './example'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },

  module: {
    loaders: [
      /**
       * Babel is an ES6 Javascript compiler. We use it to compile
       * modern javascript and React JSX.
       * http://babeljs.io
       */
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel'
      },
      /**
       * Compile sass, for examples
       */
      {
        test    : /\.scss$/,
        exclude : /node_modules/,
        loader  : 'style!css!autoprefixer!sass'
      },
    ]
  }
}
