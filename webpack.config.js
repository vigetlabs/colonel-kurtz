var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  devtool: 'source-map',

  entry: {
    'colonel-kurtz'  : './src/index.js',
    'addons/medium'  : './addons/medium/index.jsx',
    'addons/image'   : './addons/image/index.jsx',
    'addons/youtube' : './addons/youtube/index.jsx'
  },

  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  /**
   * Externals allow us to not include particular modules in the
   * compiled code. This way we respect whatever version is required
   * by the parent code including Colonel Kurtz
   */
  externals: {
    'react' : 'react',
    'react/addons' : 'react/addons',
    'react/lib/ReactCSSTransitionGroup' : 'react/lib/ReactCSSTransitionGroup',
    'classnames': 'classnames'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.svg'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src', 'lib', 'addons', 'assets', 'vendor', '.' ]
  },

  plugins: [
    /**
     * Here we define environment variables. they will be available in
     * the app under `process.env['key']`. This lets us perform tasks
     * for specific environment as well as pass information to the app.
     */
    new Webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
      }
    }),
    /**
     * When in production, extract all Sass modules out of the app and
     * into `colonel-kurtz.css`
     */
    new ExtractTextPlugin("colonel-kurtz.css", {
      disable: process.env.NODE_ENV !== 'production'
    })
  ],

  /**
   * PostCSS is a CSS postprocessor. We use it to optimize the build
   * and automatically add vendor prefixing.
   */
  postcss: [
    require('autoprefixer-core'),
    require('css-mqpacker'),
    require('csswring')
  ],

  module: {
    loaders: [
      /**
       * Webpack doesn't parse JSON files by default, so we must teach it how:
       */
      {
        test    : /\.json$/,
        loader  : 'json'
      },
      /**
       * Babel is an ES6 Javascript compiler. We use it to compile
       * modern javascript and React JSX.
       * http://babeljs.io
       */
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          loose : true,
          stage : 1
        }
      },
      /**
       * Each block has a menu icon. We use the raw loader to
       * inline the SVG content for that icon within the associated
       * React component.
       */
      {
        test    : /\.(svg)$/,
        exclude : /node_modules/,
        loader  : 'raw'
      },
      /**
       * Sass processing. We import style dependencies within the app,
       * the ExtractTextPlugin pulls it all out into a common build in
       * production.
       */
      {
        test    : /\.s*(c|a)ss$/,
        exclude : /node_modules/,
        loader  : ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  }
}
